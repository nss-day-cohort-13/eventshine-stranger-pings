from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone

from .models import Venue, Event, UserEvent

# Create your views here.

def index(request):
  return HttpResponse("Hello Losers")
