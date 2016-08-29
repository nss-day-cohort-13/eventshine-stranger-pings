from django.shortcuts import render
from django.http import HttpResponse
from django.utils import timezone
from django.views import generic
from django.core import serializers

from .models import Venue, Event, UserEvent

# Create your views here.

class IndexView(generic.TemplateView):
  template_name = 'stranger_pings/index.html'

def ReturnAllEvents(request):
  events = Event.objects.all()
  data = serializers.serialize('json', events)

  return HttpResponse(data, content_type='application/json')

def ReturnUserEvents(request):
    user_id = request.user.id

    user_events = set(Event.objects.filter(userevent__user=user_id))
    data = serializers.serialize('json', user_events)

    return HttpResponse(data, content_type='application/json')
