# Generated by Django 2.1.4 on 2019-07-18 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SiteStat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('all_players', models.IntegerField(default=0)),
                ('all_squads', models.IntegerField(default=0)),
                ('all_kills', models.IntegerField(default=0)),
                ('all_deaths', models.IntegerField(default=0)),
                ('all_buys_summ', models.IntegerField(default=0)),
                ('all_players_money', models.IntegerField(default=0)),
                ('option1', models.IntegerField(default=0, verbose_name='Количество марионеток')),
                ('option2', models.IntegerField(default=0, verbose_name='Количество роботов')),
                ('option3', models.IntegerField(default=0, verbose_name='Количество транспорта')),
                ('option4', models.IntegerField(default=0, verbose_name='Количество айрдропов')),
                ('option5', models.IntegerField(default=0, verbose_name='Усиление марионеток')),
                ('option6', models.IntegerField(default=0, verbose_name='Усилиние роботов')),
                ('option7', models.IntegerField(default=0, verbose_name='Усилиние самодельного оружия')),
                ('option8', models.IntegerField(default=0, verbose_name='Усиление огнестрельного оружия')),
            ],
            options={
                'verbose_name': 'Статистика сайта',
                'verbose_name_plural': 'Статистика сайта',
            },
        ),
    ]
