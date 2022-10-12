from django.urls import path

from splendor import views

urlpatterns = [
    path("games/", views.GameList.as_view(), name="game-list"),
    path("games/<str:game_url>/", views.GameDetail.as_view(), name="game-detail"),
]
