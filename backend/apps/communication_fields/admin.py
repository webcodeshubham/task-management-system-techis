from django.contrib import admin
from .models import CommunicationField
# Register your models here.

@admin.register(CommunicationField)
class CommunicationFieldModel(admin.ModelAdmin):
    fields = ['communication_type', 'attribute_of_communication']
    filter = ['atrribute_of_communication']
    list_display = fields
    search_fields = ['communication_type']