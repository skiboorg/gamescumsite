# Generated by Django 2.1.4 on 2018-12-05 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20181205_1946'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steamuser',
            name='discord_id',
            field=models.CharField(blank=True, default='testtest#0000', max_length=50, unique=True),
        ),
    ]
