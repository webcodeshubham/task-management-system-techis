# Generated by Django 3.2.4 on 2022-12-22 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leaves', '0003_rename_employee_ids_leave_employee_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leave',
            name='applied_to',
            field=models.CharField(default='saravana_kumar', max_length=500, verbose_name='Applied To'),
        ),
        migrations.AlterField(
            model_name='leave',
            name='leave_type',
            field=models.CharField(default='N/A', max_length=50, verbose_name='Leave Type'),
        ),
    ]
