from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.utils import timezone
from django.views import generic

from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
import json
from .models import Venue, Event, UserEvent

# Create your views here.

def ReturnAllEvents(request):
  '''
  Receives request and returns JSON for all current events
  Arguments:
    request = request object
  '''
  events = Event.objects.all()
  data = serializers.serialize('json', events)

  return HttpResponse(data, content_type='application/json')

def ReturnUserEvents(request):
  '''
  Receives request and returns JSON for events matching current logged in user
  Arguments:
    request = request object
  '''
  user_id = request.user.id

  user_events = set(Event.objects.filter(userevent__user=user_id))
  data = serializers.serialize('json', user_events)

  return HttpResponse(data, content_type='application/json')

def ReturnAllVenues(request):
  '''
  Receives request and returns JSON for all venues
  Arguments:
    request = request object
  '''
  venues = Venue.objects.all()
  data = serializers.serialize('json', venues)

  return HttpResponse(data, content_type='application/json')

def login_user(request):
  '''
  Receives request from login form (or create_user def). Parses object by value (username, password), authenticates user & logins in the user

  Values:
      request = request object sent from login form or create_user def
  '''
  UserName = request.POST['UserName']
  Password = request.POST['Password']
  user = authenticate(username=UserName, password=Password)
  if user is not None:
      login(request, user)
      return HttpResponseRedirect("/loggedin/#/events")
  else:
      return HttpResponseRedirect("/login")


def logout_user(request):
  '''
  Receives request from site & logs out current user, redirects to landing page

  Values:
      request = request object sent from site
  '''
  logout(request)
  return HttpResponseRedirect("/")


def create_user(request):
  '''
  Receives request object from register form. Parses object by value (username, password, first_name, last_name), creates new user, saves to database & calls login_user def

  Values:
      request = request object sent from register form
  '''

  UserName = request.POST['UserName']
  Password = request.POST['Password']
  FirstName = request.POST['FirstName']
  LastName = request.POST['LastName']

  user = User.objects.create_user(username=UserName,
                                  password=Password,
                                  first_name=FirstName,
                                  last_name=LastName)
  user.save()
  return HttpResponseRedirect("../login/")


def receive_event_form(request):
  '''
  Receives request object from Angular 'create event' form. Parses object by value (name, description, begin time, end time, ticket limit, address, and venue), and saves to database. Returns true so the Angular controller can get on with its next thing. 

  Values: 
    request = request object sent from event form
  '''
  obj = json.loads(request.body.decode())
  name = obj["name"]
  description = obj["description"]
  begin_date_time = obj["startTime"]
  end_date_time = obj["endTime"]
  tix_limit = obj["capacity"]
  address = obj["address"]
  venue = obj["venue"]

  event = Event.objects.create_event(name=name, 
                                    description=description, 
                                    begin_date_time=begin_date_time, 
                                    end_date_time=end_date_time,
                                    tix_limit=tix_limit,
                                    address=address,
                                    venue=venue)
  event.save()
  return True

def receive_venue_form(request):

  obj = json.loads(request.body.decode())
  name = obj["name"]

  venue = Venue.objects.create_venue(name=name)
  venue.save()
  return True
