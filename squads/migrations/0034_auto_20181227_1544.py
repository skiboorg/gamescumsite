# Generated by Django 2.1.4 on 2018-12-27 15:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('squads', '0033_auto_20181226_2100'),
    ]

    operations = [
        migrations.AlterField(
            model_name='squad',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 27, 15, 44, 37, 459163)),
        ),
        migrations.AlterField(
            model_name='squadrequests',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 27, 15, 44, 37, 460163)),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='last_pay',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 27, 15, 44, 37, 461162)),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='own',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 27, 15, 44, 37, 461162)),
        ),
    ]
