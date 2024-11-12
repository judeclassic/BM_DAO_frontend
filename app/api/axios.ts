import axios from "axios"
// export const baseURL = `http://localhost:8081/api`
export const baseURL = `https://api.bmdao.xyz/api`

export const axiosInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("bmdao-token");
    return axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: !!token ? `Bearer ${token}` : "",
        }
    })
  };
