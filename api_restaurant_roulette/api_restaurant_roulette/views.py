from itertools import chain
import json
import random
from django.db.models import Max, Q
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from api_restaurant_roulette.settings import MAX_RESTAURANTS
from .serializers import RestaurantSerializer
from .models import Restaurant


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

    query_params = {}
    if request.GET.get('price'):
        print("ok")
        query_params['price'] = request.GET.getlist('price')
    if request.GET.get('category') is not None:
        query_params['category'] = request.GET.getlist('category')
    if request.GET.get('rating') is not None:
        query_params['rating'] = request.GET.getlist('rating')
    if request.GET.get('distance') is not None:
        query_params['distance'] = request.GET.getlist('distance')

    response = {}
    if query_params:
        (response["restaurant_queryset"],
         response["num_applied_filters"],
         response["limiting_query_param"]
         ) = incrementally_query(query_params=query_params)
        serializer = RestaurantSerializer(response["restaurant_queryset"], many=True)
        serialized_data = JSONRenderer().render(serializer.data)
        response["restaurant_queryset"] = json.loads(serialized_data.decode('utf-8'))

        return HttpResponse(json.dumps(
            response, sort_keys=True, indent=4),
            content_type="application/json")
    else:
        return HttpResponse(status=400)


def incrementally_query(query_params=None):
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
    for price in query_params.get("price", []):
        filters.append(Q(price__exact=str(price)))
    for category in query_params.get("category", []):
        filters.append(Q(category__exact=str(category)))
    for rating in query_params.get("rating", []):
        filters.append(Q(rating__exact=str(rating)))
    for distance in query_params.get("distance", []):
        filters.append(Q(distance__exact=str(distance)))

    if not filtered_restaurants:  # initially retrieve all restaurants
        filtered_restaurants = Restaurant.objects.all()
        restaurant_queryset_stack.append(filtered_restaurants)

    # iteratively apply filters
    for current_filter in filters:
        filtered_restaurants = restaurant_queryset_stack[-1].filter(current_filter)
        num_applied_filters += 1

        if len(filtered_restaurants) < MAX_RESTAURANTS:
            if num_applied_filters is len(query_params):  # all filters were applied
                remaining_restaurants = list(restaurant_queryset_stack.pop())[:MAX_RESTAURANTS]
                for restaurant in filtered_restaurants:  # build an ordered pseudo-set of restaurants
                    try:
                        remaining_restaurants.remove(restaurant)
                    except ValueError:
                        continue
                filtered_restaurants = list(chain(filtered_restaurants, remaining_restaurants))
                return filtered_restaurants[:MAX_RESTAURANTS], num_applied_filters, None

            else:  # filters remain but priority is returning MAX_RESTAURANTS
                # repopulate queried restaurants to at least desired number of restaurants
                while len(filtered_restaurants) < MAX_RESTAURANTS:
                    filtered_restaurants = restaurant_queryset_stack.pop()
                    num_applied_filters -= 1
                return filtered_restaurants[:MAX_RESTAURANTS], num_applied_filters, current_filter

        elif len(filtered_restaurants) >= MAX_RESTAURANTS:
            if num_applied_filters is len(query_params):  # all filters were applied
                return filtered_restaurants[:MAX_RESTAURANTS], num_applied_filters, None
            else:  # continue applying filters
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
