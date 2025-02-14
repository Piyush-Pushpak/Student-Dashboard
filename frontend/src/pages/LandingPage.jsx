import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Welcome to University Insight
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center">
        Your can manage your applications efficiently here.
      </p>
      <div className="flex space-x-6">
        <Link to="/login">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;