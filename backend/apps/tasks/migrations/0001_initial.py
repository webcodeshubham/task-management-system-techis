# Generated by Django 3.2.4 on 2022-05-26 07:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('assigned', 'assigned'), ('onprogress', 'onprogress'), ('completed', 'completed'), ('delayed', 'Delayed'), ('deleted', 'Deleted')], db_index=True, default='active', max_length=50, verbose_name='Status')),
                ('name', models.CharField(db_index=True, max_length=50, verbose_name='Taskname')),
                ('type', models.CharField(choices=[('student_support', 'Student Support'), ('meeting', 'Internal Team Meeting'), ('studying', 'Studying'), ('project', 'Project(Client Project, Internal Project)'), ('internal_task', 'Internal task'), ('internal_project', 'Internal Project')], max_length=50, verbose_name='Type')),
                ('duration', models.IntegerField(blank=True, null=True, verbose_name='Duration in minutes')),
                ('start_date', models.DateTimeField(blank=True, null=True, verbose_name='Start Date')),
                ('due_date', models.DateTimeField(blank=True, null=True, verbose_name='Due Date')),
                ('note', models.CharField(blank=True, db_index=True, max_length=500, null=True, verbose_name='Note')),
                ('student_support_type', models.CharField(choices=[('hackerrank', 'Hackerrank'), ('ec', 'EC'), ('cohort', 'Cohort'), ('pair_programming', 'Pair Programming'), ('doubt', 'Doubt'), ('quiz', 'Quiz'), ('group_development', 'Group Development'), ('self_development', 'Self Development'), ('brainstroming', 'Brainstroming'), ('beniten_team', 'Beniten Team'), ('training', 'Training'), ('assignment_check', 'Assignment Check'), ('review', 'Team Review'), ('meeting', 'Meeting'), ('project', 'Project Support'), ('job_support', 'Job Support'), ('internal_task', 'Internal Task'), ('internal_project', 'Internal Project')], max_length=200, verbose_name='Student Support type')),
                ('session_topic', models.CharField(max_length=200, null=True, verbose_name='Session Topic')),
                ('session_feedback', models.CharField(choices=[('yes', 'Yes'), ('no', 'No')], max_length=200, null=True, verbose_name='Session Feedback')),
                ('session_student_name', models.CharField(db_index=True, max_length=100, null=True, verbose_name='Session student name')),
                ('session_video_link', models.CharField(blank=True, max_length=200, null=True, verbose_name='Session video link')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created Datetime')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated Datetime')),
                ('user_id_assigned', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id_assigned', to='users.user')),
                ('user_id_assigned_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id_assigned_by', to='users.user')),
            ],
            options={
                'db_table': 'task',
            },
        ),
    ]
