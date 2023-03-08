from .models import CommunicationField
from rest_framework import serializers

class CommunicationFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationField
        fields = '__all__'

class CommunicationFieldListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationField
        fields = '__all__'
        depth = 1