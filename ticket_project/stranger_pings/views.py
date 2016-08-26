from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.views import generic
from django.contrib.auth.models import User

from .models import Venue, Event, UserEvent

# Create your views here.


class IndexView(generic.TemplateView):
    template_name = 'stranger_pings/index.html'


def create_user(request):

    UserName = request.POST['UserName']
    Password = request.POST['Password']
    FirstName = request.POST['FirstName']
    LastName = request.POST['LastName']

    user = User.objects.create_user(username=UserName,
                                    password=Password,
                                    first_name=FirstName,
                                    last_name=LastName)
    user.save()
