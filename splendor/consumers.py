""" Handles all Websocket connections and Channels """
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .models import Game
from .serializers import GameSerializer


class GameConsumer(AsyncJsonWebsocketConsumer):
    """handles incoming and outgoing websocket messages within a game"""

    async def connect(self):
        # print('Client has connected to the server')
        self.room_name = "home"  # pylint:disable=W0201
        self.room_group_name = f'game_{self.room_name}'  # pylint:disable=W0201
        # self.room_name = self.scope['url_route']['kwargs']['game_url']
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        # print("Client has been disconnected from server")
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        await self.close()

    async def player_move(self, message):
        """verifys and performs a player move and returns the new game details to the group"""
        print(message["player"])
        # print(f'Recieved request of type {request["type"]} from client')
        await database_sync_to_async(Game.objects.player_move)(message["game_url"], message["player"], message["move"])
        game = await database_sync_to_async(Game.objects.get)(pk=message["game_url"])
        msg = GameSerializer(instance=game, many=False)

        response = {
            "type": "request_game_details",
            "message": msg.data,
        }
        await self.send_json(response)

    # async def receive(self, text_data=None, bytes_data=None, **kwargs):
    async def receive_json(self, content, **kwargs):
        print(f'Recieved request of type {content["type"]} from client')
        req_type = content["type"]
        msg = content["message"]
        if req_type in ["add_player", "request_game_list", "create_game", "request_game_details"]:
            print("private send")
            await self.channel_layer.send(self.channel_name, {
                "type": req_type,
                "message": msg
            })
        elif req_type in ["player_move"]:
            # on player move update the
            await self.player_move(content["message"])
            await self.channel_layer.group_send(self.room_group_name, {
                "type": "request_game_details",
                "message": msg["game_url"]
            })
        else:
            print("group send")
            await self.channel_layer.group_send(self.room_group_name, {
                "type": req_type,
                "message": msg
            })

     # TODO: send group update after player is added
    async def add_player(self, request):
        """adds a new player to the game and responds with the new game details"""
        print(f'Recieved request of type {request["type"]} from client')
        message = request["message"]
        game = await database_sync_to_async(Game.objects.get)(game_url=message["game_url"])
        await database_sync_to_async(Game.objects.add_player)(game_url=message["game_url"], name=message["username"])
        players = await database_sync_to_async(game.players.all().order_by)('-turn')

        response = {
            "type": "add_player",
            "message": str(players[0].id),
        }
        await self.send_json(response)

    async def request_game_list(self, request):  # pylint: disable=unused-argument
        """returns list of all games"""
        print(f'Recieved request of type {request["type"]} from client')
        games = await database_sync_to_async(Game.objects.all)()
        games = GameSerializer(games, many=True)
        response = {
            "type": "request_game_list",
            "message": games.data,
        }
        await self.send_json(response)

    async def create_game(self, request):
        """creates a new game on the db and returns the instance to the client"""
        print(f'Recieved request of type {request["type"]} from client')
        message = request["message"]
        game = await database_sync_to_async(Game.objects.create_new_game)(game_name=message["gameName"], username=message["username"])
        # print(GameSerializer(game).data)
        await database_sync_to_async(game.save)()
        response = {
            "type": "create_game",
            "message": GameSerializer(game).data,
        }
        await self.send_json(response)

    async def request_game_details(self, request):
        """returns the details for the game with the provided primarky key to the client"""
        print(f'Recieved request of type {request["type"]} from client')
        game_url = request["message"]
        # print(pk)
        game = await database_sync_to_async(Game.objects.filter)(pk=game_url)
        # print(game)
        msg = GameSerializer(instance=game.first(), many=False)
        # print(msg.data)
        response = {
            "type": "request_game_details",
            "message": msg.data,
        }
        await self.send_json(response)
