import sys
from itertools import chain
import json
import random
from django.db.models import Max, Q
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from geopy.distance import geodesic
from geopy.geocoders import Nominatim
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from api_restaurant_roulette.settings import MAX_RESTAURANTS, MAX_DISTANCE, MAX_PRICE, MIN_RATING
from .serializers import RestaurantSerializer
from .models import Restaurant

geolocator = Nominatim(user_agent="api_restaurant_roulette.wsgi.application")


class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()


@csrf_exempt
def filter_restaurants(request):
    """
    Entry point to filter and retrieve a list of restaurant objects from the larger collection of restaurants.

    :param request: The GET request issued by the client.
    :returns: List of length MAX_RESTAURANTS, containing restaurant objects.
    """
    request_body = request.body.decode('utf-8') if request.body is not None else None
    all_user_filters = json.loads(request_body)

    query_params = {}

    category_filters = []
    location_filters = []
    price_filters = []
    rating_filters = []

    sum_latitude = 0
    sum_longitude = 0

    for user in all_user_filters:
        category_filters.append(user['category'])
        price_filters.append(user['price'])
        rating_filters.append(user['rating'])

        sum_latitude += float(user['latitude'])
        sum_longitude += float(user['longitude'])

    latitude = sum_latitude/len(all_user_filters)
    longitude = sum_longitude/len(all_user_filters)

    query_params['categories'] = category_filters
    query_params['prices'] = price_filters
    query_params['ratings'] = rating_filters

    response = {}
    if query_params:
        (response["restaurant_queryset"],
         response["percentage_of_filters_applied"]
         ) = incrementally_query(query_params=query_params, avg_user_location=(latitude, longitude))

    else:
        restaurants = []
        for i in range(0, MAX_RESTAURANTS):
            restaurants.append(json.loads(random_restaurant(request=request).content))
        response["restaurant_queryset"] = restaurants[0]
        response["percentage_of_filters_applied"] = 0
        # return HttpResponse(status=400)

    serializer = RestaurantSerializer(response["restaurant_queryset"], many=True)
    serialized_data = JSONRenderer().render(serializer.data)
    response["restaurant_queryset"] = json.loads(serialized_data.decode('utf-8'))

    return HttpResponse(json.dumps(
        response, sort_keys=True, indent=4),
        content_type="application/json")


def incrementally_query(query_params=None, avg_user_location=None):
    """
    Helper function used to order passed-in query parameters and apply each iteratively to the
    entire collection of restaurants. Filters are applied until a MAX_RESTAURANTS value is reached
    or until all filters are applied, whichever is first.

    :param query_params: dictionary of query param lists pertaining to each filter criteria.
    :returns: list of filtered restaurants, number of applied filters, and limiting filter (if applicable).
    """
    num_applied_filters = 0
    filtered_restaurants = None
    restaurant_queryset_stack = []
    filters = []

    # map query parameters to Django filters
    for category in query_params.get("categories", []):
        if isinstance(category, list):
            category_union = Q(category__exact=category[0], _connector='OR')

            for index in category[1:]:
                category_union.add(Q(category__exact=str(index), _connector='OR'), conn_type='OR', squash=True)
            filters.append(category_union)
            continue
        filters.append(Q(category__exact=str(category)))

    limiting_price = MAX_PRICE
    for price in query_params.get("prices", []):
        if isinstance(price, list):
            for index in price:
                if int(index) < limiting_price:
                    limiting_price = int(index)
            continue
        if int(price) < limiting_price:
            limiting_price = int(price)
    filters.append(Q(price__lte=str(limiting_price)))

    limiting_rating = MIN_RATING
    for rating in query_params.get("ratings", []):
        if isinstance(rating, list):
            for index in rating:
                if int(index) < limiting_rating:
                    limiting_rating = int(index)
            continue
        if int(rating) < limiting_rating:
            limiting_rating = int(rating)
    filters.append(Q(rating__gte=str(limiting_rating)))

    if not filtered_restaurants:  # initially retrieve all restaurants
        filtered_restaurants = Restaurant.objects.all()
        restaurant_queryset_stack.append(filtered_restaurants)

    # iteratively apply filters
    for current_filter in filters:
        filtered_restaurants = restaurant_queryset_stack[-1].filter(current_filter)
        num_applied_filters += 1
        percent_filters_applied = str(int(100 * (num_applied_filters) / len(filters)))
        if len(filtered_restaurants) < MAX_RESTAURANTS:
            if num_applied_filters is len(query_params):  # all filters were applied
                remaining_restaurants = list(restaurant_queryset_stack.pop())[:MAX_RESTAURANTS]
                for restaurant in filtered_restaurants:  # build an ordered pseudo-set of restaurants
                    try:
                        remaining_restaurants.remove(restaurant)
                    except ValueError:
                        continue
                filtered_restaurants = list(chain(filtered_restaurants, remaining_restaurants))
                print(f"less than {MAX_RESTAURANTS} and last filter applied")
                unordered_filtered_restaurants = filtered_restaurants[:MAX_RESTAURANTS]
                for restaurant in unordered_filtered_restaurants:
                    try:
                        location = geolocator.geocode(restaurant.address)
                        print(geodesic(location.point, avg_user_location))
                    except:
                        pass

                return filtered_restaurants[:MAX_RESTAURANTS], percent_filters_applied

            else:  # filters remain but priority is returning MAX_RESTAURANTS
                # repopulate queried restaurants to at least desired number of restaurants
                while len(filtered_restaurants) < MAX_RESTAURANTS:
                    filtered_restaurants = restaurant_queryset_stack.pop()
                    # num_applied_filters -= 1
                print(f"less than {MAX_RESTAURANTS} and last filter not applied")
                unordered_filtered_restaurants = filtered_restaurants[:MAX_RESTAURANTS]
                for restaurant in unordered_filtered_restaurants:
                    try:
                        location = geolocator.geocode(restaurant.address)
                        print(geodesic(location.point, avg_user_location))
                    except:
                        pass

                return filtered_restaurants[:MAX_RESTAURANTS], percent_filters_applied

        elif len(filtered_restaurants) >= MAX_RESTAURANTS:
            if num_applied_filters is len(query_params):  # all filters were applied
                print(f"greater than {MAX_RESTAURANTS} and last filter applied")
                unordered_filtered_restaurants = filtered_restaurants[:MAX_RESTAURANTS]
                for restaurant in unordered_filtered_restaurants:
                    try:
                        location = geolocator.geocode(restaurant.address)
                        print(geodesic(location.point, avg_user_location))
                    except:
                        pass

                return filtered_restaurants[:MAX_RESTAURANTS], percent_filters_applied
            else:  # continue applying filters
                print(f"greater than {MAX_RESTAURANTS} and continuing to filter")
                restaurant_queryset_stack.append(filtered_restaurants)


@csrf_exempt
def add_restaurant(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        serializer = RestaurantSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse()
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def random_restaurant(request):
    # Thanks to https://books.agiliq.com/projects/django-orm-cookbook/en/latest/random.html
    # for telling me how to do my job
    if request.method == 'GET':
        # Fail if there are no restaurants in the DB
        num_entries = Restaurant.objects.all().count()
        if num_entries == 0:
            return HttpResponse(status=500)

        max_id = Restaurant.objects.all().aggregate(max_id=Max("pk"))['max_id']
        # Loop incase the random pk is invalid
        while True:
            pk = random.randint(1, max_id)
            restaurant = Restaurant.objects.filter(pk=pk).first()
            if restaurant:
                serializer = RestaurantSerializer(restaurant)
                serialized_data = JSONRenderer().render(serializer.data)
                return HttpResponse(serialized_data)
    else:
        return HttpResponse(status=405)

