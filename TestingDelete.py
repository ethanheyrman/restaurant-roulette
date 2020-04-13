import sys
import csv, io
import requests
import os.path
import argparse

id_to_delete = 50000
delete_params = {'idNum': id_to_delete}
url_del = 'http://127.0.0.1:8000/restaurant/delete/'
requests.delete(url = url_del, json = delete_params)
