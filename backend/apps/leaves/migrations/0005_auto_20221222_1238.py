# Generated by Django 3.2.4 on 2022-12-22 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leaves', '0004_auto_20221222_1232'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leave',
            name='applied_to',
            field=models.CharField(choices=[('saravana_kumar', 'Saravana Kumar'), ('rajeshwari', 'Rajeshwari'), ('viswanath', 'Viswanath'), ('shiva_ganesh', 'Shiva Ganesh'), ('anshu_kumar', 'Anshu Kumar'), ('aishwarya', 'Aishwarya Shetty'), ('sajid', 'Sajid Khurshid'), ('prasanna', 'Prasanna Akash'), ('jithin', 'Jithin Peter'), ('nitesh', 'Nitesh Tiwari')], default='saravana_kumar', max_length=500, verbose_name='Applied To'),
        ),
        migrations.AlterField(
            model_name='leave',
            name='leave_type',
            field=models.CharField(choices=[('n/a', 'N/A'), ('casual_leave', 'Casual Leave'), ('sick_leave', 'Sick Leave'), ('maternity_leave', 'Maternity Leave'), ('paternity_leave', 'Paternity Leave'), ('loss_of_pay_leave', 'Loss of Pay Leave'), ('emergency', 'Emergency Leave')], default='N/A', max_length=50, verbose_name='Leave Type'),
        ),
    ]
