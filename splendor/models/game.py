# pylint:disable=C0114,C0103
from django.db import models
from shortuuid.django_fields import ShortUUIDField

from splendor.models.util import CARD_COLORS, toArray, toString


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
        player = game.players.create(  # pylint:disable=E1101
            name=username, turn=1)

        game.num_players = 1
        game.current_player.add(player)  # pylint:disable=E1101
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
                bank = toArray(player.bank.first().gems)
                for card in player.deck.first().cards.all():
                    bank[card.color-1] = bank[card.color-1] + 1

                card_cost = [int(num_str) for num_str in card.cost.split(',')]

                # verify that there are enough of each gem or that gold can cover the difference
                if any(cost > gems for (cost, gems) in zip(card_cost, bank)):
                    print("cost", card_cost)
                    print("balance", bank)
                    print(sum(min(0, gems - cost)
                          for (cost, gems) in zip(card_cost, bank)))
                    if abs(sum(min(0, gems - cost) for (cost, gems) in zip(card_cost, bank))) > bank[5]:
                        return False
                return True

            def verify_reserve():
                print(game.bank.get().gems)
                if int(game.bank.get().gems[10]) < 1:
                    return False
                return True

            print(move)
            if player.turn != 1:
                return False
            if sum([move["cardToPurchase"] != "",
                   move["cardToReserve"] != "",
                   move["gemsToDraw"] != ""]) != 1:
                return False
            if move["cardToPurchase"] != "" and not verify_purchase():
                return False
            if move["cardToReserve"] != "" and not verify_reserve():
                return False
            if move["gemsToDraw"] != "" and not verify_gems(move["gemsToDraw"]):
                return False

            return True

        if not verify_move():
            print("Invalid move")
            return
        if move["cardToPurchase"]:
            print("purchasing card")
            board = game.board.first()
            card = board.cards.get(pk=move["cardToPurchase"])
            player_deck = player.deck.first()

            # remove card from board and add to player's hand
            board.cards.remove(card)
            player_deck.cards.add(card)

            # draw a new card and place on board
            new_card = game.decks.get(level=card.level).draw_card()
            board.cards.add(new_card)

            # exchange gems between player and bank
            player_bank = player.bank.get()
            gems_to_pay = card.cost
            game_bank = game.bank.get()

            # TODO: account for spending gold gems
            player_balance = [
                player - toPay for (player, toPay) in zip(toArray(player_bank.gems), toArray(gems_to_pay))]
            bank_balance = [
                bank + toPay for (bank, toPay) in zip(toArray(game_bank.gems), toArray(gems_to_pay))]

            # take gems from bank
            game_bank.gems = toString(bank_balance)
            game_bank.save()
            # add gems to player
            player_bank.gems = toString(player_balance)
            player_bank.save()

            Game.objects.end_turn(game.game_url)

        elif move["gemsToDraw"]:
            player_bank = player.bank.get()
            gems_to_draw = move["gemsToDraw"]
            game_bank = game.bank.get()

            player_balance = [
                player + toDraw for (player, toDraw) in zip(toArray(player_bank.gems), toArray(gems_to_draw))]
            bank_balance = [
                bank - toDraw for (bank, toDraw) in zip(toArray(game_bank.gems), toArray(gems_to_draw))]
            # print(''.join([str(num) + ',' for num in player_balance])[:-1])
            # print(f'{player_balance=} {bank_balance=}')

            # take gems from bank
            game_bank.gems = toString(bank_balance)
            game_bank.save()
            # add gems to player
            player_bank.gems = toString(player_balance)
            player_bank.save()

        elif move["cardToReserve"]:
            print("reserving card")
            board = game.board.first()
            card = board.cards.get(pk=move["cardToReserve"])
            player_deck = player.deck.get()
            player_bank = player.bank.get()
            game_bank = game.bank.get()

            board.cards.remove(card)
            player_deck.cards.add(card)

            # TODO: extend player model to include a reserved deck
            # TODO: ensure gems are spent when purchasing card
            # add one gold gem to player
            player_bank_list = toArray(player_bank.gems)
            player_bank_list[-1] += 1
            bank_str = toString(player_bank_list)
            player_bank.gems = bank_str
            player_bank.save()

            # remove one gold gem from bank
            game_bank_list = toArray(game_bank.gems)
            game_bank_list[5] -= 1
            bank_str = toString(game_bank_list)
            game_bank.gems = bank_str
            game_bank.save()

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
