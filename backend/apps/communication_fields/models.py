from django.db import models
from config.constants import COMMUNICATION_TYPE


class CommunicationField(models.Model):
    class Meta(object):
        db_table = 'CommunicationField'

    communication_type = models.CharField(
        'Communication Type', blank=False, null=False, choices=COMMUNICATION_TYPE, max_length=50
    )
    attribute_of_communication = models.CharField(
        'Attribute Of Communication', blank=False, null=False, max_length=255
    )

    def __str__(self):
        return self.get_communication_type_display() + ' [ ' + self.attribute_of_communication  + ' ]'
