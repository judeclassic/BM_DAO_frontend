import { axiosInstance } from "./axios";

export const createRaidTask = (body: any) => {
    return axiosInstance().post("/user/client/raider/create_task", body);
}
export const getAllRaidTask = () => {
    return axiosInstance().get("/user/worker/raider/task/other?limit=10&page=1");
}
export const getAllRaids = () => {
    return axiosInstance().get("/user/worker/raider/raid?limit=10&page=1");
}
export const startRaidTask = (body: any) => {
    return axiosInstance().post("/user/worker/raider/raid/start_raid", body);
}
export const completeRaidTask = (body: any) => {
    return axiosInstance().post("/user/worker/raider/raid/complete_raid", body);
}
export const getSingleTask = (taskId: string) => {
    return axiosInstance().get(`/user/worker/raider/task/single_task/${taskId}`);
}
export const getSingleRaid = (raidId: string) => {
    return axiosInstance().get(`/user/worker/raider/raid/${raidId}`);
}
export const getSingleModeratorRaid = (raidId: string) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/raid/${raidId}`);
}
export const getAllClientRaiderTask = (limit: any, page: any) => {
    return axiosInstance().get(`/user/client/raider/getusertasks?limit=${limit}&page=${page}`)
}
