# Generated by Django 2.1.4 on 2018-12-09 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_auto_20181207_1323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='steamuser',
            name='squad',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='squads.Squad'),
        ),
    ]
