import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProfile, updateProfile } from "../services/api";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    course: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          studentId: data.studentId || "",
          course: data.course || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const updatedData = await updateProfile(token, formData);
      setProfile(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-600">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Your Profile</h2>

        {profile ? (
          <div className="space-y-4">
            {editMode ? (
              <>
                {/* Name Input */}
                <div>
                  <label className="block text-white text-sm font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 text-gray-800 bg-white bg-opacity-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-white text-sm font-medium">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 text-gray-800 bg-white bg-opacity-80 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 font-semibold text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Display Profile Details */}
                <p className="text-white"><strong>Name:</strong> {profile.name}</p>
                <p className="text-white"><strong>Email:</strong> {profile.email}</p>

                <div className="text-center mt-6">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-white text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;