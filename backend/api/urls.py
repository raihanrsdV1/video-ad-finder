from django.urls import path
from .views import VideoComparisonView





urlpatterns = [
    path('compare/', VideoComparisonView.as_view(), name='video-compare'),
]