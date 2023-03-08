
from django.db import models
from apps.member_leaves.models import MemberLeave
from apps.users.models import User
from django.db.models.deletion import CASCADE
# Create your models here.


class LeaveConversation(models.Model):
    class Meta(object):
        db_table = 'leave_conversations'

    member_leave_id = models.ForeignKey(
        MemberLeave, on_delete=CASCADE, null=False, blank=False, related_name='comments'
    )

    user_id = models.ForeignKey(
        User, on_delete=CASCADE, blank=False, null=False
    )

    message_body = models.TextField(
        'Text Message', default='Add your Comment', blank=False, null=False
    )

    created_at = models.DateTimeField(
        'created at', auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated At',  auto_now=True
    )

    def __str__(self):
        return '%s - %s' % (self.user_id.name, self.message_body)
