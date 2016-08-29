from django.conf.urls import url

from . import views
from django.views import generic

urlpatterns = [
    url(r'^loggedin/', generic.TemplateView.as_view(template_name="stranger_pings/index.html"), name='index'),
    url(r'^$', generic.TemplateView.as_view(template_name="stranger_pings/home.html"), name="unloggedinhome"),
    # TODO: write login url.
    # TODO: write register url.
]
