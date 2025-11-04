import calsses from './ownerdetails.module.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Ownerdetails = ({ owner }) => {
    const router = useRouter();


    return (<div className={calsses.container}>
        <img className={calsses.userpic} src={owner.image || '/assets/pics/userpic/profile-user.png'} />
        <div className={calsses.username}>{owner.username}</div>
        <div className={calsses.credentials}>
            <p className={calsses.property}>البريد الالكتروني : </p>
            <p className={calsses.value}>{owner.email}</p>
        </div>
        <div className={calsses.credentials}>
            <p className={calsses.property}>رقم الهاتف : </p>
            <p className={calsses.value}>{owner.phone}</p>
        </div>
        <button className={calsses.viewBtn} onClick={() => { router.push(`/viewuserdetails/${owner.id}`) }}>عرض المستخدم</button>
    </div>)
}

export default Ownerdetails;