# Generated by Django 2.1.4 on 2018-12-20 05:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0031_auto_20181219_0829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steamuser',
            name='last_vizit',
            field=models.DateField(default=datetime.date(2018, 12, 20)),
        ),
    ]