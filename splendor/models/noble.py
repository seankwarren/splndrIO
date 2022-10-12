# pylint:disable=C0114,C0103
import uuid

from django.core.validators import int_list_validator
from django.db import models

# Create your models here.


class Noble(models.Model):
    """Represents a Noble Card"""
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False
                          )
    cost = models.CharField(max_length=64,
                            validators=[int_list_validator]
                            )  # red, blue, green, black, white, gold
    points = models.IntegerField()

    def __str__(self):
        return str(self.cost)
