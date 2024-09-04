import axios from "axios"
export const baseURL = `http://localhost:8081/api`

export const axiosInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("bmdao-token");
    return axios.create({
        // baseURL: `https://bm-dao-1dps.onrender.com/api`,
        // baseURL: `http://localhost:8081/api`,
        baseURL: baseURL,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
  };
