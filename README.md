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
$ python3 manage.py runserver
```
#### To start the Django server
```
$ python3 manage.py runserver
```
#### To manually fill the database for testing:
```
$ python3 manage.py createsuperuser
$ python3 manage.py runserver
```
Then in your web browser of choice, navigate to "localhost:8000/admin/".<br />
After logging in with the super user you created, you will be able to
add restaurants to the database.

### Frontend Setup
...
