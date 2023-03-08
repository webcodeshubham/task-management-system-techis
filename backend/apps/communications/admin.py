
from multiprocessing.pool import ApplyResult
from django.contrib import admin
from .models import Communication


@admin.register(Communication)
class CommunicationModel(admin.ModelAdmin):
    fields = ['task', 'reviewed_by',
              'critical_total', 'general_total', 'error_total']
    filter = ['user_id_assigned_by', 'reviewed_by', 'date_reviewed']
    list_display = fields
    serach_fields = ['user_id_assigned_by', 'reviewed_by']

