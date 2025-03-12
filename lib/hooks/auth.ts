import * as API from '@/lib/api/auth';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IUserLogin, IUserRegister } from '../types/auth';
import { useAuthStore } from '../store/auth';

export const useAuthFeature = () => {
    const { errors, setLoading, setErrors }  = useAuthStore();
    const params = useSearchParams();

    const login = async (request: IUserLogin & { remember_me?: boolean }) => {
        try {
            setLoading(true);
            const response = await API.loginUser(request);
            if (response.status) {
                localStorage.setItem("bmdao-token", response.data.access_token);
                if (request.remember_me)
                    localStorage.setItem("bmdao-refresh-token", response.data.refresh_token);

                window.location.href = params.get("redirect_url") ?? '/dashboard';
                setLoading(false);
                return;
            }
            setLoading(false);
            setErrors(response.error);
            if (response.message) {
                toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const register = async (request: IUserRegister & { remember_me?: boolean }) => {
        try {
            setLoading(true);
            const response = await API.registerUser(request);
            console.log("response: ", response);
            if (response.status) {
                localStorage.setItem("bmdao-token", response.data.access_token);
                if (request.remember_me)
                    localStorage.setItem("bmdao-refresh-token", response.data.refresh_token);

                window.location.href = params.get("redirect_url") ?? '/dashboard';
                setLoading(false);
                return;
            }
            setErrors(response.error);
            if (response.message) {
                toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            toast.error(error as string, { position: toast.POSITION.TOP_RIGHT });
        } finally {
            setLoading(false);
        }
    }


    return { errors, login, register };
}