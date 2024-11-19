import React from "react";
import UploadForm from "./UploadForm";

function VideoComparison() {
  // Demo data for previous comparisons
  const demoData = [
    {
      sl: 1,
      date: "2024-11-12",
      video1: "Download Video 1",
      video2: "Download Video 2",
      audioOffset: "2.4",
      standardScore: "89.5",
      matchedAudio: "Download Matched Audio",
    },
    {
      sl: 2,
      date: "2024-11-10",
      video1: "Download Video 1",
      video2: "Download Video 2",
      audioOffset: "1.8",
      standardScore: "92.3",
      matchedAudio: "Download Matched Audio",
    },
    {
      sl: 3,
      date: "2024-11-08",
      video1: "Download Video 1",
      video2: "Download Video 2",
      audioOffset: "3.1",
      standardScore: "85.7",
      matchedAudio: "Download Matched Audio",
    },
    {
      sl: 4,
      date: "2024-11-07",
      video1: "Download Video 1",
      video2: "Download Video 2",
      audioOffset: "0.9",
      standardScore: "95.4",
      matchedAudio: "Download Matched Audio",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Video Comparison
        </h1>
        {/* Upload Form Section */}
        <div className="mb-10">
          <UploadForm />
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  SL
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Video 1
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Video 2
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Audio Offset
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Standard Score
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                  Matched Audio
                </th>
              </tr>
            </thead>
            <tbody>
              {demoData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">{data.sl}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{data.date}</td>
                  <td className="py-3 px-4 text-sm text-blue-500 hover:underline cursor-pointer">
                    {data.video1}
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-500 hover:underline cursor-pointer">
                    {data.video2}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {data.audioOffset}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {data.standardScore}
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-500 hover:underline cursor-pointer">
                    {data.matchedAudio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VideoComparison;
