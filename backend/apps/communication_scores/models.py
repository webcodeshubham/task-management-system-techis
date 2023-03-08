from django.db import models
from apps.communications.models import Communication
from apps.communication_fields.models import CommunicationField
from django.db.models.deletion import CASCADE
# Create your models here.
class CommunicationScore(models.Model):
    class Meta(object):
        db_table = 'CommunicationScore'

    communication = models.ForeignKey(
        Communication, on_delete=CASCADE, db_index=True, related_name='related_communication'
    ) 
    communication_field = models.ForeignKey(
        CommunicationField,on_delete=CASCADE, db_index=True, related_name='related_communication_field'
    )
    score = models.DecimalField(
        'Score', blank=True, null=True, max_digits=2, decimal_places=1 , default=0, 
    )
    comment = models.CharField(
        'Comment', blank=True, null=True, max_length=255
    )
