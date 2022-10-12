# Generated by Django 4.1.1 on 2022-10-03 11:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("splendor", "0003_alter_game_num_players"),
    ]

    operations = [
        migrations.AddField(
            model_name="noble",
            name="game",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="nobles",
                to="splendor.game",
            ),
        ),
        migrations.AddField(
            model_name="noble",
            name="player",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="nobles",
                to="splendor.player",
            ),
        ),
    ]
