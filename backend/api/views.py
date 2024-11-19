import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from .models import VideoComparison
from .serializers import VideoComparisonSerializer
from .utils.videomatch import find_audio_match  # Import the video comparison logic

class VideoComparisonView(APIView):
    def get(self, request):
        """
        GET request to retrieve all video comparison data.
        """
        comparisons = VideoComparison.objects.all().order_by('-created_at')
        serializer = VideoComparisonSerializer(comparisons, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        POST request to create a new video comparison with uploaded video files.
        The function extracts audio, compares, and stores the results.
        """
        # Ensure both video files are included in the request
        if 'video1' not in request.FILES or 'video2' not in request.FILES:
            return Response({"error": "Both video files must be provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Save uploaded files
        video1 = request.FILES['video1']
        video2 = request.FILES['video2']

        # Create a temporary file storage for the videos
        fs = FileSystemStorage()
        video1_name = video1.name
        video2_name = video2.name
        video1_path = fs.save(f"videos/{video1_name}", video1)
        video2_path = fs.save(f"videos/{video2_name}", video2)

        # Create a new VideoComparison entry in the database
        video_comparison = VideoComparison.objects.create(
            video1_name=video1_name,
            video2_name=video2_name,
            video1_path=video1_path,
            video2_path=video2_path
        )

        try:
            # Run the comparison logic using videomatch.py
            offset, score, match_found = find_audio_match(video1_path, video2_path)

            # Save the results to the VideoComparison model
            video_comparison.audio_offset = offset
            video_comparison.standard_score = score
            video_comparison.match_found = match_found
            video_comparison.save()

            # Return the updated comparison data
            return Response(VideoComparisonSerializer(video_comparison).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
