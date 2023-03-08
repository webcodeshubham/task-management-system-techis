from django.db import models
from django.db.models.deletion import CASCADE
# Create your models here.
from django.db import models

from apps.users.models import User 
from config.constants import LEAVE_TYPE, LEAVE_STATUS, APPLIED_TO

# Create your models here.

class Leave(models.Model):
    class Meta(object):
        db_table = 'leave'

    user_name = models.ForeignKey(
        User, on_delete=CASCADE, blank=False, null=False, related_name='ID'
    )
    employee_id = models.ForeignKey(
        User, on_delete=CASCADE, blank=False, null=True,related_name='TD'
    )

    leave_type = models.CharField(
        'Leave Type', blank=False, null=False, default='N/A', choices=LEAVE_TYPE, max_length=50
    )

    leave_balance = models.IntegerField(
        'Leave Balance', blank=False, null=False, default=0
    )

    from_date = models.DateTimeField(
        'From Date', blank=False, null=False
    )

    to_date = models.DateTimeField(
        'To Date', blank=False, null=False
    )

    duration = models.IntegerField(
        'Duration', blank=False, null=False, default=0
    )

    applied_to = models.CharField(
        'Applied To', blank=False, null=False,default='saravana_kumar', choices=APPLIED_TO, max_length=500
    )

    created_at = models.DateTimeField(
        'Created Datetime', blank=False, auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated Datetime', blank=False, auto_now=True
    )

    description = models.CharField(
        'Notes', blank=False, null=False, db_index=True, max_length=400, default='Description & Responsibilities Assigned'
    )

    leave_status = models.CharField(
        'Leave Status', blank=False, null=False, default='N/A', choices=LEAVE_STATUS, max_length=30
    )
    def __str__(self):
        return self.user_name.name

  

