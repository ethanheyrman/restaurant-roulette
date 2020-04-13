"""
Yelp API info:
Client ID:
UIIt6xKJNCf5Y02-4ssYEA
API Key:
IVNVVKDmE0kP8Wmu2e4Zmpjl_HpCGsZSkQ2aqllVj7_z7jfkx50s-wSgeRhz8ZkDG2R6W26CG6RXVR5gf0owATiqFSReDzWIAVzTe_ujCD0CQF87D1XjwTU207WLXnYx
"""

import sys
import requests
import os.path
import argparse

# Initializing arguments and handling method input
parser = argparse.ArgumentParser(description='Determining restaurant search parameters')
parser.add_argument("--count", default=100, help="This is the number of restuarants to retrieve")
parser.add_argument("--offset", default=0, help="This is the offset at which you would like the search to begin")
parser.add_argument("--search_location", default='Madison, WI', help="This is where you would like to search (e.g. Madison,WI)")
parser.add_argument("--radius", default=40000, help="This is the radius you would like to search")
args = parser.parse_args()

url_get = 'http://127.0.0.1:8000/restaurant/all/'
all_restaurants = requests.get(url = url_get)
try:
    all_restaurants_JSON = all_restaurants.json()
except ValueError:
    all_restaurants_JSON = {}

# Handling arguments for database entry method of Yelp search
count = int(args.count)
if count > 1000:
    count = 1000
offset = int(args.offset)
search_location = args.search_location
radius = int(args.radius)
if radius > 40000:
    radius = 40000
loops = int(count/50)
if count%50 > 0:
    loops = loops + 1
limits = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
for loop in range(loops):
    if loop < (loops - 1):
        limits[loop] = int(50)
    else:
        if count%50 == 0:
            limits[loop] = 50
        else:
            limits[loop] = count%50

# Yelp necessary information
API_KEY = 'IVNVVKDmE0kP8Wmu2e4Zmpjl_HpCGsZSkQ2aqllVj7_z7jfkx50s-wSgeRhz8ZkDG2R6W26CG6RXVR5gf0owATiqFSReDzWIAVzTe_ujCD0CQF87D1XjwTU207WLXnYx'
ENDPOINT_GET_LIST = 'https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization': 'bearer %s' % API_KEY}

# Loop for getting and reading one list from  Yelp
for loop in range(loops):

    #Searching yelp for list of businesses
    LIST_PARAMETERS = {'term':'restaurants',
              'limit': limits[loop],
              'radius': radius,
              'location': search_location,
              'offset': offset}
    Yelp_List_Query_Response = requests.get(url = ENDPOINT_GET_LIST, params = LIST_PARAMETERS, headers = HEADERS)
    Yelp_List_Query_Response_JSON = Yelp_List_Query_Response.json()
    if 'error' in Yelp_List_Query_Response_JSON:
        list_error = Yelp_List_Query_Response_JSON['error']
        if str(list_error['code']) == "ACCESS_LIMIT_REACHED":
            print('.\n.\n.')
            print("Yelp daily access limit reached.")
            print('.\n.\n.')
            sys.exit()
        elif str(list_error['code']) == "INTERNAL_ERROR":
            continue
        else:
            print('.\n.\n.')
            print("Unknown error in get call to Yelp. See Yelp_List_Query_Response_JSON below:")
            print('')
            print(Yelp_List_Query_Response_JSON)
            print('.\n.\n.')
            sys.exit()

    # Iterating through list of restaurants sent back by Yelp
    for Yelp_Restaurant in Yelp_List_Query_Response_JSON['businesses']:

        # Variable initialization
        name = '' # string
        # Indices of array: 0 = Monday, 1 = Tuesday,...,6 = Sunday
        start = ['00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00'] # date-time
        end = ['00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00'] # date-time
        start_copy = ['00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00']
        end_copy = ['00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00','00:00:00']
        phone = 'No phone number available' # string
        rating = 0 # double
        price = 0 # integer
        categories = '' # string
        address = '' # string
        website_url = '' # string

        # Request for restaurant info
        ENDPOINT_GET_DETAILS = 'https://api.yelp.com/v3/businesses/{}'.format(Yelp_Restaurant['id'])
        Yelp_Detail_Query_Response = requests.get(url = ENDPOINT_GET_DETAILS, headers = HEADERS)
        Yelp_Detail_Query_Response_JSON = Yelp_Detail_Query_Response.json()
        if 'error' in Yelp_Detail_Query_Response_JSON:
            detail_error = Yelp_Detail_Query_Response_JSON['error']
            if str(detail_error['code']) == "BUSINESS_MIGRATED":
                continue
            elif str(detail_error['code']) == "INTERNAL_ERROR":
                continue
            elif str(detail_error['code']) == "ACCESS_LIMIT_REACHED":
                print('.\n.\n.')
                print("Yelp daily access limit reached.")
                print('.\n.\n.')
                sys.exit()
            else:
                print('.\n.\n.')
                print("Error in get call to Yelp. See Yelp_Detail_Query_Response_JSON below:")
                print('')
                print(Yelp_Detail_Query_Response_JSON)
                print('.\n.\n.')
                sys.exit()

        # Hours
        try:
            prevDay = -1
            for data_point in Yelp_Detail_Query_Response_JSON['hours']:
                for inner_data_point in data_point['open']:
                    day = inner_data_point['day']
                    start_i = inner_data_point['start'][:2] + ':' + inner_data_point['start'][2:] + ':00'
                    end_i = inner_data_point['end'][:2] + ':' + inner_data_point['end'][2:] + ':00'
                    if day == prevDay:
                        end[day] = end_i
                    else:
                        start[day] = start_i
                        end[day] = end_i
                    prevDay = day
        except KeyError:
            start = start_copy
            end = end_copy

        # Phone
        try:
            phone = Yelp_Detail_Query_Response_JSON['display_phone']
            if phone == '':
                phone = phone = 'No phone number available'
        except KeyError:
            phone = 'No phone number available'

        # Rating
        try:
            rating = Yelp_Detail_Query_Response_JSON['rating']
        except KeyError:
            rating = 0

        # Price
        try:
            price_string = Yelp_Detail_Query_Response_JSON['price']
            if price_string == '$$$$':
                price = 4
            if price_string == '$$$':
                price = 3
            if price_string == '$$':
                price = 2
            if price_string == '$':
                price = 1
        except KeyError:
            price = 0

        # Category
        try:
            for cat in Yelp_Detail_Query_Response_JSON['categories']:
                categories = categories + cat['title'] + ';'
            categories = categories[:-1]
        except KeyError:
            categories = 'No categories available'

        # Address
        try:
            location = Yelp_Detail_Query_Response_JSON['location']
            display_address = location['display_address']
            for line in display_address:
                address =  address + line + ', '
            address = address[:-2]
        except KeyError:
            address = 'No address available'

        # Website
        try:
            website_url = Yelp_Detail_Query_Response_JSON['url']
        except KeyError:
            website_url = 'No website available'

        # Posting data to the database
        addVar = 1 # 1 if should add, 0 if should not
        try:
            dat = {'name': Yelp_Detail_Query_Response_JSON['name'],
                   'sunday_open': start[6],
                   'sunday_close': end[6],
                   'monday_open': start[0],
                   'monday_close': end[0],
                   'tuesday_open': start[1],
                   'tuesday_close': end[1],
                   'wednesday_open': start[2],
                   'wednesday_close': end[2],
                   'thursday_open': start[3],
                   'thursday_close': end[3],
                   'friday_open': start[4],
                   'friday_close': end[4],
                   'saturday_open': start[5],
                   'saturday_close': end[5],
                   'phone': phone,
                   'rating': rating,
                   'price': price,
                   'category': categories,
                   'address': address,
                   'website': website_url}
            # Check if business is already in the database
            for rest in all_restaurants_JSON:
                if str(str(dat['website'])[:len(str(rest['website']))]) == str(rest['website']):

                    # Check if restaurant data has changed
                    if str(dat['name'].encode('utf-8')) == str(rest['name'].encode('utf-8')) and str(dat['phone']) == str(rest['phone']) and str(dat['rating']) == str(rest['rating']) and str(dat['price']) == str(rest['price']) and str(dat['category']) == str(rest['category']) and str(dat['address']) == str(rest['address']) and str(dat['monday_close']) == str(rest['monday_close']) and str(dat['tuesday_close']) == str(rest['tuesday_close']) and str(dat['wednesday_close']) == str(rest['wednesday_close']) and str(dat['thursday_close']) == str(rest['thursday_close']) and str(dat['friday_close']) == str(rest['friday_close']) and str(dat['saturday_close']) == str(rest['saturday_close']) and str(dat['sunday_close']) == str(rest['sunday_close']) and str(dat['monday_open']) == str(rest['monday_open']) and str(dat['tuesday_open']) == str(rest['tuesday_open']) and str(dat['wednesday_open']) == str(rest['wednesday_open']) and str(dat['thursday_open']) == str(rest['thursday_open']) and str(dat['friday_open']) == str(rest['friday_open']) and str(dat['saturday_open']) == str(rest['saturday_open']) and str(dat['sunday_open']) == str(rest['sunday_open']):
                        addVar = 0
                        break
                    else:
                        id_to_delete = int(rest['id'])
                        delete_params = {'idNum': id_to_delete}
                        url_del = 'http://127.0.0.1:8000/restaurant/delete/'
                        requests.delete(url = url_del, json = delete_params)
                        break

                elif str(dat['name'].encode('utf-8')) == str(rest['name'].encode('utf-8')) and str(dat['address']) == str(rest['address']):

                    # Check if restaurant data has changed
                    if str(str(dat['website'])[:len(str(rest['website']))]) == str(rest['website']) and str(dat['phone']) == str(rest['phone']) and str(dat['rating']) == str(rest['rating']) and str(dat['price']) == str(rest['price']) and str(dat['category']) == str(rest['category']) and str(dat['monday_close']) == str(rest['monday_close']) and str(dat['tuesday_close']) == str(rest['tuesday_close']) and str(dat['wednesday_close']) == str(rest['wednesday_close']) and str(dat['thursday_close']) == str(rest['thursday_close']) and str(dat['friday_close']) == str(rest['friday_close']) and str(dat['saturday_close']) == str(rest['saturday_close']) and str(dat['sunday_close']) == str(rest['sunday_close']) and str(dat['monday_open']) == str(rest['monday_open']) and str(dat['tuesday_open']) == str(rest['tuesday_open']) and str(dat['wednesday_open']) == str(rest['wednesday_open']) and str(dat['thursday_open']) == str(rest['thursday_open']) and str(dat['friday_open']) == str(rest['friday_open']) and str(dat['saturday_open']) == str(rest['saturday_open']) and str(dat['sunday_open']) == str(rest['sunday_open']):
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

        except KeyError:
            continue

        # Confirm whether or not to add to database
        if addVar == 1:
            POSTURL = 'http://127.0.0.1:8000/restaurant/add/'
            r = requests.post(POSTURL, json = dat)

    # Setting offset as required for next iteration that will request a new list of restaurants from Yelp
    offset = offset + 50
