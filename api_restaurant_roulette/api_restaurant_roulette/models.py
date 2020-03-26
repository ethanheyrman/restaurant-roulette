from django.db import models
import datetime

# Create your models here.
class Restaurant(models.Model):
    name = models.TextField()
    sunday_open = models.TimeField(default=datetime.time(0, 0))
    sunday_close = models.TimeField(default=datetime.time(0, 0))
    monday_open = models.TimeField(default=datetime.time(0, 0))
    monday_close = models.TimeField(default=datetime.time(0, 0))
    tuesday_open = models.TimeField(default=datetime.time(0, 0))
    tuesday_close = models.TimeField(default=datetime.time(0, 0))
    wednesday_open = models.TimeField(default=datetime.time(0, 0))
    wednesday_close = models.TimeField(default=datetime.time(0, 0))
    thursday_open = models.TimeField(default=datetime.time(0, 0))
    thursday_close = models.TimeField(default=datetime.time(0, 0))
    friday_open = models.TimeField(default=datetime.time(0, 0))
    friday_close = models.TimeField(default=datetime.time(0, 0))
    saturday_open = models.TimeField(default=datetime.time(0, 0))
    saturday_close = models.TimeField(default=datetime.time(0, 0))
    phone = models.BigIntegerField()
    rating = models.FloatField()
    price = models.SmallIntegerField()
    category = models.TextField()
    address = models.TextField()
    website = models.TextField()

    def _str_(self):
        return self.name
