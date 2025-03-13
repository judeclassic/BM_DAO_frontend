import { useRouter } from 'next/navigation';
import * as API from '../../api/moderator/raider-task';
import { toast } from 'react-toastify';
import { useUserStore } from '@/lib/store/user';
import { useRaiderTaskStore } from '@/lib/store/client/raider';
import { IPaginatedRequest } from '@/lib/types/pagination';
import { ICompleteRaid, ICreateRaid, IGetRaid, IGetRaids, IRejectRaid } from '@/lib/types/raider/raid.interface';
import { IGetTask } from '@/lib/types/raider/task.interface';
import { useRaidStore } from '@/lib/store/tasks/raids';

export const useRaiderTaskFeature = () => {
    const router = useRouter();
    const { setLoading } = useUserStore();
    const { currentTask, setCurrentTask, raiderTasks, setRaiderTask } = useRaiderTaskStore();
    const { currentRaid, setCurrentRaid, raids, setRaids } = useRaidStore();

    const approveRaid = async () => {
        try {
            if (!currentRaid) 
                return toast.error("unable to submit raid", { position: toast.POSITION.TOP_RIGHT });;
            if (!localStorage.getItem("bmdao-token"))
                return router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.approveRaid({ raid_id: currentRaid?.id });
            if (response.status) {
                setLoading(false);
                setCurrentRaid(response.data.new);
                return;
            }
            setLoading(false);
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    const rejectRaid = async () => {
        try {
            if (!currentRaid) 
                return toast.error("unable to submit raid", { position: toast.POSITION.TOP_RIGHT });;
            if (!localStorage.getItem("bmdao-token"))
                return router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.rejectRaid({ raid_id: currentRaid.id });
            if (response.status) {
                setLoading(false);
                setCurrentRaid(response.data.new);
                // router.push(`/dashboard/tasks/raiders/raid/${response}`)
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
            if (!localStorage.getItem("bmdao-token")) router.replace(`/auth/login?redirect_url=${window.location.href}`);
            setLoading(true);
            const response = await API.getRaids(request);
            console.log("response: ", response)
            if (response.status) {
                setRaids(response.data);
                setCurrentRaid(response.data.raids?.[0]);
                setLoading(false);
                return;
            }
            setLoading(false);
            if (response.no_token) router.replace(`/auth/login?redirect_url=${window.location.href}`);
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

        approveRaid,
        rejectRaid,
        
        getRaiderTask,
        getRaiderTasks,
        setCurrentRaid,

        currentRaid,
        raids,

        getRaid,
        getRaids,
    };
}