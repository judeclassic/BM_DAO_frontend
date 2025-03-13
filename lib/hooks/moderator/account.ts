import { useRouter } from 'next/navigation';
import * as API from '../../api/moderator/account';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/user';
import { useModeratorAccountStore } from '../../store/account/moderator/moderator';
import { IModeratorSocials } from '@/lib/types/moderator/moderator.interface';
import { useCallback } from 'react';


export const useModeratorAccountFeature = () => {
    const { setLoading, isLoading } = useUserStore();
    const { moderatorAccount ,setModeratorAccount } = useModeratorAccountStore();
    const { user } = useUserStore();
    const router = useRouter();

    const subscribeModeratorAccount = async (request: IModeratorSocials) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.subscribeForModeratorAccount(request);
            if (response.status) {
                setModeratorAccount(response.data);
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

    const getModeratorAccount = async () => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.getModeratorAccount();
            if (response.status) {
                setModeratorAccount(response.data);
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

    const updateSocialProfile = async (request: IModeratorSocials) => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.updateUserSocials(request);
            if (response.status) {
                setModeratorAccount(response.data);
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

    const isModeratorSubscribed = useCallback(() => {
        if (!user?.setting.subscription.moderator) {
            return false;
        }
        if (moderatorAccount && moderatorAccount.subscription_status === 'Expired') {
            return false;
        }
        return true;
    }, [user, moderatorAccount])


    return {
        isLoading,
        moderatorAccount,
        subscribeModeratorAccount,
        getModeratorAccount,
        isModeratorSubscribed,
        updateSocialProfile
    };
}