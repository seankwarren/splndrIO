from rest_framework import serializers

from django.contrib.auth.models import User

from .models import Noble
from .models import Card
from .models import Game
from .models import Player
from .models import Deck
from .models import Board
from .models import Bank


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'pk',)


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'color', 'cost', 'points', 'level')


class DeckSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)

    class Meta:
        model = Deck
        fields = ('id', 'level', 'cards')


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ('id', 'gems')


class NobleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noble
        fields = ('id', 'cost', 'points')


class PlayerSerializer(serializers.ModelSerializer):
    #    user = serializers.StringRelatedField(many=False, read_only=True)
    bank = BankSerializer(many=True, read_only=True)
    deck = DeckSerializer(many=True, read_only=True)
    nobles = NobleSerializer(many=True, read_only=True)

    class Meta:
        model = Player
        fields = ('id', 'name', 'bank', 'deck', 'nobles')


class BoardSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True, read_only=True)
    nobles = NobleSerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields = ('id', 'cards', 'nobles')


class GameSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)
    board = BoardSerializer(many=True, read_only=True)
    bank = BankSerializer(many=True, read_only=True)
    decks = DeckSerializer(many=True, read_only=True)
    # game_name = serializers.SerializerMethodField('game_name')
    # completed_at = serializers.SerializerMethodField('get_completed_at')

    class Meta:
        model = Game
        fields = ['game_url', 'game_name', 'created_at', 'completed_at',
                  'num_players', 'players', 'bank', 'board', 'decks']

    # def get_game_name(self, obj):
    #     return getattr(obj, 'game_name', None)

    # def get_completed_at(self, obj):
    #     return getattr(obj, 'completed_at', None)
