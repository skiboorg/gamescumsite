# Generated by Django 2.1.4 on 2018-12-25 20:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0052_merge_20181225_2057'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steamuser',
            name='date_joined',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 25, 20, 57, 52, 855424), verbose_name='date joined'),
        ),
        migrations.AlterField(
            model_name='steamuser',
            name='last_zp',
            field=models.DateTimeField(default=datetime.datetime(2018, 12, 26, 20, 57, 52, 855424)),
        ),
    ]