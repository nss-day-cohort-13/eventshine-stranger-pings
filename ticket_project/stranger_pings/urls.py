from django.conf.urls import url, include

from . import views
from django.views import generic

event_patterns = [
  url(r'^all/$', views.ReturnAllEvents),
  url(r'^user/$', views.ReturnUserEvents),
  url(r'^create/$', views.receive_event_form),
  url(r'^(?P<event_id>[0-9]*)/$', views.ReturnSingleEvent)
  url(r'^venue/$', views.receive_venue_form),
]

venue_patterns = [
  url(r'all/$', views.ReturnAllVenues)
]

urlpatterns = [

  url(r'^$', generic.TemplateView.as_view(template_name="stranger_pings/home.html"), name="unloggedinhome"),

  # Log In URLS
  url(r'^login/', generic.TemplateView.as_view(template_name="stranger_pings/login.html"), name='login'),
  url(r'^loggedin/', generic.TemplateView.as_view(template_name="stranger_pings/index.html"), name='index'),
  url(r'^login_user/$', views.login_user, name='login_user'),
  url(r'^logout/$', views.logout_user, name='logout_user'),

  url(r'^events/', include(event_patterns)),
  url(r'^venues/', include(venue_patterns)),

  # Register URLS
  url(r'^register/', generic.TemplateView.as_view(template_name="stranger_pings/register.html")),
  url(r'^registered_user/$', views.create_user, name='create_user'),
]

