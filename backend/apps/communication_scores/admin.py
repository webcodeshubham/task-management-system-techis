from django.contrib import admin
from .models import CommunicationScore
# Register your models here.

@admin.register(CommunicationScore)
class CommunicationScoreModel(admin.ModelAdmin):
    fields = ['communication','communication_field','score','comment']
    filter = ['reviewed_by','user_id_assigned_by']
    list_display = fields
    search_fields = ['reviewed_by']