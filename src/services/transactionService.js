import axios from "axios";
const API = "http://localhost:8000/api/webhook-data/transactions";




// Login
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials, {
    withCredentials: true,
  });
  return res.data;
};



// Get All Transactions
export const getallTransactions = async () => {
    const token = sessionStorage.getItem("token")

  const res = await axios.get(`${API}`, {
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
