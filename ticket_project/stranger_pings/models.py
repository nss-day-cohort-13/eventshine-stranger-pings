from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.

# NOTE: the 'User' class is already on the standard app, we don't need to make our own one.

class Venue(models.Model):
  name = models.CharField(max_length=200)
  def __str__(self):
    return self.name

class Event(models.Model):
  name = models.CharField(max_length=200)
  description = models.CharField(max_length=1000)
  begin_date_time = models.DateTimeField("event start")
  end_date_time = models.DateTimeField("event end")
  tix_limit = models.IntegerField()
  address = models.CharField(max_length=700)
  venue = models.ForeignKey(Venue, on_delete=models.CASCADE)
  def __str__(self):
    return self.name

class UserEvent(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  event = models.ForeignKey(Event, on_delete=models.CASCADE)
  creator = models.BooleanField()
  def __str__(self):
    return(str(self.user) + " attending " + str(self.event))
