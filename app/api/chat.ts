import { axiosInstance } from "./axios";

export const createChatTask = (body: any) => {
    return axiosInstance().post("/user/client/chatter/create_task", body);
}

export const getAllChatTask = () => {
    return axiosInstance().get("/user/worker/chatter/task/other?limit=10&page=1");
}

export const getAllChats = () => {
    return axiosInstance().get("/user/worker/chatter/raid?limit=10&page=1");
}

export const startChatTask = (body: any) => {
    return axiosInstance().post("/user/worker/chatter/raid/start_raid", body);
}

export const completeChatTask = (body: any) => {
    return axiosInstance().post("/user/worker/chatter/raid/complete_raid", body);
}

export const getSingleTask = (taskId: string) => {
    return axiosInstance().get(`/user/worker/chatter/task/single_task/${taskId}`);
}

export const getSingleChat = (raidId: string) => {
    return axiosInstance().get(`/user/worker/chatter/raid/${raidId}`);
}

export const getSingleModeratorChat = (raidId: string) => {
    return axiosInstance().get(`/user/worker/moderator/task/chatter/raid/${raidId}`);
}

export const getAllClientTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/client/chatter/getusertasks?limit=${limit}&page=${page}`);
}