from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.views import generic

from .models import Venue, Event, UserEvent

# Create your views here.

class IndexView(generic.TemplateView):
  template_name = 'stranger_pings/index.html'
