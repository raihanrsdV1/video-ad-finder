from rest_framework import serializers
from .models import VideoComparison

class VideoComparisonSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoComparison
        fields = '__all__'