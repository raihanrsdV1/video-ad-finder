import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import VideoComparison from "./Components/VideoComparison";
import YouTubeDownloader from "./Components/YoutubeDownloader";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<VideoComparison />} />
        <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
