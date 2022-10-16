# pylint:disable=C0114,C0103
import json
import uuid

from django.db import models

from .card import Card
from .game import Game
from .player import Player
from .util import BASE_CARDS, CARD_COLORS


class Deck(models.Model):
    """Represents a collection of cards, belonging to the game, or a player"""
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False
                          )
    level = models.IntegerField(blank=True,
                                null=True
                                )
    cards = models.ManyToManyField(Card,
                                   blank=True,
                                   )

    game = models.ForeignKey(Game,
                             null=True,
                             blank=True,
                             on_delete=models.CASCADE,
                             related_name='decks')  # game the deck belongs to
    player = models.ForeignKey(Player,
                               null=True,
                               blank=True,
                               on_delete=models.CASCADE,
                               related_name='deck')  # player the deck belongs to

    def __str__(self):
        return f'lvl: {str(self.level)}'

    def draw_card(self):
        """Removes and returns one card from the deck"""
        cards = self.cards
        card = cards.order_by('?').first()  # pylint: disable=E1101
        self.cards.remove(card)  # pylint: disable=E1101
        self.save()
        return card

    def create_starting_deck(self, level):
        """Initializes the DB with the immutable 90 cards"""
        cards = Card.objects.filter(level=level)  # pylint: disable=E1101

        if not cards:  # create new cards on DB
            with open(BASE_CARDS, "r", encoding="utf8") as file:
                card_data = json.load(file)
                # convert json into list of dictionaries (per attribute)
                card_data = [card_data[f'{i+1}']
                             for i in range(len(card_data))]
                # cost: white, blue, green, red, black
                for card in card_data:
                    new_card = Card.objects.create(  # pylint: disable=E1101
                        level=card['level'],
                        color=CARD_COLORS[card['color']],
                        points=card['points'],
                        cost=card['cost'],
                    )
                    self.cards.add(new_card)  # pylint: disable=E1101
                return self.cards
        else:  # add cards from DB to deck based on level
            cards = Card.objects.filter(level=level)  # pylint: disable=E1101
            self.cards.add(*cards)  # pylint: disable=E1101
            return self.cards
