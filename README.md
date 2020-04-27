# restaurant-roulette
## Setup
After cloning the repository, go through the following steps to setup your development environment.
All terminal commands are run in the project's root directory unless otherwise noted.

### Backend Setup
#### To setup the Django backend
```
$ virtualenv venv
$ source venv/bin/activate
$ pip3 install -r ./api_restaurant_roulette/requirements/base.txt
$ python3 manage.py makemigrations api_restaurant_roulette
$ python3 manage.py migrate
```
#### To start the Django server
```
$ python3 manage.py runserver
```
#### To manually fill the database for testing:
Start the Django server.
Then if you want to fill the database with a small dataset for testing in a different terminal run:
```
$ python3 RestaurantParser.py --method 2 --filenameR RestaurantList.csv
```
If you have a Yelp API key and a Yelp client ID, export them to your environment variables as
YELP_API_KEY and YELP_CLIENT_ID, then run:
```
$ python3 RestaurantParser.py --method 1
```
### Frontend Setup
#### To setup the Node modules
```
$ cd frontend
$ npm install
```
#### To start the app in development mode
```
$ npm start
```
The app will open on http://localhost:3000 to be viewed in in the browser.

The page will automatically reload if you make changes to the code.

#### To run unit tests
```
$ python3 manage.py test
```

#### To compute the code coverage of the tests
```
$ coverage run --source='./api_restaurant_roulette' manage.py test api_restaurant_roulette
$ coverage report
```
