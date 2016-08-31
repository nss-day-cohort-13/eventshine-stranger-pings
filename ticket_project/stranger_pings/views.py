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

def ReturnSingleUserEvent(request, event_id):
  '''
  Receives request and returns JSON for events matching current logged in user
  Arguments:
    request = request object
    event_id = the event id of the user event being searched for
  '''
  user_id = request.user.id

  user_events = set(Event.objects.filter(userevent__user=user_id, userevent__event=event_id))
  data = serializers.serialize('json', user_events)

  return HttpResponse(data, content_type='application/json')

def ReturnAllRegistered(request, event_id):
  '''
  Receives request and returns JSON for all user events matching the
  event id passed in
  Arguments:
    request = request object
    event_id = the event id of the user events being searched for
  '''
  user_events = set(UserEvent.objects.filter(event=event_id))
  data = serializers.serialize('json', user_events)

  return HttpResponse(data, content_type='application/json')

def ReturnSingleEvent(request, event_id):
  '''
  Receives request and returns JSON for the event matching the id passed in
  Arguments:
    request = request object
    event_id = the id for the event being requested
  '''
  this_event = Event.objects.filter(pk=event_id)
  data = serializers.serialize('json', this_event)

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
  if request.method == "POST":
    obj = json.loads(request.body.decode())
    name = obj["name"]
    description = obj["description"]
    begin_date_time = obj["startTime"]
    end_date_time = obj["endTime"]
    tix_limit = obj["capacity"]
    address = obj["address"]
    venue = obj["venue"]
    print(venue)

    event = Event.objects.create(name=name,
                                      description=description,
                                      begin_date_time=begin_date_time,
                                      end_date_time=end_date_time,
                                      tix_limit=tix_limit,
                                      address=address,
                                      venue_id=venue["pk"])
    event.save()
    return HttpResponseRedirect("/")


def receive_venue_form(request):
  '''
  Receives request object from Angular 'create venue' form. Parses object by value (name only), and saves to database. Returns true so the Angular controller can get on with its next thing.

  Values:
    request = request object sent from event form
  '''
  if request.method == "POST":
    obj = json.loads(request.body.decode())
    name = obj["name"]
    venue = Venue.objects.create(name=name)
    venue.save()
    return HttpResponseRedirect("/")

def RegisterEvent(request, event_id):
  '''
  Receives request, creates a user event with current user and passed in event_id,
  and returns a JSON object formatted: {'success': true/false}
  Arguments:
    request = request object
    event_id = the id for the event being registered
  '''
  user = request.user
  event = Event.objects.get(pk=int(event_id))
  success = {'success': False}

  try:
    u = UserEvent.objects.create(user=user, event=event, creator=False)
    u.save()
    success['success'] = True
  except Exception as ex:
    print(ex)
    pass

  data = json.dumps(success)
  return HttpResponse(data, content_type='application/json')

def UnregisterEvent(request, event_id):
  '''
  Receives request, deletes a user event with current user and passed in event_id,
  and returns a JSON object formatted: {'success': true/false}
  Arguments:
    request = request object
    event_id = the id for the event being unregistered
  '''
  user = request.user.id
  user_event = UserEvent.objects.get(user=user, event=event_id)
  success = {'success': False}

  try:
    user_event.delete()
    success['success'] = True
  except Exception as ex:
    print(ex)
    pass

  data = json.dumps(success)
  return HttpResponse(data, content_type='application/json')
