# Generated by Django 2.1.4 on 2018-12-23 17:39

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('squads', '0024_auto_20181223_2037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sectorwars',
            name='war_date',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 23, 17, 39, 34, 899222, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='squad',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 23, 17, 39, 34, 898225, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='squadrequests',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 23, 17, 39, 34, 898225, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='last_pay',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 23, 17, 39, 34, 899222, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='own',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 23, 17, 39, 34, 899222, tzinfo=utc)),
        ),
    ]
