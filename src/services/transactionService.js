import axios from "axios";
const API = "http://lww0004ko0kcck8oc44k44wo.31.97.227.219.sslip.io/api/transactions";




// Login
export const loginUser = async (credentials) => {
  const res = await axios.post(`${API}/login`, credentials, {
    withCredentials: true,
  });
  return res.data;
};



// Get All Transactions
export const getallTransactions = async (page=1 , limit=6 , status="", filter="") => {
    const token = sessionStorage.getItem("token")

  const res = await axios.get(`${API}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

