import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>

        {/* Toggle Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* For Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <Link to="/add-application" className="hover:text-gray-300">
            Add Application
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* For Mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center space-y-6 text-lg">
          <button
            className="absolute top-4 right-6 text-white text-3xl"
            onClick={() => setIsOpen(false)}
          >
            <FiX />
          </button>

          <Link to="/dashboard" className="text-white" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link to="/profile" className="text-white" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <Link to="/add-application" className="text-white" onClick={() => setIsOpen(false)}>
            Add Application
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;