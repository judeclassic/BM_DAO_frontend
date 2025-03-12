import { useRouter } from 'next/navigation';
import * as API from '../../api/raider/client-task';
import { toast } from 'react-toastify';
import { useUserStore } from '@/lib/store/user';
import { useRaiderTaskStore } from '@/lib/store/client/raider';
import { ICreateRaidTask, IGetTask, IRaiderTask } from '@/lib/types/raider/task.interface';
import { IPaginatedRequest } from '@/lib/types/pagination';
import { useState } from 'react';

export const useClientRaidTaskFeature = () => {
    const [ page, setPage ] = useState(1);
    const router = useRouter();
    const { isLoading, setLoading } = useUserStore();
    const { raiderTasks, setRaiderTask } = useRaiderTaskStore();

    const createTask = async (request: ICreateRaidTask) => {
        try {
            request.total_raids = parseInt((request?.total_raids ?? 1).toString());
            request.start_time = new Date(request?.start_time);
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.createRaidTask(request);
            if (response.status) {
                setLoading(false);
                return;
            }
            setLoading(false);
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    const getRaiderTasks = async (request: IPaginatedRequest) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.getClientRaiderTasks(request);
            if (response.status) {
                setRaiderTask(response.data);
                setLoading(false);
                return;
            }
            setPage(request.page);
            setLoading(false);
            if (response.no_token) router.replace( `/auth/login?redirect_url=${window.location.href}` );
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    return { isLoading, page, raiderTasks, createTask, getRaiderTasks };
}