import sys
sys.path.append("../../")
from django.test import TestCase
from django.db.models import Max
from .models import Restaurant
from RestaurantParser import fill_db
import json

# Create your tests here.
class FilteredRestaurantTests(TestCase):
    _url = "/restaurant/filtered/"

    def setUp(self):
        fill_db(self.client)

    def test_no_query(self):
        response = self.client.post(self._url, data = [], content_type = 'application/json')
        self.assertEqual(response.status_code, 200, "Filtered Restaurant post request does not return 200")

    def test_basic_query(self):
        data = [
            {
                'category': [{'title': 'French'}, {'title': 'American'}],
                'rating': 'ssss',
                'price': '$$$',
                'latitude': "43.0695",
                'longitude': "-89.4125"
            },
            {
                'category': [{'title': 'French'}],
                'rating': 'ssss',
                'price': '$',
                'latitude': "43.0695",
                'longitude': "-89.4125"
            }
        ]

        response = self.client.post(self._url, data = data, content_type = 'application/json')
        self.assertEqual(response.status_code, 200, "Filtered Restaurant post request does not return 200")


class RandomRestaurantTests(TestCase):
    _url = "/restaurant/rand/"

    def setUp(self):
        fill_db(self.client)

    def test_post405(self):
        # The server should respond with 405 to a post request to signal that
        # post requests are not allowed for this service
        err_code = "/restaurant/rand/ should respond with code 405 to a post request"
        response = self.client.post(self._url)

        self.assertEqual(response.status_code, 405, err_code)

    def test_put405(self):
        # The server should respond with 405 to a post request to signal that
        # put requests are not allowed for this service
        err_code = "/restaurant/rand/ should respond with code 405 to a put request"
        response = self.client.put(self._url)

        self.assertEqual(response.status_code, 405, err_code)

    def test_distrobution(self):
        # Make a random request NUM_REQUESTS to see if there is a reasonably random
        # distrobution of results
        NUM_REQUESTS = 10000
        #Allow for up to 20% error
        allowable_error = 0.20
        counts = {}

        for i in range(NUM_REQUESTS):
            response = self.client.get(self._url)

            self.assertEqual(response.status_code, 200, "/restaurant/rand get request with filled db " +
                "does not have a response code of 200")

            data = json.loads(response.content.decode("utf-8"))
            id = data['id']

            if id in counts.keys():
                counts[id] += 1
            else:
                counts[id] = 1

        # Make sure restaurants are returned in an even distrobution
        expected_distrobution = 1 / len(counts)

        for count in counts.values():
            percent = count / NUM_REQUESTS
            self.assertAlmostEqual(percent,
                expected_distrobution,
                delta=expected_distrobution * allowable_error,
                msg="Random distrobution is not random enough")

    def test_all_restaurants_returned(self):
        # Make sure each restaurant that can be returned is
        max_id = Restaurant.objects.all().aggregate(max_id=Max("pk"))['max_id']
        NUM_REQUESTS = 1000
        returned_indices = []

        for i in range(NUM_REQUESTS):
            response = self.client.get(self._url)

            self.assertEqual(response.status_code, 200, "/restaurant/rand get request with filled db " +
                "does not have a response code of 200")

            data = json.loads(response.content.decode("utf-8"))
            id = data['id']

            if not id in returned_indices:
                returned_indices.append(id)

        returned_indices.sort()

        for i in range(max_id):
            cur_index = i + 1
            self.assertEqual(cur_index, returned_indices[i], "Missing restaurant id: " + str(i))

class EmptyDBTests(TestCase):
    def test_empty_rand(self):
        response = self.client.get("/restaurant/rand/")
        self.assertEqual(response.status_code, 500, "/restaurant/rand/ should return code 500 with an empty DB")

    def test_empty_delete(self):
        data = {'idNum': 0}
        response = self.client.delete("/restaurant/delete/", data = data, content_type = 'application/json')
        self.assertEqual(response.status_code, 500, "/restaurant/delete/ should return code 500 with an empty DB")
