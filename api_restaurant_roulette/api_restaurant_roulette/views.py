import itertools

from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .serializers import RestaurantSerializer
from .models import Restaurant
import json
from django.db.models.query import QuerySet
from api_restaurant_roulette.settings import MAX_QUERYSET_LEN


class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()

    @csrf_exempt
    def get_queryset(self):
        query_params = self.request.query_params
        response = {}
        if query_params:
            response["restaurant_queryset"], response["limiting_query_param"] = self.filter_restaurants(query_params)
            return HttpResponse(response)
        else:
            return HttpResponse(status=400)

    def filter_restaurants(self, query_params):
        """

        :param self:
        :param query_params:
        :return:
        """

        """
        If query data:
            Return restaurant_list, limiting_param = self._perform_all_queries()
        Else, return to the user a queryset containing one “randomly” chosen restaurant and None

        """
        if query_params:
            return self._perform_all_queries(query_params=query_params)
        else:
            pass  # return self.random_restaurant()

    @staticmethod
    def _incrementally_query(query_params):
        """

        :param query_params:
        :return:
        """
        num_applied_params = 0
        filtered_restaurants = QuerySet()
        queryset_stack = []
        if filtered_restaurants is None:  # retrieve all restaurants
            filtered_restaurants = Restaurant.objects.all()
        queryset_stack.append(filtered_restaurants)
        for current_param in enumerate(query_params):
            filtered_restaurants = queryset_stack.peek().filter(current_param)
            num_applied_params += 1

            if len(filtered_restaurants) < MAX_QUERYSET_LEN:
                if current_param in {len(filtered_restaurants)-1}:
                    return filtered_restaurants, num_applied_params, None
                else:
                    return queryset_stack.pop(), num_applied_params, current_param
            elif len(filtered_restaurants) >= MAX_QUERYSET_LEN:
                filtered_restaurants = filtered_restaurants[:MAX_QUERYSET_LEN]
                return filtered_restaurants, num_applied_params, None
            else:
                queryset_stack.append(filtered_restaurants)

    def _perform_all_queries(self, query_params):
        """

        :return:
        """
        query_bank = []
        for permutation in itertools.permutations(query_params):
            restaurants, num_applied_filters, limiting_param = self._incrementally_query(permutation)
            if limiting_param is None:
                return restaurants, None
            else:
                query_result = {
                    "restaurants": restaurants,
                    "num_applied_filters": num_applied_filters,
                    "limiting_params": limiting_param
                }
                query_bank.append(query_result)
        most_applied_params = 0
        restaurants = None
        limiting_param = None
        for result in query_bank:
            if result["num_applied_filters"] > most_applied_params:
                most_applied_params = result["num_applied_filters"]
                restaurants = result["restaurants"]
                limiting_param = result["limiting_param"]
        return restaurants, limiting_param

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

