import React, { useEffect, useState } from "react";
import axios from "axios";

function Gallery() {
    const [files, setFiles] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/files`)
            .then(res => { setFiles(res.data) })
            .catch(err => {
                console.error("Error fetching files:", err);
            });
    }, []);

    const filteredFiles = files.filter(f =>
        filter ? f.category === filter : true
    );

    const categories = [...new Set(files.map(f => f.category))];

    return (
        <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Medical Gallery
            </h1>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
                <button
                    onClick={() => setFilter("")}
                    className={`px-4 py-1 rounded-full ${filter === "" ? "bg-black text-white" : "bg-gray-300"
                        }`}
                >
                    All
                </button>

                {categories.map((cat, i) => (
                    <button
                        key={i}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1 rounded-full ${filter === cat
                            ? "bg-blue-600 text-white"
                            : "bg-white shadow"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredFiles.map((file, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                    >
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                            {file.filename.includes(".pdf") ? (
                                <iframe
                                    src={`${process.env.REACT_APP_API_URL}/uploads/${file.filename}`}
                                    className="w-full h-full"
                                    title="pdf"
                                />
                            ) : (
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/${file.filename}`}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            )}
                        </div>

                        <div className="p-3 text-center">
                            <p className="font-semibold text-gray-700">
                                {file.category}
                            </p>

                            <a
                                href={`${process.env.REACT_APP_API_URL}/uploads/${file.filename}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block mt-2 text-blue-500 font-semibold text-sm underline"
                            >
                                View
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFiles.length === 0 && (
                <p className="text-center mt-10 text-gray-500">
                    No files found
                </p>
            )}
        </div>
    );
}

export default Gallery;