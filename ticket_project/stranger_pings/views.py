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

# def ReturnUserEvents(request, user_id):
#   user_events = UserEvent.objects.filter(user=user_id)
#   event_ids = []
#   for ue in user_events:
#     event_ids.append(ue.event)

#   matched_events = []
#   for key in event_ids:
#     fetched = Event.objects.get(pk=key)
#     matched_events.append(fetched)

