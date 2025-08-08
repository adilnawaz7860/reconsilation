import axios from "axios";
const API = "http://lww0004ko0kcck8oc44k44wo.31.97.227.219.sslip.io/api/analytics";

//const API = "http://localhost:8000/api/analytics";

// Get All Transactions
export const getAllUsersCount = async (page=1 , limit=6 , status="", filter="") => {
    const token = sessionStorage.getItem("token")

  const res = await axios.get(`${API}/get-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};




// Get All Transactions
export const getAllTransactionsCount = async (page=1 , limit=6 , status="", filter="") => {
    const token = sessionStorage.getItem("token")

  const res = await axios.get(`${API}/get-transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

