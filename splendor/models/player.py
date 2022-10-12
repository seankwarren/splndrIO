# pylint:disable=C0114,C0103
import uuid
from django.db import models

from django.contrib.auth.models import User
from .game import Game


class Player(models.Model):
    '''Represents a player and all instances belonging to them'''
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)
    user = models.OneToOneField(User,
                                on_delete=models.PROTECT,
                                null=True,
                                blank=True
                                )

    name = models.CharField(max_length=64,
                            default="Anonymous"
                            )
    game = models.ForeignKey(Game,
                             on_delete=models.CASCADE,
                             null=True,
                             blank=True,
                             related_name='players'
                             )

    def __str__(self):
        if self.user:
            return self.user.username  # pylint: disable=E1101
        return "Anonymous"

    def initialize(self):
        """initializes all values and relates instances for a player"""
        self.bank.create(gems='0,0,0,0,0,0')  # pylint: disable=E1101
        self.deck.create()  # pylint: disable=E1101
        self.save()
