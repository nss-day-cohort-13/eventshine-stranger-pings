from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^events/', include(event_patterns)),
]

event_patterns = [
    url('^all/$', views.ReturnAllEvents),
    url(r'^(?P<user_id>[0-9]{4})/$', views.ReturnUserEvents),
]
