import React, { useState } from "react";

function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [chunkDuration, setChunkDuration] = useState(10);
  const [numChunks, setNumChunks] = useState(1);

  const handleDownload = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, chunkDuration, numChunks }),
    });

    if (response.ok) {
      alert("Download started!");
    } else {
      alert("Error in downloading chunks.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">YouTube Downloader</h1>
        <form onSubmit={handleDownload} className="space-y-4">
          <div>
            <label className="block text-gray-700">YouTube URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Chunk Duration (seconds):</label>
            <input
              type="number"
              value={chunkDuration}
              onChange={(e) => setChunkDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Number of Chunks:</label>
            <input
              type="number"
              value={numChunks}
              onChange={(e) => setNumChunks(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Download Chunks
          </button>
        </form>
      </div>
    </div>
  );
}

export default YouTubeDownloader;
