from django.contrib import admin
from django.urls import path, include

admin.autodiscover()

websocket_urlpatterns = [
    path("", include("splendor.routing")),
]