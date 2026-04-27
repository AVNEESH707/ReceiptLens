import React, { useState } from "react";
import { uploadFile } from "../api";

const Upload = ({ setResult }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await uploadFile(formData);
      setResult(res.data);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">

      <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition">
        <input type="file" className="hidden" onChange={handleChange} />
        <p className="text-gray-500">
          Click to upload or drag & drop
        </p>
      </label>

      {preview && (
        <div className="mt-4 flex justify-center">
          <img
            src={preview}
            alt="preview"
            className="h-40 object-contain rounded-md border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-4 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
      >
        {loading ? "Processing..." : "Upload Receipt"}
      </button>

    </div>
  );
};

export default Upload;