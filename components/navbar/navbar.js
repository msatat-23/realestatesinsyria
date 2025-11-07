'use client'
import classes from './navbar.module.css';
import Signupbutton from "../singupbutton/singupbutton";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdvancedSearch from '../advancedsearch/advancedsearch';
import { useSelector } from 'react-redux';
import { Readex_Pro } from 'next/font/google';
import NotificationSidebar from '../notifications/notifications';
import Confirm from '../confirmcomponent/confirm';

const Readex_Pro_Font = Readex_Pro({ subsets: ['arabic'], weight: '400' });
const Navbar = ({ mainpage }) => {
    const [clicked, setClicked] = useState(false);
    const [ShowAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [shownotifications, setshownotifications] = useState(false);
    const user = useSelector(state => state.user);
    const notifystate = useSelector(state => state.notify);
    const router = useRouter();
    const clickhandler = () => {
        setClicked(prev => !prev);
    }
    const showsingpage = () => {
        router.push('/login');
    }
    const hidehandler = () => {
        setShowAdvancedSearch(false);
    }


    return (
        <div className={`${classes.navbar} ${Readex_Pro_Font.className}`}>
            {(ShowAdvancedSearch) && <div className={classes.overlay} onClick={hidehandler}></div>}
            {ShowAdvancedSearch && <AdvancedSearch hide={() => setShowAdvancedSearch(false)} />}
            <div className={classes.profileandnot}>
                <Signupbutton />
                {<img src='/assets/icons/notifications/notification.png' className={classes.noticon} onClick={() => { setshownotifications(prev => !prev) }} />}
            </div>
            {shownotifications && <NotificationSidebar close={() => { setshownotifications(false) }} />}
            <img onClick={clickhandler} className={classes.listBtn} src='/assets/icons/menu/hamburger.png' />
            <ul className={`${classes.menu}  ${clicked ? classes.show : ''}`}>
                <li><Link href='/' className={`${classes.a} ${mainpage ? '' : classes.newcolor} ${clicked ? classes.newcolor1 : ''}`}>الصفحة الرئيسية</Link></li>
                <li><Link href='/addproperty/new' className={`${classes.a} ${mainpage ? '' : classes.newcolor} ${clicked ? classes.newcolor1 : ''}`}>أعلن عن عقارك</Link></li>
                <li className={`${classes.a} ${mainpage ? '' : classes.newcolor} ${clicked ? classes.newcolor1 : ''}`} onClick={() => setShowAdvancedSearch(true)}> البحث المتقدم</li>
                <li><Link href={`/profile/${1}?section=sub`} className={`${classes.a} ${mainpage ? '' : classes.newcolor} ${clicked ? classes.newcolor1 : ''}`}>اشترك وأصبح عضو مميز</Link></li>
                <li><Link href='/contactus' className={`${classes.a} ${mainpage ? '' : classes.newcolor} ${clicked ? classes.newcolor1 : ''}`}>تواصل معنا</Link></li>
            </ul>
            <Link href='/'>
                <img className={classes.img} src="/assets/pics/logo/logo-dark-transparent.png" alt="company-logo" />
            </Link>
            {notifystate.active && <Confirm Confirmkey={notifystate.key} />}
            {notifystate.active && <div className={classes.overlay}></div>}
        </div>)

}

export default Navbar;