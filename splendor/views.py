from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Game
from .serializers import GameSerializer

# Create your views here.

# less than 10 MB for 100 games, means 1 GB can support 10000 games, not accounting for completed game cleanup
class GameList(APIView):
    http_method_names = ['get', 'post']
    def get(self,request):
        serializer = GameSerializer(Game.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        game = Game.objects.create_new_game(request)
        serializer = GameSerializer(game, many=False)
        return Response(serializer.data)


class GameDetail(APIView):
    http_method_names = ['get', 'put', 'delete']

    def get(self,request,game_url):
        serializer = GameSerializer(Game.objects.get(pk=game_url), many=False)
        return Response(serializer.data)

    def put(self, request, game_url):
        serializer = GameSerializer(Game.objects.get(pk=game_url), many=False)
        return Response(serializer.data)
    
    def delete(self, request, game_url):
        # TODO: needs to be expanded to delete all related objects
        # this may already be achieved by the cascade being corrected with foriegn keys
        games = Game.objects.get(pk=game_url)
        games.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

