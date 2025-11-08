import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { resetinfo } from '@/store/yourSlice';
import { useState } from 'react';

const useLogout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            await signOut({ callbackUrl: '/login' });

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
