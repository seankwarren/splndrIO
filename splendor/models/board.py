# pylint:disable=C0114,C0103
import json
import uuid

from django.db import models

from .card import Card
from .game import Game
from .noble import Noble
from .util import BASE_NOBLES


class Board(models.Model):
    """Represents the cards and nobles currently in play"""
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False
                          )
    cards = models.ManyToManyField(Card,
                                   blank=True
                                   )
    nobles = models.ManyToManyField(Noble,
                                    blank=True
                                    )
    game = models.ForeignKey(Game,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True,
                             related_name='board'
                             )

    def draw_noble(self):
        """Selects a noble and adds it to the board"""
        nobles = Noble.objects.all()  # pylint:disable=E1101
        noble = nobles.order_by('?').first()  # draw a card
        self.nobles.add(noble)  # pylint:disable=E1101
        return noble

    def initialize(self):
        """Initializes the board with cards and nobles"""
        decks = self.game.decks.all()  # pylint:disable=E1101
        for deck in decks:
            for i in range(4):
                self.cards.add(deck.draw_card())  # pylint:disable=E1101
            self.save()

        nobles = Noble.objects.all()  # pylint:disable=E1101

        if not nobles:  # create new nobles on DB if needed
            with open(BASE_NOBLES, "r", encoding="utf8") as f:
                nobles_data = json.load(f)
                # convert json into list of dictionaries (per attribute)
                nobles = [nobles_data[f'{i+1}']
                          for i in range(len(nobles_data))]
                # cost: white, blue, green, red, black
                for noble in nobles:
                    # TODO learn how to use **kwargs better this is disgusting
                    Noble.objects.create(  # pylint:disable=E1101
                        points=noble['points'],
                        cost=noble['cost'],
                    )

        for i in range(5):
            self.nobles.add(self.draw_noble())  # pylint:disable=E1101

        return self
