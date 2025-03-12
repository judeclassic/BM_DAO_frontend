import { axiosInstance } from "./axios"

export const getUserTransactionHistory = (limit: number, page: number) => {
    return axiosInstance().get(`/user/personal/wallet/all?limit=${limit}&page=${page}`);
}