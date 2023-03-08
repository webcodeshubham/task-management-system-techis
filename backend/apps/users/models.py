from django.db import models
from config.constants import USER_STATUS, USER_ROLE, USER_TEAM, USER_BATCH, USER_SHIFT
# Create your models here.

class User(models.Model):
    class Meta(object):
        db_table = 'user'
    
    employee_id  = models.PositiveIntegerField(
        'Employee ID', blank = False, null = False, db_index=True, default=0
    )

    status = models.CharField(
        'Status', blank=False, null=False, max_length=50, choices=USER_STATUS, default='active',
    )

    name = models.CharField(
        'Username', blank=False, null=False, max_length=50
    )

    password = models.CharField(
        'Password', blank=False, null=False, max_length=255
    )
    
    email = models.EmailField(
        'Email', blank=False, null=False, unique=True, max_length=100
    )

    batch = models.CharField(
        'Batch', blank=False, null=False, default='N/A',choices=USER_BATCH, max_length=50
    )

    shifts = models.CharField(
        'Shifts', blank=False, null=False, default='N/A', choices=USER_SHIFT, max_length=50
    )
    
    token = models.CharField(
        'Token', blank=False, null=False, max_length=500
    )
    
    token_expires_at = models.DateTimeField(
        'Token Expires at', blank=False, null=False, max_length=50
    )
    
    role = models.CharField(
        'Role', blank=False, null=False, choices=USER_ROLE, max_length=50
    )

    team = models.CharField(
        'Team', blank=False, null=False, choices=USER_TEAM, max_length=50
    )

    created_at = models.DateTimeField(
        'Created Datetime', blank=False, auto_now_add=True
    )
    
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=False, auto_now=True
    )


    def __str__(self):
        return self.name
