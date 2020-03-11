from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .serializers import RestaurantSerializer
from .models import Restaurant
import json

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
