from django.db import models
from apps.users.models import User
from django.db.models.deletion import CASCADE
from config.constants import LEAVE_STATUS
# Create your models here.


class MemberLeave(models.Model):
    class Meta(object):
        db_table = 'member_leaves'

    user = models.ForeignKey(
        User, on_delete=CASCADE, blank=False, null=False
    )

    status = models.CharField(
        'Leave Status', null=False, blank=False, choices=LEAVE_STATUS, max_length=50,default='applied'
    )

    from_date = models.DateField(
        'Leave From', null=False, blank=False,
    )
    to_date = models.DateField(
        'To Date', null=False, blank=False,
    )
    message = models.CharField(
        'Message', null=True,blank=True, max_length=255
    )
    created_at = models.DateTimeField(
        'Leaves Applied On', null=False, blank=False, auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated At', blank=False, null=False, auto_now=True
    )
    def __str__(self):
        return '%s - %s' % (self.user.name, self.message)