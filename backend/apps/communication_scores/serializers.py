from apps.communication_fields.serializers import CommunicationFieldListSerializer
from .models import CommunicationScore
from rest_framework import serializers


class CommunicationScoreSerializer(serializers.ModelSerializer):
    communication_field = CommunicationFieldListSerializer()

    class Meta:
        model = CommunicationScore
        fields = '__all__'

    def max_min_validator(self, value):
        if value['score'] > 5.0:
            raise serializers.ValidationError('Rating cannot be more than 5.')
        elif value['score'] < 0:
            raise serializers.ValidationError(
                'Rating cannot be 0 or less than 0.')
        else:
            return value


class CommunicationScoreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunicationScore
        fields = '__all__'
        depth = 1
