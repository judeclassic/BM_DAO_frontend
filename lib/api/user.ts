import IResponse from "../types/response";
import { IGetReferral, IMultipleUser, IUpdateProfile, IUser } from "../types/user/user.interface";
import { axiosInstance, handleRequest, handleError } from "./axios";


export const getUserProfile = (): Promise<IResponse<IUser>> => {
    return axiosInstance().get("/user/personal/profile")
        .then(handleRequest<IUser>).catch(handleError);
}

export const updateUserProfile = (body: IUpdateProfile): Promise<IResponse<IUser>> => {
    return axiosInstance().post("/user/personal/profile/update", body)
        .then(handleRequest<IUser>).catch(handleError);;
}

export const getUserReferral = (request: IGetReferral): Promise<IResponse<IMultipleUser>> => {
    return axiosInstance()
        .get(`/user/personal/profile/referral?page=${request.page}&limit=${request.limit}&level=${request.level}`)
        .then(handleRequest<IMultipleUser>).catch(handleError);
}