'use client'
import classes from './singupbutton.module.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Signupbutton = () => {
    const user = useSelector(state => state.user);

    const href = user?.id ? '/profile' : '/login';
    const text = user?.id ? 'الملف الشخصي' : 'تسجيل الدخول';
    const btnClass = user?.id ? classes.profile : classes.signup;

    return (
        <Link href={href} className={`${classes.button} ${btnClass}`}>
            {text}
        </Link>
    );
}

export default Signupbutton;
