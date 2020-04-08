from django.test import TestCase
from .RestaurantParser import fill_db
import json

# Create your tests here.
class RandomRestaurantTests(TestCase):
    def setUp(self):
        fill_db(self.client)

    def test_post405(self):
        # The server should respond with 405 to a post request to signal that
        # post requests are not allowed for this service
        err_code = "/restaurant/rand/ should respond with code 405 to a post request"
        response = self.client.post("/restaurant/rand/")

        self.assertEqual(response.status_code, 405, err_code)

    def test_put405(self):
        # The server should respond with 405 to a post request to signal that
        # put requests are not allowed for this service
        err_code = "/restaurant/rand/ should respond with code 405 to a put request"
        response = self.client.put("/restaurant/rand/")

        self.assertEqual(response.status_code, 405, err_code)

    def test_test(self):
        # Make a random request NUM_REQUESTS to see if there is a reasonably random
        # distrobution of results
        NUM_REQUESTS = 10000
        #Allow for up to 20% error
        allowable_error = 0.20
        counts = {}

        for i in range(NUM_REQUESTS):
            response = self.client.get("/restaurant/rand/")

            self.assertEqual(response.status_code, 200, "/restaurant/rand get request with filled db " +
                "does not have a response code of 200")

            data = json.loads(response.content.decode("utf-8"))
            id = data['id']

            if id in counts.keys():
                counts[id] += 1
            else:
                counts[id] = 1

        expected_distrobution = 1 / len(counts)

        for count in counts.values():
            percent = count / NUM_REQUESTS
            self.assertAlmostEqual(percent,
                expected_distrobution,
                delta=expected_distrobution * allowable_error,
                msg="Random distrobution is not random enough")
