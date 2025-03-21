import { useRouter } from 'next/navigation';
import * as API from '../../api/raider/task';
import { toast } from 'react-toastify';
import { useUserStore } from '@/lib/store/user';
import { useRaiderTaskStore } from '@/lib/store/client/raider';
import { IPaginatedRequest } from '@/lib/types/pagination';
import { ICompleteRaid, ICreateRaid, IGetRaid, IGetRaids } from '@/lib/types/raider/raid.interface';
import { IGetTask, IRaiderTask } from '@/lib/types/raider/task.interface';
import { useRaidStore } from '@/lib/store/tasks/raids';

export const useRaiderTaskFeature = () => {
    const router = useRouter();
    const { setLoading } = useUserStore();
    const { currentTask, setCurrentTask, raiderTasks, setRaiderTask } = useRaiderTaskStore();
    const { currentRaid, setCurrentRaid, raids, setRaids } = useRaidStore();

    const handleStartTask = async (request: ICreateRaid) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.startRaidTask(request);
            if (response.status) {
                setLoading(false);
                router.push(`/dashboard/tasks/raiders/raid/${response.data.id}`)
                return;
            }
            setLoading(false);
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    const handleCompleteTask = async (request: ICompleteRaid) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);
            const formData = new FormData()

            if (!request.proofs || request.proofs.length === 0) {
                toast.error('Please select at least one file.', { position: toast.POSITION.TOP_RIGHT });
                return;
            }

            formData.append('raid_id', request.raid_id);
            for (let i = 0; i < request.proofs.length; i++) {
                formData.append('files', request.proofs[i]); // Append each file to the FormData object
            }
            setLoading(true);
            const response = await API.completeRaidTask(formData);
            if (response.status) {
                setLoading(false);
                router.push(`/dashboard/tasks/raiders/raid/${response.data.id}`)
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
            const response = await API.getRaiderTasks(request);
            console.log("response: ", response)
            if (response.status) {
                setRaiderTask(response.data);
                setLoading(false);
                return;
            }
            setLoading(false);
            if (response.no_token) router.replace( `/auth/login?redirect_url=${window.location.href}` );
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    const getRaiderTask = async (request: IGetTask ) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);
            setLoading(true);
            const response = await API.getRaiderTask(request);
            console.log("response: ", response)
            if (response.status) {
                setCurrentTask(response.data);
                setLoading(false);
                return;
            }
            setLoading(false);
            if (response.no_token) router.replace( `/auth/login?redirect_url=${window.location.href}` );
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    const getRaids = async (request: IGetRaids) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);
            setLoading(true);
            const response = await API.getRaids(request);
            console.log("response: ", response)
            if (response.status) {
                setRaids(response.data);
                setLoading(false);
                return;
            }
            setLoading(false);
            if (response.no_token) router.replace( `/auth/login?redirect_url=${window.location.href}` );
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    const getRaid = async (request: IGetRaid ) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);
            setLoading(true);
            const response = await API.getRaid(request);
            console.log("response: ", response)
            if (response.status) {
                setCurrentRaid(response.data);
                setLoading(false);
                return;
            }
            setLoading(false);
            if (response.no_token) router.replace( `/auth/login?redirect_url=${window.location.href}` );
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    return { 
        currentTask,
        raiderTasks,

        handleStartTask,
        handleCompleteTask,
        
        getRaiderTask,
        getRaiderTasks,

        currentRaid,
        raids,

        getRaid,
        getRaids,
    };
}