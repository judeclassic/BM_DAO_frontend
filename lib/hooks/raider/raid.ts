import { useRouter } from 'next/navigation';
import * as API from '../../api/raider/client-task';
import { toast } from 'react-toastify';
import { useUserStore } from '@/lib/store/user';
import { useRaiderTaskStore } from '@/lib/store/client/raider';
import { IPaginatedRequest } from '@/lib/types/pagination';

export const useRaidTaskFeature = () => {
    const router = useRouter();
    const { setLoading } = useUserStore();
    const { raiderTasks, setRaiderTask } = useRaiderTaskStore();

    const getRaiderRaids = async (request: IPaginatedRequest) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);
            setLoading(true);
            const response = await API.getClientRaiderTasks(request);
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