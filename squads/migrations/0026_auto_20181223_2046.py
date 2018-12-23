# Generated by Django 2.1.4 on 2018-12-23 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('squads', '0025_auto_20181223_2039'),
    ]

    operations = [
        migrations.AddField(
            model_name='sectorwars',
            name='owner_notify',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='sectorwars',
            name='war_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='squad',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='squadrequests',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='last_pay',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='own',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
