from rest_framework import serializers
from .models import VideoComparison

class VideoComparisonSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoComparison
        fields = ['video1', 'video2', 'video1_name', 'video2_name']