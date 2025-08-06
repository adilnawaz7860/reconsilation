import axios from "axios";
const API = "http://lww0004ko0kcck8oc44k44wo.31.97.227.219.sslip.io/api/excel-sheet";




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
export const getallExcels = async (page=1 , limit=10 , status="", filter="") => {
    const token = sessionStorage.getItem("token")

  const res = await axios.get(`${API}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

