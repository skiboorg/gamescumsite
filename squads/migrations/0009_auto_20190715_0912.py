# Generated by Django 2.1.4 on 2019-07-15 09:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('squads', '0008_auto_20190714_2143'),
    ]

    operations = [
        migrations.AddField(
            model_name='squad',
            name='server',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='squad',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2019, 7, 15, 9, 12, 3, 674049)),
        ),
        migrations.AlterField(
            model_name='squadrequests',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2019, 7, 15, 9, 12, 3, 674049)),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='last_pay',
            field=models.DateTimeField(default=datetime.datetime(2019, 7, 15, 9, 12, 3, 674049)),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='own',
            field=models.DateTimeField(default=datetime.datetime(2019, 7, 15, 9, 12, 3, 674049)),
        ),
    ]