# Generated by Django 2.1.4 on 2019-02-06 21:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0066_auto_20190201_1322'),
    ]

    operations = [
        migrations.AddField(
            model_name='steamuser',
            name='buys_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='steamuser',
            name='last_buy',
            field=models.DateField(default=datetime.date(2019, 2, 6)),
        ),
        migrations.AlterField(
            model_name='steamuser',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2019, 2, 6, 21, 57, 8, 258481), verbose_name='date joined'),
        ),
        migrations.AlterField(
            model_name='steamuser',
            name='last_vizit',
            field=models.DateField(default=datetime.date(2019, 2, 6)),
        ),
        migrations.AlterField(
            model_name='steamuser',
            name='last_zp',
            field=models.DateTimeField(default=datetime.datetime(2019, 2, 7, 21, 57, 8, 258481)),
        ),
    ]