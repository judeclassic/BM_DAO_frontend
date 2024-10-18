import axios from "axios"

export const axiosInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("bmdao-token");
    return axios.create({
        baseURL: process.env.BACKEND_HOST,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
  };
