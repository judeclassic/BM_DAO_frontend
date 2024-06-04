import axios from "axios"

export const axiosInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("bmdao-token");
    return axios.create({
        // baseURL: `https://bm-dao-1dps.onrender.com/api`,
        baseURL: `http://localhost:8081/api`,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
  };
