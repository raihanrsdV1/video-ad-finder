import React, { useState } from "react";

function UploadForm() {
  const [comparisonResult, setComparisonResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video1", e.target.video1.files[0]);
    formData.append("video2", e.target.video2.files[0]);

    const response = await fetch("http://localhost:8000/api/compare", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setComparisonResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Video Comparison</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Video 1:</label>
            <input
              type="file"
              name="video1"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Video 2:</label>
            <input
              type="file"
              name="video2"
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Compare
          </button>
        </form>
        {comparisonResult && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Comparison Result:</h3>
            <p className="text-gray-700">Offset: {comparisonResult.offset} seconds</p>
            <p className="text-gray-700">Standard Score: {comparisonResult.score}</p>
            <p className="text-gray-700">
              Match Found: {comparisonResult.match ? "Yes" : "No"}
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={comparisonResult.audio1_download}
                className="block text-blue-500 hover:underline"
              >
                Download Matched Audio (Video 1)
              </a>
              <a
                href={comparisonResult.audio2_download}
                className="block text-blue-500 hover:underline"
              >
                Download Matched Audio (Video 2)
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadForm;
