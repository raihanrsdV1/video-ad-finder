import React, { useEffect, useState } from "react";
import UploadForm from "./UploadForm";

function VideoComparison() {
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/compare/");
        const data = await response.json();
        setComparisonData(data); // Adjust this based on the actual response structure
        console.log("Comparison data:", data);
      } catch (error) {
        console.error("Error fetching comparison data:", error);
      }
    };

    fetchData();
  }, []);

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
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-indigo-100 border-b">
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                  Video Name
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                  Ad Name
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                  Video 1 (Download)
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                  Video 2 (Download)
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                  Audio Offset (ms)
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                  Standard Score
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.length > 0 ? (
                comparisonData.map((data, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      data.matched
                        ? "bg-green-50"
                        : "bg-red-50"
                    } hover:bg-gray-50 transition duration-200`}
                  >
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {data.video1_name || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {data.video2_name || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-500 hover:underline cursor-pointer">
                      {data.video1_download && (
                        <a
                          href={`http://localhost:8000${data.video1_download}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          Download Video 1
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-500 hover:underline cursor-pointer">
                      {data.video2_download && (
                        <a
                          href={`http://localhost:8000${data.video1_download}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          Download Video 2
                        </a>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {data.offset || "N/A"}
                    </td>
                    <td
                      className={`py-4 px-6 text-sm font-semibold ${
                        parseFloat(data.standard_score) > 85
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.score || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No data available. Upload videos to compare!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VideoComparison;
