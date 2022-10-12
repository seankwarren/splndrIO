"""Routes websocket connection urls to consumers"""
from django.urls import re_path

from .consumers import GameConsumer

websocket_urlpatterns = [
    # re_path(r'', GameConsumer.as_asgi()),
    re_path(r'games/', GameConsumer.as_asgi()),
    # re_path(r'games/(?P<game_url>\w+)/$', GameConsumer.as_asgi()),
]
