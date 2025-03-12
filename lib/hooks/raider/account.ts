import { useRouter } from 'next/navigation';
import * as API from '../../api/raider/account';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { useUserStore } from '../../store/user';
import { useRaiderAccountStore } from '../../store/account/raider/raider';
import { IRaiderSocials } from '@/lib/types/raider/raider.interface';


export const useRaiderAccountFeature = () => {
    const { setLoading, isLoading } = useUserStore();
    const { raiderAccount ,setRaiderAccount } = useRaiderAccountStore();
    const router = useRouter();

    const subscribeRaiderAccount = async (request: IRaiderSocials) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.subscribeForRaiderAccount(request);
            if (response.status) {
                setRaiderAccount(response.data);
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

    const getRaiderAccount = async () => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.getRaiderAccount();
            if (response.status) {
                setRaiderAccount(response.data);
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

    const updateSocialProfile = async (request: IRaiderSocials) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.updateUserSocials(request);
            if (response.status) {
                setRaiderAccount(response.data);
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
        isLoading,
        raiderAccount,
        subscribeRaiderAccount,
        getRaiderAccount,
        updateSocialProfile
    };
}