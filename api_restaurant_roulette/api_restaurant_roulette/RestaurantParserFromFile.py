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
parser.add_argument("--filenameR", default="RestaurantList.csv", help="This is the name of the CSV file to read. It must be in the same directory as this script")
args = parser.parse_args()\

url_get = 'http://127.0.0.1:8000/restaurant/all/'
all_restaurants = requests.get(url = url_get)
try:
    all_restaurants_JSON = all_restaurants.json()
except ValueError:
    all_restaurants_JSON = {}

# Handling arguments for database entry method of reading CSV file
filenameR = args.filenameR
my_path = os.path.abspath(os.path.dirname(__file__))
path = os.path.join(my_path, filenameR)

# Opening CSV file
try:
    with open(path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        i = 0

        # Iterating through the lines of the file (assumes file is formatted properly)
        # See RestaurantList.CSV in this directory as an example
        for line in csv_reader:

            # Checking if i > 0 because first line is header information
            if i > 0:
                addVar = 1
                if (str(line[15]) == "0"):
                    phone_str = 'No phone number available'
                else:
                    phone_str = '(' + line[15][:3] + ')' + ' ' + line[15][3:6] + '-' + line[15][6:]
                if(str(line[20]) == "No website"):
                    website_str = 'No website available'
                else:
                    website_str = line[20]
                dat = {'name': line[0],
                       'sunday_open': line[1] + ':00',
                       'sunday_close': line[2] + ':00',
                       'monday_open': line[3] + ':00',
                       'monday_close': line[4] + ':00',
                       'tuesday_open': line[5] + ':00',
                       'tuesday_close': line[6] + ':00',
                       'wednesday_open': line[7] + ':00',
                       'wednesday_close': line[8] + ':00',
                       'thursday_open': line[9] + ':00',
                       'thursday_close': line[10] + ':00',
                       'friday_open': line[11] + ':00',
                       'friday_close': line[12] + ':00',
                       'saturday_open': line[13] + ':00',
                       'saturday_close': line[14] + ':00',
                       'phone': phone_str,
                       'rating': line[16],
                       'price': line[17],
                       'category': line[18],
                       'address': line[19],
                       'website': website_str}

                # Check if business is already in the database
                for rest in all_restaurants_JSON:

                    if str(dat['website']) == str(str(rest['website'])[:len(str(dat['website']))]):

                        # Check if restaurant data has changed
                        if str(dat['name']) == str(rest['name'].encode('utf-8')) and str(dat['phone']) == str(rest['phone']) and str(dat['rating']) == str(rest['rating']) and str(dat['price']) == str(rest['price']) and str(dat['category']) == str(rest['category']) and str(dat['address']) == str(rest['address']) and str(dat['monday_close']) == str(rest['monday_close']) and str(dat['tuesday_close']) == str(rest['tuesday_close']) and str(dat['wednesday_close']) == str(rest['wednesday_close']) and str(dat['thursday_close']) == str(rest['thursday_close']) and str(dat['friday_close']) == str(rest['friday_close']) and str(dat['saturday_close']) == str(rest['saturday_close']) and str(dat['sunday_close']) == str(rest['sunday_close']) and str(dat['monday_open']) == str(rest['monday_open']) and str(dat['tuesday_open']) == str(rest['tuesday_open']) and str(dat['wednesday_open']) == str(rest['wednesday_open']) and str(dat['thursday_open']) == str(rest['thursday_open']) and str(dat['friday_open']) == str(rest['friday_open']) and str(dat['saturday_open']) == str(rest['saturday_open']) and str(dat['sunday_open']) == str(rest['sunday_open']):
                            addVar = 0
                            break
                        else:
                            id_to_delete = int(rest['id'])
                            delete_params = {'idNum': id_to_delete}
                            url_del = 'http://127.0.0.1:8000/restaurant/delete/'
                            requests.delete(url = url_del, json = delete_params)
                            break
                    elif str(dat['name']) == str(rest['name'].encode('utf-8')) and str(dat['address']) == str(rest['address']):

                        # Check if restaurant data has changed
                        if str(dat['website']) == str(str(rest['website'])[:len(str(dat['website']))]) and str(dat['phone']) == str(rest['phone']) and str(dat['rating']) == str(rest['rating']) and str(dat['price']) == str(rest['price']) and str(dat['category']) == str(rest['category']) and str(dat['monday_close']) == str(rest['monday_close']) and str(dat['tuesday_close']) == str(rest['tuesday_close']) and str(dat['wednesday_close']) == str(rest['wednesday_close']) and str(dat['thursday_close']) == str(rest['thursday_close']) and str(dat['friday_close']) == str(rest['friday_close']) and str(dat['saturday_close']) == str(rest['saturday_close']) and str(dat['sunday_close']) == str(rest['sunday_close']) and str(dat['monday_open']) == str(rest['monday_open']) and str(dat['tuesday_open']) == str(rest['tuesday_open']) and str(dat['wednesday_open']) == str(rest['wednesday_open']) and str(dat['thursday_open']) == str(rest['thursday_open']) and str(dat['friday_open']) == str(rest['friday_open']) and str(dat['saturday_open']) == str(rest['saturday_open']) and str(dat['sunday_open']) == str(rest['sunday_open']):
                            addVar = 0
                            break
                        else:
                            id_to_delete = int(rest['id'])
                            delete_params = {'idNum': id_to_delete}
                            url_del = 'http://127.0.0.1:8000/restaurant/delete/'
                            requests.delete(url = url_del, json = delete_params)
                            break
                    else:
                        continue

                # Confirm whether or not to add to database
                if addVar == 1:
                    POSTURL = 'http://127.0.0.1:8000/restaurant/add/'
                    r = requests.post(POSTURL, json = dat)
            i = i + 1

    # Closing file
    csv_file.close()
except FileNotFoundError:
    print('.\n.\n.')
    print("File not found.")
    print('.\n.\n.')
    sys.exit()
