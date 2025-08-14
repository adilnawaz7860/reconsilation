import axios from "axios";
const API = `${process.env.NEXT_PUBLIC_URL}/api/analytics`;

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

