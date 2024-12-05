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
        #dont use serializer
        response_data = []
        for comparison in comparisons:
            response_data.append({
                "id": comparison.id,
                "video1_name": comparison.video1_name,
                "video2_name": comparison.video2_name,
                "offset": comparison.audio_offset,
                "score": comparison.standard_score,
                "match": comparison.match_found,
                "video1_download": comparison.video1.url,
                "video2_download": comparison.video2.url
            })
        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Handle video comparison uploads and logic.
        """
        serializer = VideoComparisonSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Save video data
        video_comparison = serializer.save()

        try:
            # Run the comparison logic
            offset, score, match_found = find_audio_match(
                video_comparison.video1.path, 
                video_comparison.video2.path
            )

            # Update and save results
            video_comparison.audio_offset = offset
            video_comparison.standard_score = score
            video_comparison.match_found = match_found
            video_comparison.save()

            # Include results in the response
            response_data = {
                "video1_name": video_comparison.video1_name,
                "video2_name": video_comparison.video2_name,
                "offset": offset,
                "score": score,
                "match": match_found,
                "audio1_download": video_comparison.video1.url,
                "audio2_download": video_comparison.video2.url
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Delete the database entry if comparison fails
            video_comparison.delete()
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
