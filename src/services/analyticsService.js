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
export const getAllTransactionsCount = async (id, startDate, endDate) => {
  const token = sessionStorage.getItem("token");

  // Build query params dynamically
  const params = new URLSearchParams();

  if (id) params.append("merchantId", id);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const url = `${API}/get-transactions${params.toString() ? "?" + params.toString() : ""}`;

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};



