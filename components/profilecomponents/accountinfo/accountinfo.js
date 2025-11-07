import { useState, useEffect, Fragment, useRef, useReducer } from 'react';
import { useSelector } from 'react-redux';
import classes from './accountinfo.module.css';
import Confirm from '@/components/confirmcomponent/confirm';
import { useDispatch } from 'react-redux';
import { setActive } from '@/store/notifySlice';
import { setinfo } from '@/store/userSlice';
import { updateImage, updateUserByUserId } from '@/app/profile/update-user';
import { fetchUserImage } from '@/app/profile/get-user-data';
import { signOut } from 'next-auth/react';
impor
const AccountInfo = ({ firstname, lastname, username, phonenum, createdat, sub_type, image }) => {
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [user, setUser] = useState('');
    const [phone, setPhone] = useState('');
    const [change, setchange] = useState(false);
    const [profilePic, setProfilePic] = useState('/assets/pics/userpic/profile-user.png');
    const [imagechanged, setImagechanged] = useState(false);
    const [loading, setloading] = useState(false);
    const fileInputRef = useRef();
    const notifystate = useSelector(state => state.notify);
    const userid = useSelector(state => state.user.id);
    const dispatchredux = useDispatch();
    const formmatedDate = createdat ? new Date(createdat).toLocaleDateString('en-GB',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-') : '';
    useEffect(() => {
        setFirst(firstname || '');
        setLast(lastname || '');
        setUser(username || '');
        setPhone(phonenum || '');
        if (image) {
            setProfilePic(image);
        } else {
            setProfilePic('/assets/pics/userpic/profile-user.png');
        }
        console.log("الصورة من ريدكس:", image);
    }, [firstname, lastname, username, phonenum, image]);
    useEffect(() => {
        setchange((first !== firstname || last !== lastname || user != username || phone !== phonenum || (profilePic !== '/assets/pics/userpic/profile-user.png' && profilePic !== image)) ? true : false);

    }, [first, last, user, phone, profilePic]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfilePic(imageURL);
            setImagechanged(true);
        }
    };
    useEffect(() => {
        const getimage = async () => {
            const image = await fetchUserImage();
            console.log(image);
            if (image) setProfilePic(image.data.image);
            setchange(false);
        };
        getimage();
    }, []);
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const updateuser = async () => {
        if (fileInputRef.current && fileInputRef.current.files[0]) {
            const formdata = new FormData();
            formdata.append('file', fileInputRef.current.files[0]);
            formdata.append('id', userid);
            try {
                setloading(true);
                const res = await fetch(`/api/user/upload-profile-image`, {
                    method: 'POST',
                    body: formdata
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log(data);
                    try {
                        const response = await updateImage(data.url, data.public_id);
                        console.log(response);
                    }
                    catch (e) {
                        console.log("فشل رفع الصورة إلى قاعدة البيانات!!", e);
                    }
                    setchange(false);
                }
            }
            catch (e) {
                console.log('فشل في رفع صورة المستخدم!  ', e);
            }
            finally {
                setloading(false);
            }
        }
        const datatoupdate = {};
        if (first !== firstname) datatoupdate.firstName = first;
        if (last !== lastname) datatoupdate.lastName = last;
        if (user !== username) datatoupdate.username = user;
        if (phone !== phonenum) datatoupdate.phone = phone;
        if (Object.keys(datatoupdate).length === 0) return;
        try {
            setloading(true);
            const res = await updateUserByUserId(userid, datatoupdate);
            const data = JSON.parse(res.data);
            console.log(data);
            setloading(false);
            if (res.ok) {
                dispatchredux(setActive('successupdateprofile'));
                setImagechanged(false);
                dispatchredux(setinfo(data));
                setchange(false);
            }
        }
        catch {
            console.log('خطأ بتعديل معلومات المستخدم');
            setloading(false);
            dispatchredux(setActive('failedupdateprofile'));
        }
    };
    const submissionhandler = (e) => {
        e.preventDefault();
        updateuser();
    }
    const initialState = {
        firsterror: false,
        lasterror: false,
        namelangerror: false,
        usernameerror: false,
        phonenumerror: false,
    };
    const formReducer = (state, action) => {
        switch (action.type) {
            case 'SET_TRUE':
                return { ...state, [action.field]: true };
            case 'SET_FALSE':
                return { ...state, [action.field]: false };
        }
    }
    const [state, dispatch] = useReducer(formReducer, initialState);
    useEffect(() => {
        if (first && last) {
            const isarabic = (name) => /^[\u0600-\u06FF]+$/.test(name);
            const isenglish = (name) => /^[a-zA-Z]+$/.test(name);
            if ((isarabic(first) && isarabic(last)) || (isenglish(first) && isenglish(last))) {
                dispatch({ type: 'SET_FALSE', field: 'namelangerror' });
            }
            else {
                dispatch({ type: 'SET_TRUE', field: 'namelangerror' });
            }

        }
    }, [first, last]);
    return (
        <Fragment>
            <div className={classes.accountinfo}>
                <form className={classes.accountform} onSubmit={submissionhandler}>
                    <div className={classes.form}>
                        <input
                            type='text'
                            placeholder='الاسم الأول'
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                            onBlur={() => {
                                const name = first.trim();
                                const nameReg = /^([\u0600-\u06FFa-zA-Z]{2,})$/;
                                if (!nameReg.test(name)) {
                                    dispatch({ type: 'SET_TRUE', field: 'firsterror' });
                                    return;
                                }
                                else {
                                    dispatch({ type: 'SET_FALSE', field: 'firsterror' });
                                }
                            }}
                            className={classes.input}
                        />
                        <input
                            type='text'
                            placeholder='الاسم الأخير'
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                            onBlur={() => {
                                const name = last.trim();
                                const nameReg = /^([\u0600-\u06FFa-zA-Z]{2,})$/;
                                if (!nameReg.test(name)) {
                                    dispatch({ type: 'SET_TRUE', field: 'lasterror' })
                                    return;
                                }
                                else {
                                    dispatch({ type: 'SET_FALSE', field: 'lasterror' });
                                }
                            }}
                            className={classes.input}
                        />
                        {(state.firsterror || state.lasterror) && <p className={classes.error}>الاسم الأول والاسم الأخير لايجب ان يحتويان على أرقام ولا محارف مميزة ولايقلان عن محرفين .</p>}
                        {(state.namelangerror) && <p className={classes.error}>يجب أن يكون كلا الحقلين بنفس اللغة .</p>}
                        <input
                            type='text'
                            placeholder='اسم المستخدم'
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            onBlur={() => {
                                const username = user.trim();
                                const usernameReg = /^[a-zA-Z][a-zA-Z0-9*&^%$#@!_\-=+().<>{}]*$/;
                                if (!usernameReg.test(user)) {
                                    dispatch({ type: 'SET_TRUE', field: 'usernameerror' });
                                }
                                else {
                                    dispatch({ type: 'SET_FALSE', field: 'usernameerror' });
                                }
                            }}
                            className={`${classes.input} ${classes.dir}`}
                        />
                        {state.usernameerror && <p className={classes.error}>اسم المستخدم يجب أن يبدأ بمحرف وأن يكون باللغة الانكليزية .</p>}
                        <input
                            type='text'
                            placeholder='رقم الهاتف'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => {
                                const trimmedphone = phone.trim();
                                const phoneReg = /^(09|\+963\s9)\d{8}$/;
                                if (!phoneReg.test(trimmedphone)) {
                                    dispatch({ type: 'SET_TRUE', field: 'phonenumerror' });
                                }
                                else {
                                    dispatch({ type: 'SET_FALSE', field: 'phonenumerror' });
                                }
                            }}
                            className={`${classes.input} ${classes.dir}`}
                        />
                        {state.phonenumerror && <p className={classes.error}>يجب أن يبدأ رقم الهاتف ب 09 أو 9 963+ ومن ثم 8 أرقام ويجب أن يكون بالأرقام الانكليزية .</p>}
                        <p className={classes.bold}>نوع الاشتراك : {sub_type}</p>
                    </div>
                    <div className={classes.piccontainer}>
                        <img className={classes.pic} src={profilePic ? profilePic : '/assets/pics/userpic/profile-user.png'} onClick={handleImageClick} />
                        <input
                            type='file'
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <p className={classes.date}>{username}</p>
                        <p className={classes.datestart}>تاريخ إنشاء الحساب</p>
                        <div className={classes.createdatcontainer}>

                            <img className={classes.datepic} src='/assets/icons/date/calendar.png' />
                            <p className={classes.date}>{formmatedDate}</p>
                        </div>
                        <input className={classes.btn} type='submit' value={`تحديث معلومات الحساب`} disabled={!change} />
                    </div>
                </form>
                {loading && <div className={classes.overlay}>
                    <div className={classes.spinner}></div>
                    <p>جار التحميل...</p>
                </div>}
                {notifystate.active && <Confirm Confirmkey={notifystate.key} />}
            </div>
        </Fragment>
    );
};

export default AccountInfo;
