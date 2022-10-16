# pylint:disable=C0114,C0103
from django.db import models
from shortuuid.django_fields import ShortUUIDField

from splendor.models.util import CARD_COLORS


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
        player = game.players.create(
            name=username, turn=1)  # pylint:disable=E1101

        game.num_players = 1
        game.current_player.add(player)
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
        game.num_players += 1
        player = game.players.create(
            name=name, turn=game.num_players)  # pylint:disable=E1101
        player = player.initialize()
        # game.num_players.set(game.num_players + 1)
        game.save()

    def end_turn(self, game_url):
        """Updates the game for the next move"""
        game = Game.objects.get(pk=game_url)
        for game_player in game.players.all():
            game_player.turn = int(game_player.turn) - 1
            if game_player.turn <= 0:
                game_player.turn = game.num_players

            if game_player.turn == 1:
                game.current_player.set([game_player])

            game_player.save()

    def player_move(self, game_url, player, move):
        """makes the necessary changes to the game on db based on player move"""
        game = Game.objects.get(pk=game_url)
        player = game.players.get(pk=player)
        # board = game.board.get()

        def verify_move():
            def verify_gems(gems_to_draw):
                gems_to_draw = [int(num_str)
                                for num_str in gems_to_draw.split(',')]
                if max(gems_to_draw) == 2:
                    if sum(gems_to_draw) == 2:
                        return True
                if max(gems_to_draw) == 1:
                    if sum(gems_to_draw) == 3:
                        return True
                return False

            def verify_purchase():
                card = game.board.first().cards.get(pk=move["cardToPurchase"])
                card_cost = card.cost.split(',')
                player_bank = [int(num_str)
                               for num_str in player.bank.first().gems.split(',')]
                for card in player.deck.first().cards.all():
                    player_bank[card.color-1] = player_bank[card.color-1] + 1

                card_cost = [int(num_str) for num_str in card_cost]

                # verify that there are enough of each gem or that gold can cover the difference
                if any([cost > gems for (cost, gems) in zip(card_cost, player_bank)]):
                    if sum([gems - cost for (cost, gems) in zip(card_cost, player_bank)]) > player_bank[5]:
                        return False
                return True

            purchasing_card = move["cardToPurchase"] != ""
            reserving_card = move["cardToReserve"] != ""
            drawing_gems = move["gemsToDraw"] != ""

            if player.turn != 1:
                return False
            if sum([purchasing_card, reserving_card, drawing_gems]) != 1:
                return False
            if purchasing_card and not verify_purchase():
                return False
            if reserving_card:
                return True
            if drawing_gems and not verify_gems(move["gemsToDraw"]):
                return False

            return True

        if not verify_move():
            return
        if move["cardToPurchase"]:
            print("purchasing card")
            board = game.board.first()
            card = board.cards.get(pk=move["cardToPurchase"])
            player_deck = player.deck.first()

            board.cards.remove(card)
            player_deck.cards.add(card)

            new_card = game.decks.get(level=card.level).draw_card()
            board.cards.add(new_card)
            Game.objects.end_turn(game.game_url)

        elif move["gemsToDraw"]:
            player_bank = [int(num_str)
                           for num_str in player.bank.first().gems.split(',')]
            gems_to_draw = [int(num_str)
                            for num_str in move["gemsToDraw"].split(',')]
            print("drawing gems... new balance: ", player_bank + gems_to_draw)

        elif move["cardToReserve"]:
            print("reserving card")
            board = game.board.first()
            card = board.cards.get(pk=move["cardToReserve"])
            player_deck = player.deck.first()

            board.cards.remove(card)
            player_deck.cards.add(card)

            new_card = game.decks.get(level=card.level).draw_card()
            board.cards.add(new_card)
            Game.objects.end_turn(game.game_url)
        elif move["endTurn"]:
            pass
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
