import { useRouter } from 'next/navigation';
import * as API from '../api/user';
import { toast } from 'react-toastify';
import { IUpdateProfile } from '../types/user/user.interface';
import { useUserStore } from '../store/user';

export const useUserFeature = () => {
    const { user, isLoading, setUser, setLoading } = useUserStore();
    const router = useRouter();

    const getProfile = async () => {
        try {
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);
            setLoading(true);

            const response = await API.getUserProfile();
            if (response.status) {
                setUser(response.data);
                setLoading(false);
                return;
            }
            setLoading(false);
            localStorage.removeItem("bmdao-token");
            router.replace(`/auth/login?redirect_url=${window.location.href}` );
            toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
            setLoading(false);
        }
    }

    const updateProfile = async (request: IUpdateProfile) => {
        try {
            if(!request.country || !request.phone_number || !request.name) {
                toast.error("Fill in required fields", {
                  position: toast.POSITION.TOP_RIGHT
                }); 
                return;
              }
            if (!localStorage.getItem("bmdao-token")) router.replace( `/auth/login?redirect_url=${window.location.href}`);

            setLoading(true);
            const response = await API.updateUserProfile(request);
            if (response.status) {
                setUser(response.data);
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

    return { user, isLoading, getProfile, updateProfile };
}