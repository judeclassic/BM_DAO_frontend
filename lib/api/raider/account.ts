import { IRaiderAccount, IRaiderSocials } from "@/lib/types/raider/raider.interface";
import { axiosInstance, handleError, handleRequest } from "../axios"
import IResponse from "@/lib/types/response";

export const subscribeForRaiderAccount = (request: IRaiderSocials): Promise<IResponse<IRaiderAccount>> => {
    return axiosInstance().post("/user/personal/account/raider/subscribe", request)
        .then(handleRequest<IRaiderAccount>).catch(handleError);
}

export const unsubscribeForRaiderAccount = (): Promise<IResponse<IRaiderAccount>> => {
    return axiosInstance().post("/user/worker/raider/service/unsubscribe")
        .then(handleRequest<IRaiderAccount>).catch(handleError);
}

export const getRaiderAccount = () => {
    return axiosInstance().get("/user/worker/raider/service/all?page=1&limit=20")
        .then(handleRequest<IRaiderAccount>).catch(handleError);
}

export const updateUserSocials = (request: IRaiderSocials): Promise<IResponse<IRaiderAccount>> => {
    return axiosInstance().put(`/user/personal/profile/socials`, request)
        .then(handleRequest<IRaiderAccount>).catch(handleError);
}