import { IAuth, IForgotPassword, IResetPassword, IUserLogin, IUserRegister, IVerifyEmail } from "../types/auth";
import IResponse from "../types/response";
import { axiosInstance, handleError, handleRequest } from "./axios"

export const registerUser = (body: IUserRegister): Promise<IResponse<IAuth>> => {
    return axiosInstance().post("/user/auth/register", body)
        .then(handleRequest<IAuth>).catch(handleError);
}
export const loginUser = (body: IUserLogin): Promise<IResponse<IAuth>> => {
    return axiosInstance().post("/user/auth/login", body)
        .then(handleRequest<IAuth>).catch(handleError);
}

export const verifyUserEmail = (body: IVerifyEmail): Promise<IResponse<string>> => {
    return axiosInstance().post("/user/auth/email/verification", body)
        .then(handleRequest<string>).catch(handleError);
}

export const forgotPassword = (body: IForgotPassword): Promise<IResponse<string>> => {
    return axiosInstance().post("/user/auth/forgot/password", body)
        .then(handleRequest<string>).catch(handleError);;
}

export const resetPassword = (body: IResetPassword): Promise<IResponse<string>> => {
    return axiosInstance().post("/user/auth/reset/password", body)
        .then(handleRequest<string>).catch(handleError);
}
