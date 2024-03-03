import { axiosInstance } from "./axios";

export const getAllModeratorTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/other?limit=${limit}&page=${page}`);
}
export const getAllModeratorOngoingTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/me/other?limit=${limit}&page=${page}`);
}
export const getAllModeratorCompletedTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/me/other?limit=${limit}&page=${page}&status=Completed`);
}
export const getAllChatTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/other?limit=${limit}&page=${page}`);
}
export const getAllChatOngoingTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/me/other?limit=${limit}&page=${page}`);
}
export const getAllChatCompletedTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/me/other?limit=${limit}&page=${page}&status=Completed`);
}
export const moderateTask = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/raider/moderate_task", body);
}
export const markTaskCompleted = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/raider/me/approve", body);
}
export const getAllTaskRaid = (taskId: string) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/raids/${taskId}`)
}
export const getModeratorSingleTask = (taskId: string) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/task/${taskId}`);
}
export const acceptRaidTask = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/raider/raid/approve", body);
}
export const rejectRaidTask = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/raider/raid/reject", body);
}
