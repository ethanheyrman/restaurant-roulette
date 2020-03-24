from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Max
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .serializers import RestaurantSerializer
from .models import Restaurant
import json
import random

# Create your views here.
class RestaurantView(viewsets.ModelViewSet):
    serializer_class = RestaurantSerializer
    queryset = Restaurant.objects.all()

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
