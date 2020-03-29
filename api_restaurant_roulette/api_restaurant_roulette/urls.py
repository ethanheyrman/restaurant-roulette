from django.urls import path

from . import views

urlpatterns = [
    path('add/', views.add_restaurant, name='add'),
    path('rand/', views.random_restaurant, name='rand'),
    path('filter/', views.filter_restaurant, name='filter')
]