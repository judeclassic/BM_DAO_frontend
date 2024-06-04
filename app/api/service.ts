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


//// chatter ///////

// chatter subscrption service
export const subscriptionToService = (data: any) => {
    return axiosInstance().post("/user/worker/chatter/service/subscribe", data);
}

export const getChatterServices = () => {
    return axiosInstance().get("/user/worker/chatter/service/all?page=1&limit=50");
}

export const updateChatterServiceHandleReq = (data: any) => {
    return axiosInstance().post("/user/worker/chatter/service/updatehandle", data);
}


// chatter task
export const getChatterTask = () => {
    return axiosInstance().get("/user/worker/chatter/task/other?limit=50&page=1");
}

export const getSingleChatterTask = (id: any) => {
    return axiosInstance().get(`/user/worker/chatter/task/single_task/${id}`);
}

export const availbleChatterTask = (limit: number, page: number, status: string) => {
    return axiosInstance().get(`/user/worker/chatter/task/avaibleTask/task?limit=${limit}&page=${page}&status=${status}`);
}


// work

export const startChatTask = (body: any) => {
    return axiosInstance().post("/user/worker/chatter/work/start_raid", body);
}

export const getStatusTask = (status: string) => {
    return axiosInstance().get(`/user/worker/chatter/work/status/task?limit=80&page=1&status=${status}`);
}

export const getSinglechat = (chatId: string, status: string) => {
    return axiosInstance().get(`/user/worker/chatter/work/single/task?chatId=${chatId}&status=${status}`);
}

export const getTotalStatusTask = (status: string) => {
    return axiosInstance().get(`/user/worker/chatter/work/status/total?status=${status}`);
}

export const completeChatTask = (body: any) => {
    return axiosInstance().post("/user/worker/chatter/work/complete_raid", body);
}


