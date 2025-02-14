import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getStudentApplications } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const data = await getStudentApplications(token);
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchApplications();

    return () => setLoading(false);
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 text-white p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-6">Your Applications</h2>

      {loading ? (
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-lg font-semibold">No applications found.</p>
      ) : (
        applications.map((app, index) => (
          <div
            key={app.id || app._id || index}
            className="bg-white p-4 rounded-lg shadow-lg border mb-4 w-10/12 md:w-8/12 lg:w-6/12"
          >
            <h3 className="text-lg font-semibold text-gray-700">{app.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{app.description || "No description provided."}</p>

            <span className="mt-2 px-3 py-1 text-sm font-medium rounded-full bg-yellow-200 text-yellow-800 inline-block">
              {app.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;