import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="mb-4 text-sm text-red-300 text-center">{error}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-white bg-opacity-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
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
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-white text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-200 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;