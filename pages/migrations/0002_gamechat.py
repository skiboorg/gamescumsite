# Generated by Django 2.1.4 on 2019-08-22 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameChat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('oldLog', models.TextField(null=True)),
                ('newLog', models.TextField(null=True)),
            ],
        ),
    ]