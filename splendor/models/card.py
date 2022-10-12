# pylint:disable=C0114,C0103
import uuid

from django.core.validators import int_list_validator
from django.db import models


class Card(models.Model):
    """Represents a resource card"""
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4
                          )
    # red, blue, green, black, white, gold
    cost = models.CharField(max_length=64,
                            validators=[int_list_validator]
                            )
    color = models.IntegerField()
    points = models.IntegerField()
    level = models.IntegerField()
    isReserved = models.BooleanField(default=False)

    def __str__(self):
        return f'lvl: {str(self.level)} color: {self.color} cost: {self.cost}'
