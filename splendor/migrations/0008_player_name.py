# Generated by Django 4.1.2 on 2022-10-11 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("splendor", "0007_game_game_name_alter_card_color"),
    ]

    operations = [
        migrations.AddField(
            model_name="player",
            name="name",
            field=models.CharField(default="Anonymous", max_length=64),
        ),
    ]