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
parser.add_argument("--method", default=1, help="This is the way you would like to add data to the db (1 for yelp search, 2 for CSV file)")
parser.add_argument("--filename", default="RestaurantList.csv", help="This is the name of the CSV file to read. It must be in the same directory as this script")
parser.add_argument("--count", default=50, help="This is the number of restuarants to retrieve")
parser.add_argument("--offset", default=0, help="This is the offset at which you would like the search to begin")
parser.add_argument("--search_location", default='Madison, WI', help="This is where you would like to search (e.g. Madison,WI)")
parser.add_argument("--radius", default=8050, help="This is the radius you would like to search")
args = parser.parse_args()
method = int(args.method)
if method == 1:

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
            start = ['00:00','00:00','00:00','00:00','00:00','00:00','00:00'] # date-time
            end = ['00:00','00:00','00:00','00:00','00:00','00:00','00:00'] # date-time
            start_copy = ['00:00','00:00','00:00','00:00','00:00','00:00','00:00']
            end_copy = ['00:00','00:00','00:00','00:00','00:00','00:00','00:00']
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
                        start_i = inner_data_point['start'][:2] + ':' + inner_data_point['start'][2:]
                        end_i = inner_data_point['end'][:2] + ':' + inner_data_point['end'][2:]
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
                # TODO: Check if business is already in the database
                # if all data matches an entry in database:
                    #continue
                # elif name and url match an entry in database:
                    # try:
                        # post to database
                        # delete entry that had partial match
                    # except post error:
                        # continue
                # else:
                    # post to database

            except KeyError:
                continue
            POSTURL = 'http://127.0.0.1:8000/restaurant/add/'
            r = requests.post(POSTURL, json = dat)

        # Setting offset as required for next iteration that will request a new list of restaurants from Yelp
        offset = offset + 50

elif method == 2:

    # Handling arguments for database entry method of reading CSV file
    filename = args.filename
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(my_path, filename)

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

                    # Posting data to database
                    url = 'http://127.0.0.1:8000/restaurant/add/'
                    r = requests.post(url, json = dat)
                i = i + 1

        # Closing file
        csv_file.close()
    except FileNotFoundError:
        print('.\n.\n.')
        print("File not found.")
        print('.\n.\n.')
        sys.exit()

else:

    # If method entered was not 1 or 2
    print('.\n.\n.')
    print("Invalid method of database entry.")
    print('.\n.\n.')
