import axios from "axios";

const API_URL = "https://student-dashboard-backend-ryuy.onrender.com/students";

// Login
export const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

// Register
export const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  return res.data;
};

// Get Profile
export const getProfile = async (token) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Edit Profile
export const updateProfile = async (token, profileData) => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Update profile error:", error);
    throw error;
  }
};


// Get Applications
export const getStudentApplications = async (token) => {
  const res = await axios.get(`${API_URL}/applications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add Application
export const addApplication = async (token, applicationData) => {
  await axios.post(`${API_URL}/applications`, applicationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
