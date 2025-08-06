import axios from "axios";
const API = "http://lww0004ko0kcck8oc44k44wo.31.97.227.219.sslip.io/api/users";




// Login
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials, {
    withCredentials: true,
  });
  return res.data;
};

// Update User Status
export const updateUserStatus = async (id ,) => {
  const res = await axios.post(`${API}/update-status/${id}`, {}, {
    withCredentials: true,
  });
  return res.data;
};

// Update User
export const updateUserById = async (id ,data) => {
  const res = await axios.patch(`${API}/update-user/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

// Register (Admin-only)
export const registerUser = async (data) => {
  const token = sessionStorage.getItem("token")
  console.log(token , "toekn")
  const res = await axios.post(`${API}/register`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Logout
export const logoutUser = async () => {
  const token = sessionStorage.getItem("token");
  
  const res = await axios.post(`${API}/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};

// Refresh Access Token
export const refreshAccessToken = async () => {
  const res = await axios.post(`${API}/refresh-token`, null, {
    withCredentials: true,
  });
  return res.data;
};

// Get Current User
export const getallUsers = async (page=1 , limit=6 , status="", filter="") => {
    const token = sessionStorage.getItem("token")

  const res = await axios.get(`${API}/get-users?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Change Current Password
export const changePassword = async (data, token) => {
  const res = await axios.post(`${API}/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
 

// get User

export const getCurrentUser = async () => {
    const token = sessionStorage.getItem("token")

  const res = await axios.get(`${API}/current-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};