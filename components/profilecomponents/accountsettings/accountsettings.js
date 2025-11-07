import { useEffect, useState } from 'react';
import classes from './accountsettings.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/loggedInSlice';
import { useRouter } from 'next/navigation';
import { resetinfo } from '@/store/userSlice';
import { setActive } from '@/store/notifySlice';
import Confirm from '@/components/confirmcomponent/confirm';
import { updatePassword, updatePrivacy } from '@/app/profile/update-user';
import { passwordValidation } from '@/lib/validation/uservalidators';
import { fetchprivacy } from '@/app/profile/get-user-data';
import { Logout } from '@/serverrequests/logout';
import { signOut } from 'next-auth/react';
const AccountSettings = ({ onLogout }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [privacy, setPrivacy] = useState({
        hidePhone: false,
        hideEmail: false,
        hideFirstAndLast: false
    });
    const userid = useSelector(state => state.user.id);
    const notifystate = useSelector(state => state.notify);
    const dispatch = useDispatch();
    const router = useRouter();


    const handlePasswordUpdate = async () => {
        if (newPassword !== confirmPassword) {
            setPasswordMatch(false);
            return;
        } else {
            setPasswordMatch(true);
        }
        try {
            setLoading(true);
            const res = await updatePassword(currentPassword, newPassword);
            if (res.ok) {
                console.log("نجاح تغيير كلمة المرور");
                dispatch(setActive("successpasschange"));
                setCurrentPassword('');
                setConfirmPassword('');
                setNewPassword('');
            } else {
                console.log("فشل تغيير كلمة المرور");
                dispatch(setActive("failpasschange"));
            }
        } catch (e) {
            console.log("خطأ في تغيير كلمة المرور", e);
            dispatch(setActive("failpasschange"));
        } finally {
            setLoading(false);
        }
    };

    const handlePrivacySettingsSave = async () => {
        console.log(privacy);
        try {
            setLoading(true);
            const res = await updatePrivacy(privacy);
            if (res.ok) {
                console.log('نجاح الخصوصية');
            }
        } catch (e) {
            console.log('فشل في حفظ اعدادات الخصوصية', e);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8000/api/deleteUser',
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = res.json();
            console.log(data);
            if (res.ok) {
                dispatch(logout());
                dispatch(resetinfo());
                dispatch(setActive('logout'));
            }
            setLoading(false);
            router.replace('/');
        } catch {
            console.log('خطأ في حذف حساب المستخدم');
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await signOut({ redirect: false });
            dispatch(resetinfo());
            router.replace('/login');
            return { ok: true, message: "تم تسجيل الخروج بنجاح!" };
        } catch (e) {
            console.log("فشل", e);
            return { ok: false, message: "فشل تسجيل الخروج" };
        }
        finally {
            setLoading(false);
        }
        // try {

        //     const res = await Logout();
        //     if (res.ok) {
        //         console.log("تم تسجيل الخروج");
        //         dispatch(resetinfo());
        //     }
        // } catch (e) {
        //     console.log("HUGE FAILURE!!");
        // }
        // finally {
        //     setLoading(false);
        // }
    };
    useEffect(() => {
        const fetchprivacysettings = async () => {
            try {
                setLoading(true);
                const res = await fetchprivacy();
                if (res.ok) {
                    console.log('تم جلب اعدادات الخصوصية');
                    setPrivacy({
                        ...res.data
                    });
                    setLoading(false);
                }
            } catch {
                console.log('خطأ في جلب اعدادات الحصوصية');
                setLoading(false);
            }
        }
        fetchprivacysettings();
    }, []);

    return (
        <div className={classes.settingscontainer}>
            <h2 className={classes.settingstitle}>إعدادات الحساب</h2>


            <div className={classes.settingsection}>
                <h3>تغيير كلمة المرور</h3>


                <div className={classes.passwordwrapper}>
                    <input
                        type={showpassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="كلمة المرور الحالية"
                        className={classes.settingsinput}
                    />
                    {<img className="absolute left-2 top-1.5 p-1 w-9 h-9"
                        src={`${showpassword ? '/assets/icons/showandhidepass/hide.png' : '/assets/icons/showandhidepass/eye (1).png'}`}
                        onClick={() => { setShowPassword(prev => !prev) }} />}
                </div>


                <div className={classes.passwordwrapper}>
                    <input
                        type={showpassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={() => {
                            const validation = passwordValidation(newPassword);
                            if (validation) {
                                setPasswordError(validation);
                            }
                            else {
                                setPasswordError('');
                            }
                        }}
                        placeholder="كلمة المرور الجديدة"
                        className={classes.settingsinput}
                    />
                    {<img className="absolute left-2 top-1.5 p-1 w-9 h-9"
                        src={`${showpassword ? '/assets/icons/showandhidepass/hide.png' : '/assets/icons/showandhidepass/eye (1).png'}`}
                        onClick={() => { setShowPassword(prev => !prev) }} />}
                </div>

                {passwordError && (
                    <p className={classes.error}>
                        {passwordError}
                    </p>
                )}


                <div className={classes.passwordwrapper}>
                    <input
                        type={showpassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="تأكيد كلمة المرور الجديدة"
                        className={classes.settingsinput}
                    />
                    {<img className="absolute left-2 top-1.5 p-1 w-9 h-9"
                        src={`${showpassword ? '/assets/icons/showandhidepass/hide.png' : '/assets/icons/showandhidepass/eye (1).png'}`}
                        onClick={() => { setShowPassword(prev => !prev) }} />}
                </div>
                {!passwordMatch && (
                    <p className={classes.error}>كلمة المرور غير متطابقة.</p>
                )}

                <button
                    className={classes.settingsbutton}
                    onClick={handlePasswordUpdate}
                    disabled={Loading}
                >
                    {Loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                </button>
            </div>


            <div className={classes.settingsection}>
                <h3>إعدادات الخصوصية</h3>
                <label className={classes.checkboxcontainer}>
                    <input id="hide-phone" type="checkbox" checked={privacy.hidePhone} onChange={(e) => setPrivacy({ ...privacy, hidePhone: e.target.checked })} /> إخفاء رقم الهاتف عن الزوار
                </label>

                <label className={classes.checkboxcontainer}>
                    <input id="hide-email" type="checkbox" checked={privacy.hideEmail} onChange={(e) => setPrivacy({ ...privacy, hideEmail: e.target.checked })} /> إخفاء البريد الالكتروني عن الزوار
                </label>
                <label className={classes.checkboxcontainer}>
                    <input id="hide-full-name" type="checkbox" checked={privacy.hideFirstAndLast} onChange={(e) => setPrivacy({ ...privacy, hideFirstAndLast: e.target.checked })} /> إخفاء الاسم الكامل عن الزوار
                </label>
                <button className={classes.settingsbutton} onClick={handlePrivacySettingsSave}>حفظ إعدادات الخصوصية</button>
            </div>


            <div className={classes.settingsection}>
                <h3>تسجيل الخروج</h3>
                <p className={classes.logouttext}>انقر على الزر أدناه لتسجيل الخروج من حسابك.</p>
                <button className={classes.logoutbutton} onClick={handleLogout}>تسجيل الخروج</button>
            </div>


            <div className={`${classes.settingsection} ${classes.deletesection}`}>
                <h3>حذف الحساب</h3>
                <p className={classes.warningtext}>⚠️ هذا الإجراء لا يمكن التراجع عنه. سيتم حذف حسابك وجميع بياناتك نهائيًا.</p>
                <button className={classes.deletebutton} onClick={() => setShowConfirmDelete(true)}>حذف الحساب</button>
            </div>


            {showConfirmDelete && (
                <div className={classes.confirmoverlay}>
                    <div className={classes.confirmmodal}>
                        <p>هل أنت متأكد أنك تريد حذف حسابك؟</p>
                        <div className={classes.confirmbuttons}>
                            <button className={classes.cancelbtn} onClick={() => setShowConfirmDelete(false)}>إلغاء</button>
                            <button className={classes.confirmdeletebtn} onClick={handleDeleteAccount}>نعم، احذف الحساب</button>
                        </div>
                    </div>
                </div>
            )}
            {Loading && (
                <div className={classes.overlay}>
                    <div className={classes.spinner}></div>
                    <p>جار التحميل...</p>
                </div>
            )}
            {notifystate.active && <Confirm Confirmkey={notifystate.key} />}
        </div>
    );
};

export default AccountSettings;
