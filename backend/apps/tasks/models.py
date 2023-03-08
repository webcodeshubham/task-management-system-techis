from django.db.models.deletion import CASCADE
from django.db import models
from apps.users.models import User
from config.constants import TASK_STATUS, TASK_TYPE, TASK_SUPPORT_TYPE, TASK_FEEDBACK, USER_BATCH, USER_SHIFT

# Create your models here.

class Task(models.Model):
    class Meta(object):
        db_table = 'task'

    user_id_assigned_by = models.ForeignKey(
        User, on_delete=CASCADE, blank=False, null=False, db_index=True, related_name='user_id_assigned_by'
    )

    user_id_assigned = models.ForeignKey(
        User, on_delete=CASCADE, blank=False, null=False, db_index=True, related_name='user_id_assigned'
    )

    status = models.CharField(
        'Status', blank=False, null=False, db_index=True, max_length=50, choices=TASK_STATUS, default='active',
    )

    batches = models.CharField(
        'Batch', blank=False, null=False, default='n/a',choices=USER_BATCH, max_length=50
    )
    
    shifts = models.CharField(
        'Shifts', blank=False, null=False, default='n/a', choices=USER_SHIFT, max_length=50
    )

    name = models.CharField(
        'Taskname', blank=True, null=True, db_index=True, max_length=50
    )

    type = models.CharField(
        'Type', blank=False, null=False, max_length=50, choices=TASK_TYPE
    )

    duration = models.IntegerField(
        'Duration in minutes', blank=True, null=True,
    )

    start_date = models.DateTimeField(
        'Start Date', blank=True, null=True,
    )

    due_date = models.DateTimeField(
        'Due Date', blank=True, null=True
    )

    note = models.CharField(
        'Note',  blank=True, null=True, db_index=True, max_length=500
    )

    student_support_type = models.CharField(
        'Student Support type', blank=False, null=False, choices=TASK_SUPPORT_TYPE, max_length=200
    )

    session_topic = models.CharField(
        'Session Topic', blank=False, null=True, max_length=200
    )

    session_feedback = models.CharField(
        'Session Feedback',  blank=False, null=True, choices=TASK_FEEDBACK, max_length=200
    )

    session_student_name = models.CharField(
        'Session student name',  blank=False, null=True, db_index=True, max_length=100
    )

    session_video_link = models.URLField(
        'Session video link',  blank=True, null=True, max_length=500
    )

    updated_by = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL
    )

    created_at = models.DateTimeField(
        'Created Datetime', blank=False, auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated Datetime', null=True, blank=False, auto_now=True
    )

    def __str__(self):
        return self.name

    @property
    def task_communication(self):
        return self.related_task_communication
