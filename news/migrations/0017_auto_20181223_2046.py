# Generated by Django 2.1.4 on 2018-12-23 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0016_auto_20181223_2039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
