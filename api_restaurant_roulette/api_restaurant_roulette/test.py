import itertools

import requests
import json

url = 'http://127.0.0.1:8000/restaurant/filtered/'
data = [
        {
            'category': ['French', 'American'],
            'rating': '4',
            'price': '2',
            'distance':"1"
        }
    ]
        # {
        #     'category': 'american',
        #     'rating': '5',
        #     'price': '1',
        #     'distance': '3'
        # },
        # {
        #     'category': 'Fr',
        #     'rating': '2',
        #     'price': '3',
        #     'distance': '5'
        # },
# ]

json_data = json.dumps(data)

response = requests.post(url=url, data=json_data)
response = response.content.decode()
# response = json.loads(response)


print(response)
