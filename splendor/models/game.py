# pylint:disable=C0114,C0103
from django.db import models
from shortuuid.django_fields import ShortUUIDField


class GameManager(models.Manager):  # pylint:disable=R0903
    """ GameManager provides access to methods from the Class instance of an
        object instance via the 'objects' field"""

    def create_new_game(self, request=None, game_name=None, username="Anonymous"):  # pylint: disable=W0613
        """instantiates a new game and related instances"""
        game = Game(game_name=game_name)
        game.save()

        # initializing bank
        game.bank.create(gems='7,7,7,7,7,5')  # pylint:disable=E1101

        # initializing players
        player = game.players.create(name=username)  # pylint:disable=E1101
        # if player.user:
        #     # user ignored temporarily (workaround for: only one active game per user)
        #     player = player.initialize(user=request.user)
        # else:
        player = player.initialize()

        # initializing decks
        for level in range(1, 4):
            deck = game.decks.create(level=level)  # pylint:disable=E1101
            deck.create_starting_deck(level)

        # initializing board
        board = game.board.create()  # pylint:disable=E1101
        board = board.initialize()

        game.save()
        return game

    def add_player(self, game_url, name):
        """Adds a new player to the game"""
        game = Game.objects.get(pk=game_url)

        player = game.players.create(name=name)  # pylint:disable=E1101
        player = player.initialize()
        # game.num_players.set(game.num_players + 1)
        game.save()


class Game(models.Model):
    """Contains all the information necessary for a single game and its players"""
    game_url = ShortUUIDField(primary_key=True,
                              length=8,
                              max_length=40
                              )
    game_name = models.CharField(max_length=64,
                                 null=True,
                                 blank=True
                                 )
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True,
                                        blank=True
                                        )
    num_players = models.IntegerField(default=1)

    objects = GameManager()  # links the 'objects' field to the GameManager

    def __str__(self):
        return str(self.game_url)
