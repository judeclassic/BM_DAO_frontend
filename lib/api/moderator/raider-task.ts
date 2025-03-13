import { IPaginatedRequest } from "@/lib/types/pagination";
import { axiosInstance, handleError, handleRequest } from "../axios";
import { IGetTask, IMultipleRaiderTask, IRaiderTask } from "@/lib/types/raider/task.interface";
import IResponse from "@/lib/types/response";
import { IApproveRaid, ICreateRaid, IGetRaid, IGetRaids, IMultipleRaid, IRaid, IRaidHandler, IRejectRaid } from "@/lib/types/raider/raid.interface";

//User
export const approveRaid = (body: IApproveRaid): Promise<IResponse<IRaidHandler>> => {
    return axiosInstance().post("/user/services/moderator/raider/raid", body)
        .then(handleRequest<IRaidHandler>).catch(handleError);
}
export const rejectRaid = (body: IRejectRaid): Promise<IResponse<IRaidHandler>> => {
    return axiosInstance().put("/user/services/moderator/raider/raid", body)
        .then(handleRequest<IRaidHandler>).catch(handleError);
}
export const getRaiderTasks = (request: IPaginatedRequest): Promise<IResponse<IMultipleRaiderTask>> => {
    return axiosInstance().get(`/user/services/moderator/raider/?limit=${request.limit}&page=${request.page}`)
        .then(handleRequest<IMultipleRaiderTask>).catch(handleError);
}
export const getRaiderTask = (request: IGetTask): Promise<IResponse<IRaiderTask>> => {
    return axiosInstance().get(`/user/services/moderator/raider/${request.task_id}`)
        .then(handleRequest<IRaiderTask>).catch(handleError);
}
export const getRaids = (request: IGetRaids): Promise<IResponse<IMultipleRaid>> => {
    return axiosInstance().get(`/user/services/moderator/raider/raid/?limit=${request.limit}&page=${request.page}&status=${request.status}&task_id=${request.task_id}`)
        .then(handleRequest<IMultipleRaid>).catch(handleError);
}
export const getRaid = (request: IGetRaid): Promise<IResponse<IRaid>> => {
    return axiosInstance().get(`/user/services/moderator/raider/raid/${request.raid_id}`)
        .then(handleRequest<IRaid>).catch(handleError);
}