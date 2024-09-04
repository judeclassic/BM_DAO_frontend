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

//Wale///////


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


// chatter work

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



//raider//

//task

export const raiderAvailbleTaskForDay = (page: any, limit: any) => {
    return axiosInstance().get(`/user/worker/raider/task/active/per/day?limit=${limit}&page=${page}`);
}


//raid work
export const raiderTaskByStatus = (page: any, limit: any, status: any) => {
    return axiosInstance().get(`/user/worker/raider/raid/by/status?limit=${limit}&page=${page}&status=${status}`);
}


//moderator//

//chatter task

export const chatterTaskByStatus = (page: any, limit: any, status: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/chatter/task/by/status?limit=${limit}&page=${page}&status=${status}`);
}

export const loadChatterToModerate = () => {
    return axiosInstance().get(`/user/worker/moderator/task/chatter/chat/task`);
}

export const approveChatTask = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/chatter/chat/approve", body);
}

export const rejectChatTask = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/chatter/chat/reject", body);
}

//raider tass
export const moderatorRaiderTaskByStatus = (page: any, limit: any, status: any) => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/task/by/status?limit=${limit}&page=${page}&status=${status}`);
}

export const loadRaidToModerate = () => {
    return axiosInstance().get(`/user/worker/moderator/task/raider/raid/task`);
}

export const approveRaidTask = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/raider/raid/approve", body);
}

export const rejectRaidTask = (body: any) => {
    return axiosInstance().post("/user/worker/moderator/task/raider/raid/reject", body);
}



/// client ////

// client chatter
export const getAllClientChatterTask = (page: any, limit: any,) => {
    return axiosInstance().get(`/user/client/chatter/getusertasks?limit=${limit}&page=${page}`);
}

export const getAllTotalChatTaskByStatus = (status: any) => {
    return axiosInstance().get(`/user/client/chatter/task/by/status?status=${status}`);
}

export const createChatTask = (body: any) => {
    return axiosInstance().post("/user/client/chatter/create_task", body);
}

// client Raider
export const getAllTotalRaidTaskByStatus = (page: any, limit: any, status: any) => {
    // return axiosInstance().get(`/user/client/raider/task/by/status?page=${page}&limit=${limit}&status=${status}`);
    return axiosInstance().get(`/user/client/raider/task/by/status?page=${page}&limit=${limit}&status=${status}`);
}


//personall 
export const deposit = (body: any) => {
    return axiosInstance().post("/user/personal/wallet/fund", body);
}

export const withdraw = (body: any) => {
    return axiosInstance().post("/user/personal/wallet/withdraw", body);
}

export const transfer = (body: any) => {
    return axiosInstance().post("/user/personal/wallet/tranfer", body);
}

export const bmdaoTokenBalance = () => {
    return axiosInstance().get(`/user/personal/wallet/token/balance`);
}




