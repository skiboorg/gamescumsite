# Generated by Django 2.1.4 on 2018-12-13 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('squads', '0007_auto_20181213_1517'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='squadmembers',
            options={'verbose_name': 'Состав отряда', 'verbose_name_plural': 'Состав отряда'},
        ),
        migrations.AlterField(
            model_name='squadsectors',
            name='squad',
            field=models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='squads.Squad'),
        ),
    ]
