import { useState, useContext } from "react";
import { addApplication } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddApplication = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddApplication = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addApplication(token, { title, description });
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to add application. Please try again.");
      console.error("Application submission error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-blue-600">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Add New Application
        </h2>

        {error && <p className="text-red-300 text-center mb-4">{error}</p>}

        <form onSubmit={handleAddApplication} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium">
              Application Title
            </label>
            <input
              type="text"
              placeholder="Enter application title"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-white bg-opacity-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium">
              Description
            </label>
            <textarea
              placeholder="Enter application description"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-white bg-opacity-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddApplication;