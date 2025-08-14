import axios from "axios";
const API = `${process.env.NEXT_PUBLIC_URL}/api/excel-sheet`;
// const API = "http://localhost:8000/api/excel-sheet";




// Uplaod File
export const upLoadFile = async (file) => {
    const token = sessionStorage.getItem("token")
  const formData = new FormData();
  formData.append('file', file); // Key must be 'file'

  const res = await axios.post(API, formData, {
    withCredentials: true,
    headers: {
              Authorization: `Bearer ${token}`, // Ensure proper boundary

      'Content-Type': 'multipart/form-data',
    }
  });
  return res.data;
};



// Get All Excels
export const getallExcels = async (
  page = 1,
  limit = 10,
  status = "",
  search = "",
  startDate = "",
  endDate = ""
) => {
  const token = sessionStorage.getItem("token");

  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);

  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);
  if (status && status.toLowerCase() !== "all") params.append("status", status);
  if (search) params.append("search", search);

  const url = `${API}?${params.toString()}`;
  console.log("Requesting:", url);

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

