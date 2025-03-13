import { IPaginatedRequest } from "@/lib/types/pagination";
import { axiosInstance, handleError, handleRequest } from "../axios";
import { ICreateRaidTask, IGetTask, IMultipleRaiderTask, IRaiderTask } from "@/lib/types/raider/task.interface";
import IResponse from "@/lib/types/response";

//Clients
export const createRaidTask = (body: ICreateRaidTask): Promise<IResponse<IRaiderTask>> => {
    return axiosInstance().post("/user/services/client/raider", body)
        .then(handleRequest<IRaiderTask>).catch(handleError);
}
export const getClientRaiderTasks = (request: IPaginatedRequest): Promise<IResponse<IMultipleRaiderTask>> => {
    return axiosInstance().get(`/user/services/client/raider?limit=${request.limit}&page=${request.page}`)
        .then(handleRequest<IMultipleRaiderTask>).catch(handleError);
}
export const getRaiderTask = (request: IGetTask): Promise<IResponse<IRaiderTask>> => {
    return axiosInstance().get(`/user/services/client/raider/${request.task_id}`)
        .then(handleRequest<IRaiderTask>).catch(handleError);
}