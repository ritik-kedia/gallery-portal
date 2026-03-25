import React, { useState, useEffect } from "react";
import axios from "axios";

function Upload({ token }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [category, setCategory] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/files`);
        setFiles(res.data);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file || !category) {
            alert("Please select file and category");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", category);

        try {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_API_URL}/api/files`, formData,
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            alert("Uploaded Successfully");

            setFile(null);
            setPreview(null);
            setCategory("");

            fetchFiles();
        } catch (err) {
            alert("Upload Failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this file?");
         if (!confirmDelete) return;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/files/${id}`,
            {
                headers: {
                    Authorization: token
                }
            }
        );
        fetchFiles();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Upload Medical File
                </h2>

                <input
                    type="file"
                    className="mb-3"
                    onChange={handleFileChange}
                />

                {/* Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="preview"
                        className="w-full h-40 object-cover rounded mb-3"
                    />
                )}

                <input
                    type="text"
                    placeholder="Enter Category"
                    className="border p-2 w-full mb-3 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${loading
                        ? "bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </div>

            {/* File List */}
            <div className="mt-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-3">Uploaded Files</h3>

                {files.map((f) => (
                    <div
                        key={f._id}
                        className="bg-white p-3 mb-3 rounded shadow flex justify-between items-center"
                    >
                        <span className="font-medium">{f.category}</span>

                        <button
                            onClick={() => handleDelete(f._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Upload;