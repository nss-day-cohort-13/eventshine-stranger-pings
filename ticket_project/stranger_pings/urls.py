from django.conf.urls import url, include

from . import views
from django.views import generic

event_patterns = [
  url(r'^all/$', views.ReturnAllEvents),
  url(r'^user/$', views.ReturnUserEvents),
  url(r'^create/$', views.receive_event_form),
]

venue_patterns = [
  url(r'all/$', views.ReturnAllVenues)
]

urlpatterns = [

  url(r'^loggedin/', generic.TemplateView.as_view(template_name="stranger_pings/index.html"), name='index'),
  url(r'^$', generic.TemplateView.as_view(template_name="stranger_pings/home.html"), name="unloggedinhome"),
  url(r'^login/', generic.TemplateView.as_view(template_name="stranger_pings/login.html"), name='login'),
  # TODO: write register url.

  url(r'^events/', include(event_patterns)),
  url(r'^login_user/$', views.login_user, name='login_user'),
  url(r'^venues/', include(venue_patterns)),
  url(r'^register/$', views.create_user, name='create_user')

]
