import itertools

from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Max, Q
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .serializers import RestaurantSerializer
from .models import Restaurant
import json
from django.db.models.query import QuerySet
from api_restaurant_roulette.settings import MAX_QUERYSET_LEN
import random
from collections import namedtuple


class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()

@csrf_exempt
def get_queryset(request):

    query_params = {}
    query_params['price'] = str(request.GET.get('price'))
    query_params['category'] = str(request.GET.getlist('category'))
    # query_params['rating'] = str(request.GET.getlist('rating'))
    # query_params['name'] = str(request.GET.getlist('name'))
    # query_params['distance'] = str(request.GET.getlist('distance'))

    response = {}
    if query_params:
        response["restaurant_queryset"], \
        response["num_applied_params"], \
        response["limiting_query_param"] = _filter_restaurants(query_params)

        serializer = RestaurantSerializer(response["restaurant_queryset"], many=True)
        serialized_data = JSONRenderer().render(serializer.data)
        serialized_data = json.loads(serialized_data.decode('utf-8'))
        response["restaurant_queryset"] = serialized_data
        return HttpResponse(response.items())
    else:
        return HttpResponse(status=400)


def _filter_restaurants(query_params):
    """

    :param query_params:
    :return:
    """

    """
    If query data:
        Return restaurant_list, limiting_param = self._perform_all_queries()
    Else, return to the user a queryset containing one “randomly” chosen restaurant and None

    """
    if query_params:
        return _incrementally_query(query_params=query_params)
    else:
        return random_restaurant(), None


def _incrementally_query(query_params):
    """

    :param query_params:
    :return:
    """
    num_applied_params = 0
    filtered_restaurants = None
    queryset_stack = []

    filters = {}
    filters["category"] = Q(category__exact=str(query_params["category"]))
    filters["price"] = Q(price__exact=str(query_params["price"]))
    # filters["rating"] = Q(rating__exact=str(query_params["rating"]))
    # filters["distance"] = Q(distance__exact=str(query_params["distance"]))

    if not filtered_restaurants:  # retrieve all restaurants
        filtered_restaurants = Restaurant.objects.all()

    queryset_stack.append(filtered_restaurants)

    for key, value in query_params.items():
        if query_params.get(key) is not None:
            current_filter = filters.get(key)
            filtered_restaurants = queryset_stack[-1].filter(current_filter)
            num_applied_params += 1

        if len(filtered_restaurants) < MAX_QUERYSET_LEN:
            if value in {len(filtered_restaurants)-1}:
                return filtered_restaurants, num_applied_params, None
            else:
                return queryset_stack.pop(), num_applied_params, value
        elif len(filtered_restaurants) >= MAX_QUERYSET_LEN:
            filtered_restaurants = filtered_restaurants[:MAX_QUERYSET_LEN]
            return filtered_restaurants, num_applied_params, None
        else:
            queryset_stack.append(filtered_restaurants)

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
