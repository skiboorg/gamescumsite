# Generated by Django 2.1.4 on 2018-12-23 17:24

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0039_auto_20181223_2019'),
    ]

    operations = [
        migrations.AlterField(
            model_name='privatemessages',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 23, 17, 24, 36, 617421, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='steamuser',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 23, 17, 24, 36, 616423, tzinfo=utc), verbose_name='date joined'),
        ),
        migrations.AlterField(
            model_name='steamuser',
            name='last_vizit',
            field=models.DateField(default=datetime.datetime(2018, 12, 23, 20, 24, 36, 616423)),
        ),
        migrations.AlterField(
            model_name='steamuser',
            name='last_zp',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 24, 17, 24, 36, 579522, tzinfo=utc)),
        ),
    ]
