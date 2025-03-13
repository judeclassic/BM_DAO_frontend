import { IModeratorAccount, IModeratorSocials } from "@/lib/types/moderator/moderator.interface";
import { axiosInstance, handleError, handleRequest } from "../axios"
import IResponse from "@/lib/types/response";

export const subscribeForModeratorAccount = (request: IModeratorSocials): Promise<IResponse<IModeratorAccount>> => {
    return axiosInstance().post("/user/personal/account/moderator/subscribe", request)
        .then(handleRequest<IModeratorAccount>).catch(handleError);
}

export const unsubscribeForModeratorAccount = (): Promise<IResponse<IModeratorAccount>> => {
    return axiosInstance().post("/user//personal/account/moderator/unsubscribe")
        .then(handleRequest<IModeratorAccount>).catch(handleError);
}

export const getModeratorAccount = () => {
    return axiosInstance().get("/user/personal/account/moderator/")
        .then(handleRequest<IModeratorAccount>).catch(handleError);
}

export const updateUserSocials = (request: IModeratorSocials): Promise<IResponse<IModeratorAccount>> => {
    return axiosInstance().put(`/user/personal/profile/socials`, request)
        .then(handleRequest<IModeratorAccount>).catch(handleError);
}