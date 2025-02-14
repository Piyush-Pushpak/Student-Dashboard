import { useState, useContext } from "react";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token, user } = await login({ email, password });
      authLogin(token, user);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Welcome Back!
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-300 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-white bg-opacity-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-white bg-opacity-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-white text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-200 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;