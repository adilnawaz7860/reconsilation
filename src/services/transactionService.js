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
export const getallTransactions = async (page = 1, limit = 10, status = "", search = "" ,startDate="" ,endDate="") => {
  const token = sessionStorage.getItem("token");

  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (status && status.toLowerCase() !== "all") params.append("status", status);
  if (search) params.append("search", search);
   if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  const url = `${API}?${params.toString()}`;
  console.log("Requesting:", url);

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


