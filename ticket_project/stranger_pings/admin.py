from django.contrib import admin

# Register your models here.

from .models import Event, UserEvent, Venue

admin.site.register(Event)
admin.site.register(UserEvent)
admin.site.register(Venue)
