import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
            alert("Login Successful");
            navigate("/admin");
        } catch {
            alert("Invalid login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">

            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Admin Login
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1 text-sm">Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4 relative">
                    <label className="block text-gray-600 mb-1 text-sm">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-9 cursor-pointer text-gray-500 text-sm"
                    >
                        {/* {showPassword ? "Hide" : "Show"} */}
                    </span>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                >
                    Login as Admin
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                    Secure access to admin panel
                </p>

            </div>
        </div>
    );
}

export default Login;