import { axiosInstance } from "./axios"

export const subscribeToServiceRaider = (data: any) => {
    return axiosInstance().post("/user/worker/raider/service/subscribe", data);
}
export const resubscribeToServiceRaider = (data: any) => {
    return axiosInstance().post("/user/worker/raider/service/resubscribe", data);
}
export const getAllRaiderServices = () => {
    return axiosInstance().get("/user/worker/raider/service/all?page=1&limit=20");
}
export const subscribeToServiceModerator = (data: any) => {
    return axiosInstance().post("/user/worker/moderator/service/subscribe", data);
}
export const subscribeToServiceChatter = (data: any) => {
    return axiosInstance().post("/user/worker/moderator/service/resubscribe", data);
}
export const resubscribeToServiceModerator = (data: any) => {
    return axiosInstance().post("/user/worker/moderator/service/resubscribe", data);
}
export const getAllModeratorServices = () => {
    return axiosInstance().get("/user/worker/moderator/service/all?page=1&limit=20");
}
export const getAllChatterServices = () => {
    return axiosInstance().get("/user/worker/moderator/service/all?page=1&limit=20");
}
export const getAllModeratorTaskRaids = (taskId: string) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/raids/${taskId}?page=1&limit=20`);
}
export const unsubscribeToServiceModerator = (data: any) => {
    return axiosInstance().post("/user/worker/moderator/service/unsubscribe", data);
}
export const updateServiceHandleReq = (data: any) => {
    return axiosInstance().post("/user/worker/raider/service/updatehandle", data);
}
