import { IPaginatedRequest } from "@/lib/types/pagination";
import { axiosInstance, handleError, handleRequest } from "../axios";
import { IGetTask, IMultipleRaiderTask, IRaiderTask } from "@/lib/types/raider/task.interface";
import IResponse from "@/lib/types/response";
import { ICreateRaid } from "@/lib/types/raider/raider.interface";
import { IRaid } from "@/lib/types/raider/raid.interface";

//User
export const startRaidTask = (body: ICreateRaid): Promise<IResponse<IRaid>> => {
    return axiosInstance().post("/user/services/client/raider", body)
        .then(handleRequest<IRaid>).catch(handleError);
}
export const getRaiderTasks = (request: IPaginatedRequest): Promise<IResponse<IMultipleRaiderTask>> => {
    return axiosInstance().get(`/user/services/client/raider?limit=${request.limit}&page=${request.page}`)
        .then(handleRequest<IMultipleRaiderTask>).catch(handleError);
}
export const getRaiderTask = (request: IGetTask): Promise<IResponse<IRaiderTask>> => {
    return axiosInstance().get(`/user/services/client/raider/${request.task_id}`)
        .then(handleRequest<IRaiderTask>).catch(handleError);
}