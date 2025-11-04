'use client';
import { useEffect, useState } from 'react';
import classes from './comments.module.css';
import Rating from 'react-rating';
import { useSelector, useDispatch } from 'react-redux';
import { setActive } from '@/store/notifySlice';
import Confirm from '@/components/confirmcomponent/confirm';
const CommentsSection = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);
    const [Loading, setLoading] = useState(false);
    const userid = useSelector(state => state.user.id);
    const username = useSelector(state => state.user.username);
    const notifystate = useSelector(state => state.notify);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!userid || !id) {
            return
        }
        const fetchrating = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:8000/api/properties/${id}/users/${userid}/rating`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await res.json();

                console.log(data);
                if (res.ok) {
                    console.log('نجاح جلب التقييم');
                    if (data.rating)
                        setRating(data.rating);
                }
            } catch {
                console.log('فشل جلب تقييم المستخدم لهذا العقار')
            }
        }
        fetchrating();
    }, [id, userid]);
    useEffect(() => {
        const fetchcomments = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/properties/${id}/comments`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await res.json();
                console.log(data);
                const formmated = data.comments.map(item => { return { id: item.id, username: item.username, text: item.comment, date: new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') } });
                if (res.ok) {
                    console.log('نجاح جلب التعليقات')
                    setComments(formmated);
                }
            } catch {
                console.log('فشل جلب التعليقات')
            }
        };
        fetchcomments();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return;
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const timestamp = now.getTime();
        const newComment = {
            id: timestamp,
            text,
            date: formattedDate,
            username: username
        };


        try {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(setActive('pleaselogin'));
                return;
            }
            setLoading(true);
            const res = await fetch(`http://localhost:8000/api/propertyEvaluation/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: text })
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                console.log('نجاح التعليق');
            }
            setLoading(false);
        } catch {
            console.log('فشل التعقليق');
            setLoading(false);
        }
        setComments([newComment, ...comments]);
        setText('');
    };
    const handleClick = (value) => {
        setRating(value);
        console.log(rating);
    };
    const handleStarSubmission = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(setActive('pleaselogin'));
                return;
            }
            setLoading(true);
            const res = await fetch(`http://localhost:8000/api/propertyEvaluation/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating: rating })
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                console.log('نجاح التقييم');
            }
            setLoading(false);
        } catch {
            console.log('فشل التقييم');
            setLoading(false);
        }
    }
    return (
        <div className={classes.commentsSection}>
            <h2>💬 التعليقات</h2>

            <div className={classes.commentsList}>
                {comments.length === 0 && (
                    <p className={classes.noComments}>لا توجد تعليقات بعد.</p>
                )}
                {comments.map((comment) => (
                    <div key={comment.id} className={classes.comment}>
                        <div className={classes.commentHeader}>
                            <span className={classes.commentName}>{comment.username}</span>
                            <span className={classes.commentDate}>{comment.date}</span>
                        </div>
                        <p className={classes.commentText}>{comment.text}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className={classes.commentForm}>
                <textarea
                    placeholder="أضف تعليقك..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={classes.textarea}
                />
                <button type="submit" className={classes.button}>إرسال</button>
            </form>
            <form onSubmit={handleStarSubmission}>
                <div className={classes.ratingsection}>
                    <Rating
                        fractions={2}
                        initialRating={rating}
                        emptySymbol={<span style={{ fontSize: '48px', color: '#ccc' }}>☆</span>}
                        fullSymbol={<span style={{ fontSize: '48px', color: '#FFD700' }}>★</span>}
                        onChange={(value) => {
                            console.log('Rating:', value);
                            handleClick(value);
                        }}
                    />
                    <span className={classes.rating}>{rating}</span>
                </div>
                <input type='submit' value='تقييم' className={`${classes.button} ${classes.block}`} />
            </form>
            {Loading && <div className={classes.overlay}>
                <div className={classes.spinner}></div>
                <p>جار التحميل...</p>
            </div>}
            {notifystate.active && <Confirm Confirmkey={notifystate.key} />}
        </div>
    );
};

export default CommentsSection;
