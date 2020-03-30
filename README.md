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
Start the Django server, then in a different terminal run
```
$ python3 manage.py runserver
$ python3 ./api_restaurant_roulette/api_restaurant_roulette/RestaurantParser.py
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
