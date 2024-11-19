from django.db import models

class VideoComparison(models.Model):
    video1 = models.FileField(upload_to='videos/')  # Field to store the uploaded video1
    video2 = models.FileField(upload_to='videos/')  # Field to store the uploaded video2
    
    video1_name = models.CharField(max_length=255, blank=True)  # Name of video1
    video2_name = models.CharField(max_length=255, blank=True)  # Name of video2
    
    audio_offset = models.FloatField(null=True, blank=True)  # Offset of the audio
    standard_score = models.FloatField(null=True, blank=True)  # The score for comparison
    match_found = models.BooleanField(default=False)  # Whether a match was found
    
    created_at = models.DateTimeField(auto_now_add=True)  # Time of creation of the comparison

    def __str__(self):
        return f"Comparison between {self.video1_name} and {self.video2_name}"
