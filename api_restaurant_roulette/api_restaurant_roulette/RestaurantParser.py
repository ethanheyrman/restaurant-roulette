import csv, io
import requests

"""
from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from .serializers import RestaurantSerializer
from .models import Restaurant
import json
"""
import os.path

my_path = os.path.abspath(os.path.dirname(__file__))
path = os.path.join(my_path, "RestaurantList.csv")

with open(path, 'r') as csv_file:
    csv_reader = csv.reader(csv_file)
    i = 0
    for line in csv_reader:
        print(line)
        if i > 0:
            dat = {'name': line[0],
                    'sunday_open': line[1],
                    'sunday_close': line[2],
                    'monday_open': line[3],
                    'monday_close': line[4],
                    'tuesday_open': line[5],
                    'tuesday_close': line[6],
                    'wednesday_open': line[7],
                    'wednesday_close': line[8],
                    'thursday_open': line[9],
                    'thursday_close': line[10],
                    'friday_open': line[11],
                    'friday_close': line[12],
                    'saturday_open': line[13],
                    'saturday_close': line[14],
                    'phone': line[15],
                    'rating': line[16],
                    'price': line[17],
                    'category': line[18],
                    'address': line[19],
                    'website': line[20]}
            url = 'http://127.0.0.1:8000/restaurant/add/'
            r = requests.post(url, json = dat)
        i = i + 1
    csv_file.close()
    """print(r.text)"""
