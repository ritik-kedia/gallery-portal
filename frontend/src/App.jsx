import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Upload from "./Upload";
import Gallery from "./Gallery";
import Login from "./Login";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setToken(t);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>

      <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
        <div className="flex gap-6 font-semibold">
          <Link to="/" className="hover:underline">Gallery</Link>
          {token && (
            <Link to="/admin" className="hover:underline">
              Admin Upload
            </Link>
          )}
        </div>

        <div>
          {!token ? (
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
            >
              Admin Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Gallery />} />

        <Route
          path="/login"
          element={
            token ? <Navigate to="/admin" /> : <Login setToken={setToken} />
          }
        />

        <Route
          path="/admin"
          element={
            token ? <Upload token={token} /> : <Navigate to="/login" />
          }
        />
      </Routes>

    </Router>
  );
}

export default App;