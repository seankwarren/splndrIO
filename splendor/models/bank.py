# pylint:disable=C0114,C0103
import uuid

from django.core.validators import int_list_validator
from django.db import models

from .game import Game
from .player import Player


class Bank(models.Model):
    """Represents a collection of gems belonging to a player or the game"""
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False
                          )
    gems = models.CharField(max_length=64,
                            validators=[int_list_validator]
                            )

    player = models.ForeignKey(Player,
                               on_delete=models.CASCADE,
                               null=True,
                               blank=True,
                               related_name='bank'
                               )
    game = models.ForeignKey(Game,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True,
                             related_name='bank'
                             )

    def __str__(self):
        return str(self.gems)
