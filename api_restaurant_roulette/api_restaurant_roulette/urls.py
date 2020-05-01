from django.urls import path

from . import views

urlpatterns = [
    path('add/', views.add_restaurant, name='add'),
    path('rand/', views.random_restaurant, name='rand'),
    path('filtered/', views.filter_restaurants, name='filter'),
    path('all/', views.all_restaurants, name='all'),
    path('delete/', views.delete_restaurant, name='delete')
]
