import { IPaginatedRequest } from "@/lib/types/pagination";
import { axiosInstance, handleError, handleRequest } from "../axios";
import { IGetTask, IMultipleRaiderTask, IRaiderTask } from "@/lib/types/raider/task.interface";
import IResponse from "@/lib/types/response";
import { ICompleteRaid, ICreateRaid, IGetRaid, IGetRaids, IMultipleRaid, IRaid } from "@/lib/types/raider/raid.interface";

//User
export const startRaidTask = (body: ICreateRaid): Promise<IResponse<IRaid>> => {
    return axiosInstance().post("/user/services/raider/me", body)
        .then(handleRequest<IRaid>).catch(handleError);
}
export const completeRaidTask = (body: FormData): Promise<IResponse<IRaid>> => {
    return axiosInstance().put("/user/services/raider/me", body)
        .then(handleRequest<IRaid>).catch(handleError);
}
export const getRaiderTasks = (request: IPaginatedRequest): Promise<IResponse<IMultipleRaiderTask>> => {
    return axiosInstance().get(`/user/services/raider?limit=${request.limit}&page=${request.page}`)
        .then(handleRequest<IMultipleRaiderTask>).catch(handleError);
}
export const getRaiderTask = (request: IGetTask): Promise<IResponse<IRaiderTask>> => {
    return axiosInstance().get(`/user/services/raider/${request.task_id}`)
        .then(handleRequest<IRaiderTask>).catch(handleError);
}
export const getRaids = (request: IGetRaids): Promise<IResponse<IMultipleRaid>> => {
    return axiosInstance().get(`/user/services/raider/me/?limit=${request.limit}&page=${request.page}&status=${request.status}`)
        .then(handleRequest<IMultipleRaid>).catch(handleError);
}
export const getRaid = (request: IGetRaid): Promise<IResponse<IRaid>> => {
    return axiosInstance().get(`/user/services/raider/me/${request.raid_id}`)
        .then(handleRequest<IRaid>).catch(handleError);
}