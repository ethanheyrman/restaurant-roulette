"""
Yelp API info:
Client ID:
UIIt6xKJNCf5Y02-4ssYEA
API Key:
IVNVVKDmE0kP8Wmu2e4Zmpjl_HpCGsZSkQ2aqllVj7_z7jfkx50s-wSgeRhz8ZkDG2R6W26CG6RXVR5gf0owATiqFSReDzWIAVzTe_ujCD0CQF87D1XjwTU207WLXnYx
"""

import sys
import csv, io
import requests
import os.path
import argparse

# Initializing arguments and handling method input
parser = argparse.ArgumentParser(description='Determining restaurant search parameters')
parser.add_argument("--filenameW", default="RestaurantListFromDB.csv", help="This is the name of the CSV file to write to. It will be in the same directory as this script")
args = parser.parse_args()

url_get = 'http://127.0.0.1:8000/restaurant/all/'
all_restaurants = requests.get(url = url_get)
try:
    all_restaurants_JSON = all_restaurants.json()
except ValueError:
    all_restaurants_JSON = {}

filenameW = args.filenameW
my_path = os.path.abspath(os.path.dirname(__file__))
path = os.path.join(my_path, filenameW)

all_restaurants_JSON

# Opening CSV file
try:
    with open(path, 'w') as csv_file:
        csv_writer = csv.DictWriter(csv_file, fieldnames = ['name', 'sunday_open', 'sunday_close', 'monday_open', 'monday_close', 'tuesday_open', 'tuesday_close', 'wednesday_open', 'wednesday_close', 'thursday_open', 'thursday_close', 'friday_open', 'friday_close', 'saturday_open', 'saturday_close', 'phone', 'rating', 'price', 'category', 'address', 'website', 'id'])
        csv_writer.writeheader()

        # Iterating through all restaurants
        for rest in all_restaurants_JSON:
            #row = str(rest['name'].encode('utf-8')) + ',' + str(rest['sunday_open']) + ',' + str(rest['saturday_open']) + ',' + str(rest['friday_open']) + ',' + str(rest['thursday_open']) + ',' + str(rest['wednesday_open']) + ',' + str(rest['tuesday_open']) + ',' + str(rest['monday_open']) + ',' + str(rest['sunday_close']) + ',' + str(rest['saturday_close']) + ',' + str(rest['friday_close']) + ',' + str(rest['thursday_close']) + ',' + str(rest['wednesday_close']) + ',' +    str(rest['tuesday_close']) + ',' + str(rest['monday_close']) + ',' + str(rest['phone']) + ',' + str(rest['rating']) + ',' + str(rest['price']) + ',' + str(rest['category']) + ',' + str(rest['address']) + ',' + str(rest['website']) + ',' + str(rest['id'])
            row = {'name': rest['name'].encode('utf-8'),
                   'price': rest['price'],
                   'website': rest['website'],
                   'address': rest['address'],
                   'category': rest['category'],
                   'rating': rest['rating'],
                   'phone': rest['phone'],
                   'id': rest['id'],
                   'monday_open': rest['monday_open'],
                   'tuesday_open': rest['tuesday_open'],
                   'wednesday_open': rest['wednesday_open'],
                   'thursday_open': rest['thursday_open'],
                   'friday_open': rest['friday_open'],
                   'saturday_open': rest['saturday_open'],
                   'sunday_open': rest['sunday_open'],
                   'monday_close': rest['monday_close'],
                   'tuesday_close': rest['tuesday_close'],
                   'wednesday_close': rest['wednesday_close'],
                   'thursday_close': rest['thursday_close'],
                   'friday_close': rest['friday_close'],
                   'saturday_close': rest['saturday_close'],
                   'sunday_close': rest['sunday_close']}
            csv_writer.writerow(row)
            row = ''

    # Closing file
    csv_file.close()
except IOError:
    print('.\n.\n.')
    print("I/O Error.")
    print('.\n.\n.')
    sys.exit()
