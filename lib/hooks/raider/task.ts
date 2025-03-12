import { useRouter } from 'next/navigation';
import * as API from '../../api/raider/task';
import { toast } from 'react-toastify';
import { useUserStore } from '@/lib/store/user';
import { useRaiderTaskStore } from '@/lib/store/client/raider';
import { IPaginatedRequest } from '@/lib/types/pagination';
import { ICreateRaid } from '@/lib/types/raider/raider.interface';

export const useRaidTaskFeature = () => {
    const router = useRouter();
    const { setLoading } = useUserStore();
    const { raiderTasks, setRaiderTask } = useRaiderTaskStore();

    const handleStartTask = async (request: ICreateRaid) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.startRaidTask(request);
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
            const response = await API.getRaiderTasks(request);
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

    return { handleStartTask, raiderTasks, getRaiderTasks };
}