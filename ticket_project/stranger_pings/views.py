from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.views import generic
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

from .models import Venue, Event, UserEvent

# Create your views here.


class IndexView(generic.TemplateView):
    template_name = 'stranger_pings/index.html'


def create_user(request):
    '''
    Receives request object from Angular register form. Parses object by value (username, password, first_name, last_name), creates new user & saves to database

    Values:
        request = request object sent from Angular register from
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


def login_user(request):
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
    logout(request)
    # Redirect to landing page
