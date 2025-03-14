import axios from "axios"
import IResponse from "../types/response";
// export const baseURL = `http://localhost:8080/api`
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


export const handleRequest = async <Response>(response: any) : Promise<IResponse<Response>>=> {
    try {
        return response.data;
    } catch (error: any) {
       return handleError(error);
    }
}

export const handleError = (error: any): IResponse<any> => {
    try {
        if (error?.response?.status) {
            const { status, data } = error.response;
            if (status === 404 || status === 500) {
                return { status: false, error: [], message: error.message }
            }
            return { 
                status: false,
                no_token: data.no_token,
                error: data.error,
                message: data.message
            }
        }
        if (error.message) return { status: false, error: [], message: error.message }
        return { status: false, error: [], message: error }
    } catch (err) {
        return { status: false, error: [], message: `${err}` }
    }
}

