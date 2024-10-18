import axios from "axios"

export const axiosInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("bmdao-token");
    return axios.create({
        baseURL: 'https://api.bmdao.xyz/api',
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
  };
