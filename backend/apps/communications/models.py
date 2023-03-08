from django.db import models
from apps.tasks.models import Task
from apps.users.models import User
from django.db.models.deletion import CASCADE

# Create your models here.

class Communication(models.Model):
    class Meta(object):
        db_table = 'communication'
    task = models.OneToOneField(
        Task, on_delete=CASCADE, related_name='related_task_communication'
    )
    reviewed_by = models.ForeignKey(
        User, related_name='reviewed_by',on_delete=CASCADE,blank=True, null=True, db_index=True,
    )
    date_reviewed = models.DateTimeField(
        'Date of Reviewed', blank=True, null=True, auto_now_add=True
    )
    critical_total = models.IntegerField(
        'Critical Score', blank=True, null=True, 
    )
    general_total = models.IntegerField(
        'General Score', blank=True, null=True, 
    )
    error_total = models.IntegerField(
        'Total Errors', blank=True, null=True,
    )

    def __str__(self):
        return  'task id ( ' + str(self.task.id) + ' ) [ ' + self.task.name + ' ]'
        
    @property
    def communication_scores(self):
        return self.related_communication.order_by('-id').all()
