import subprocess
import os
from audio_offset_finder.audio_offset_finder import find_offset_between_files

def extract_audio_ffmpeg(video_path, output_audio_path):
    """Extracts audio from a video file using ffmpeg."""
    command = [
        "ffmpeg", "-i", video_path,
        "-q:a", "0", "-map", "a", "-y",  # "-y" overwrites existing files
        output_audio_path
    ]
    subprocess.run(command, check=True)

def find_audio_match(video1_path, video2_path):
    """
    Compare two videos by extracting their audio and calculating audio offset.
    Returns offset, standard score, and whether the match is found.
    """
    # Paths for temporary audio files
    audio1_path = "temp_audio1.wav"
    audio2_path = "temp_audio2.wav"

    # Extract audio from both video files
    extract_audio_ffmpeg(video1_path, audio1_path)
    extract_audio_ffmpeg(video2_path, audio2_path)

    # Use find_offset_between_files to check for audio offset
    results = find_offset_between_files(audio1_path, audio2_path, trim=30)

    # Clean up temporary audio files
    os.remove(audio1_path)
    os.remove(audio2_path)

    if results and "time_offset" in results:
        offset = results['time_offset']
        score = results['standard_score']
        match_found = results.get('match_found', False)
        return offset, score, match_found
    else:
        return None, None, False
