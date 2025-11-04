'use client';

import { useEffect, useState } from 'react';
import './notifications.css';

export default function NotificationSidebar({ close }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);



    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/notifications', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            const data = await res.json();
            setNotifications(data);
            if (res.ok) {
                console.log('نجاح جلب الاشعارات')
            }

        } catch (err) {
            console.log(err);
            console.log('فشل جلب التعليقات');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        const token = getAuthToken();
        if (!token) return;

        try {
            await fetch(`/api/notifications/${id}/read`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotifications(
                notifications.map((n) => (n.id === id ? { ...n, is_read: true } : n))
            );
        } catch (err) {
            console.error('فشل تعليم الإشعار كمقروء:', err);
        }
    };

    const markAllAsRead = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await fetch('http://localhost:8000/api/notifications/read-all', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                    , 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
        } catch (err) {
            console.log('فشل تعليم الكل كمقروء:', err);
        }
    };

    const unreadCount = notifications.filter((n) => !n.is_read).length;


    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>

            <div
                className="notification-overlay"
                onClick={close}
                aria-label="إغلاق الشريط"
            ></div>


            <div className="notification-sidebar">
                <div className="notification-header">
                    <h2>الإشعارات</h2>
                    <button
                        onClick={close}
                        className="notification-close-btn"
                        aria-label="إغلاق"
                    >
                        ✕
                    </button>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="notification-mark-all-btn"
                    >
                        تعليم الكل كمقروء
                    </button>
                )}

                <div className="notification-list">
                    {loading ? (
                        <div className="notification-loading">جاري التحميل...</div>
                    ) : notifications.length === 0 ? (
                        <div className="notification-empty">لا توجد إشعارات</div>
                    ) : (
                        notifications.map((n) => (
                            <div
                                key={n.id}
                                className={`notification-item ${!n.is_read ? 'notification-unread' : ''}`}
                            >
                                <div className="notification-title">{n.data.title}</div>
                                <div className="notification-message">
                                    {n.data.message}
                                </div>
                                <div className="notification-footer">
                                    <span className="notification-time">
                                        {new Date(n.created_at).toLocaleDateString('en-GB', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </span>
                                    {!n.is_read && (
                                        <button
                                            onClick={() => markAsRead(n.id)}
                                            className="notification-read-btn"
                                        >
                                            تعليم كمقروء
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}