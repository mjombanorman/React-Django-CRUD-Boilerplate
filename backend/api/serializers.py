from rest_framework import serializers
from .models import Project




class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'start_date','end_date','comments','status') #description', 'created_at', 'updated_at', 'is_active', 'is_deleted', 'created_by', 'updated_by')
