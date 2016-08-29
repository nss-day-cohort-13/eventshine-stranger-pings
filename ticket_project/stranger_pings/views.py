from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.views import generic

from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


from .models import Venue, Event, UserEvent

# Create your views here.



class IndexView(generic.TemplateView):
  template_name = 'stranger_pings/index.html'

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


def login_user(request):
  '''
  Receives request from login form (or create_user def). Parses object by value (username, password), authenticates user & logins in the user

  Values:
      request = request object sent from login form or create_user def
  '''
  UserName = request.POST['username']
  Password = request.POST['password']
  user = authenticate(username=UserName, password=Password)
  if user is not None:
      login(request, user)
      # Redirect to My Events Page
  else:
      pass
      # Redirect to Login/Register Page


def logout_user(request):
  '''
  Receives request from site & logs out current user, redirects to landing page

  Values:
      request = request object sent from site
  '''
  logout(request)
  # Redirect to landing page


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
  login_user(request)
