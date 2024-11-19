import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Audio Video Match Webapp
        </h1>
        <nav className="space-y-4">
          <Link
            to="/upload"
            className="block bg-blue-500 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center shadow-md hover:bg-blue-600"
          >
            Video Comparison
          </Link>
          <Link
            to="/youtube-downloader"
            className="block bg-green-500 text-white text-lg font-semibold py-3 px-6 rounded-lg text-center shadow-md hover:bg-green-600"
          >
            YouTube Downloader
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;
