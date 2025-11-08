import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { resetinfo } from '@/store/userSlice';
import { useState } from 'react';
import { Logout } from '@/serverrequests/logout';
const useLogout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await Logout();
            console.log(res);
            dispatch(resetinfo());

            return { ok: true, message: "تم تسجيل الخروج بنجاح!" };
        } catch (error) {
            console.error("فشل تسجيل الخروج:", error);
            router.replace('/login');

            return { ok: false, message: "فشل تسجيل الخروج" };
        } finally {
            setLoading(false);
        }
    };
    return { handleLogout, loading };
};

export default useLogout;
