from django.conf.urls import url, include

from . import views

event_patterns = [
    url('^all/$', views.ReturnAllEvents),
    url(r'^user/$', views.ReturnUserEvents),
]

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^events/', include(event_patterns)),
]
