'use client'
import { Fragment, useEffect, useState } from 'react';
import classes from './viewuserdetails.module.css';
import Property from '@/components/property/property';
import axios from 'axios';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';


const UserProfile = ({ id }) => {
    const [user, setuser] = useState({});
    const [properties, setproperties] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
 
        const fetchuser = async () => {
            try {
                setloading(true);
                const res = await axios.get(`http://localhost:8000/api/publicuser/${id}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                const data = res.data;
                setuser(data.user);
                console.log(data.user);
                setloading(false);

            } catch {
                setloading(false);
                console.log('خطأ في جلب المستخدم');
            }
        }
        fetchuser();
    }, []);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setloading(true);

                const res = await fetch(`http://localhost:8000/api/viewuser/properties/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // أو من context/cookie
                        'Accept': 'application/json',
                    },
                });

                if (!res.ok) throw new Error('فشل في جلب العقارات');

                const data = await res.json();
                const formmated = data.data.map((item) => {
                    return {
                        id: item.id,
                        city: item.city_name,
                        region: item.region_name,
                        date: item.created_at,
                        area: item.space,
                        sub_type: item.featured,
                        status: item.status,
                        type: item.type,
                        title: item.title,
                        price: item.price,
                        url: item.first_image
                    }
                });
                setproperties(formmated);

                console.log(data.data);
            } catch {
                console.log('خطأ في جلب عقارات المستخدم')
            } finally {
                setloading(false);
            }
        };
        fetchProperties();
    }, []
    );

    return (
        <Fragment>
            <Navbar mainpage={false} />
            <div className={classes.profileContainer}>
                <div className={classes.topSection}>
                    <img src={user.image ? `http://localhost:8000/${user.image}` : '/assets/pics/userpic/profile-user.png'} alt="User" className={classes.userImage} />
                    <div className={classes.basicInfo}>
                        <h2>{user.firstname} {user.last_name}</h2>
                        <p className={classes.username}>{user.username}</p>
                        <p className={classes.email}>{user.email} 📧</p>
                        <p className={classes.phone}>{user.phone} 📞</p>
                        <p className={classes.joined}> عضو منذ: {new Date(user.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} 📅</p>
                        <p className={classes.subscription}>نوع الاشتراك: {user.sub_type}</p>
                    </div>
                </div>

                <div className={classes.propertiesSection}>
                    <h3>عقارات المستخدم</h3>
                    <div className={classes.propertiesGrid}>
                        {properties && properties.length > 0 ? (
                            properties.map((property) => (
                                <Property key={property.id} {...property} url={property.url ? `http://localhost:8000/${property.url}` : '/assets/pics/propertydumpic/ChatGPT Image Apr 28, 2025, 04_25_50 PM.png'} />
                            ))
                        ) : (
                            <p>لا توجد عقارات بعد.</p>
                        )}
                    </div>
                </div>
            </div>
            {loading && <div className={classes.overlay}>
                <div className={classes.spinner}></div>
                <p>جار التحميل...</p>
            </div>}
            <Footer />
        </Fragment>
    );
};

export default UserProfile;
