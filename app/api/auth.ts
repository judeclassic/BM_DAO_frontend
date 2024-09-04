import { IForgotPassword, IResetPassword, IUserLogin, IUserRegister, IVerifyEmail } from "../interface/user.interface";
import { axiosInstance } from "./axios"

export const registerUser = (body: IUserRegister) => {
    return axiosInstance().post("/user/auth/register", body);
}
export const loginUser = (body: IUserLogin) => {
    return axiosInstance().post("/user/auth/login", body);
}
export const getUserProfile = () => {
    return axiosInstance().get("/user/personal/profile");
}
export const updateProfile = (body: any) => {
    return axiosInstance().post("/user/personal/profile/update", body);
}
export const getUserProfileRefferal = (level: string) => {
    return axiosInstance().get(`/user/personal/profile/referal/${level}`);
}

export const verifyUserEmail = (body: IVerifyEmail) => {
    return axiosInstance().post("/user/auth/email/verification", body);
}

export const forgotPassword = (body: IForgotPassword) => {
    return axiosInstance().post("/user/auth/forgot/password", body);
}

export const resetPassword = (body: IResetPassword) => {
    return axiosInstance().post("/user/auth/reset/password", body);
}
