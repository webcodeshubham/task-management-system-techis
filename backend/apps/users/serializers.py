from .models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password, check_password
from secrets import token_hex
import datetime
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'

class UserInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'name',
            'employee_id'
        ]

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'email', 'status', 'role', 'team','batch','shifts','employee_id')
        depth = 1


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_null=True, allow_blank=True)
    class Meta:
        model = User
        fields = ('status', 'name', 'email', 'role', 'team', 'password', 'batch', 'shifts','employee_id')

    def update(self, instance, validated_data):
        team = validated_data['team']
        password = validated_data.pop('password')
        if (password):
            validated_data['password'] = make_password(password)
            validated_data['token'] = token_hex(30)
            validated_data['token_expires_at'] = timezone.now() + datetime.timedelta(days=7)

        if team != 'engineer':
            validated_data['batch'] = 'n/a'
            validated_data['shifts'] = 'n/a'

        return super(UserUpdateSerializer, self).update(instance, validated_data)

    

class AddUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)
    token_expires_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ('status', 'name', 'email', 'password',
                  'token', 'token_expires_at', 'role', 'team','batch','shifts', 'employee_id')

    # Override the create method
    def create(self, validated_data):
        # Encrypt the password
        validated_data['password'] = make_password(validated_data['password'])

        # Create a token
        validated_data['token'] = token_hex(30)
        validated_data['token_expires_at'] = timezone.now() + datetime.timedelta(days=7)

        return super().create(validated_data)


class UserSignInSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(read_only=True)
    token_expires_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ('name', 'email', 'password',
                  'token', 'token_expires_at','batch','shifts','employee_id')

    # Override the create method
    def create(self, validated_data):
        user = User.objects.filter(email=validated_data['email'])

        # Check the password
        if len(user) > 0 and check_password(validated_data['password'], user[0].password):
            # Token
            user[0].token = token_hex(30)
            # Token expires after 7 days
            user[0].token_expires_at = timezone.now() + datetime.timedelta(days=7)
            user[0].save()

            # Return user information
            return user[0]
        else:
            # Raise error
            raise serializers.ValidationError(
                {"error": "The password or email is incorrect."})


class UserOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','name')