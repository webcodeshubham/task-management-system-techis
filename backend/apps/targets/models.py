from pyexpat import model
from django.db import models
from django.db.models.deletion import CASCADE
from apps.users.models import User
from config.constants import TARGET_STATUS, TARGET_TYPE

# Create your models here.


class Target(models.Model):
    class Meta(object):
        db_table = 'target'

    user_id = models.ForeignKey(
        User, on_delete=CASCADE,  db_index=True
    )

    status = models.CharField(
        'Status', blank=True, max_length=1000, choices=TARGET_STATUS, default='started',
    )

    type = models.CharField(
        'Type of Target',  blank=False, null=False, db_index=True, max_length=20, choices=TARGET_TYPE, default='progress',
    )

    target_number = models.CharField(
        'Target in Percentage', max_length=3, default='100',
    )

    cohort = models.CharField(
        'Cohort', max_length=10, blank=False, null=False, db_index=True,
    )

    project_start_date = models.DateTimeField(
        'Project Starting Date', blank=False, null=False
    )

    project_due_date = models.DateTimeField(
        'Project Due Date', max_length=20
    )

    project_name = models.CharField(
        'Project Name', blank=False, null=False, max_length=50
    )

    project_github_link = models.CharField(
        'Project GitHub Link', max_length=200
    )

    project_student_name = models.CharField(
        'Projects Students Name', max_length=200
    )

    note = models.TextField(
        'Note', max_length=2000, blank=True, null=True
    )

    updated_by = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="target_updated_by"
    )

    created_by = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="target_created_by"
    )

    created_at = models.DateTimeField(
        'Created Datetime', blank=False, auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated At', blank=True, null=True, auto_now=True
    )
