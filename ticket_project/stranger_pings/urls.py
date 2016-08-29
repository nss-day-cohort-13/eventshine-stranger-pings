from django.conf.urls import url, include

from . import views
from django.views import generic

event_patterns = [
  url('^all/$', views.ReturnAllEvents),
  url(r'^user/$', views.ReturnUserEvents),
]

urlpatterns = [

    url(r'^loggedin/', generic.TemplateView.as_view(template_name="stranger_pings/index.html"), name='index'),
    url(r'^$', generic.TemplateView.as_view(template_name="stranger_pings/home.html"), name="unloggedinhome"),
    # TODO: write login url.
    # TODO: write register url.

  url(r'^events/', include(event_patterns)),
  url(r'^register/$', views.create_user, name='create_user')

]
