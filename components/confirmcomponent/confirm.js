import classes from './confirm.module.css';
import { useDispatch } from 'react-redux';
import { reset } from '@/store/notifySlice';
const Confirm = ({ Confirmkey }) => {

    const options = [
        { key: 'changepass', text: ' تم تغيير كلمة المرور بنجاح ✅' },
        { key: 'signup', text: '✅ تم إنشاء حسابك بنجاح' },
        { key: 'login', text: 'تم تسجيل الدخول بنجاح ✅' },
        { key: 'logout', text: 'تم تسجيل الخروج بنجاح ✅' },
        { key: 'addproperty', text: 'عقارك قيد المراجعة وسيتم ارسال رسالة الى بريدك الالكتروني عند انتهاء المراجعة ✅' },
        { key: 'failedaddproperty', text: 'فشل إضافة العقار ❌ يرجى إعادة المحاولة' },
        { key: 'pay', text: '✅ تم الدفع بنجاح' },
        { key: 'complain', text: '✅ تم ارسال الشكوى بنجاح' },
        { key: 'addtofav', text: 'تمت إضافة هذا العقار إلى المفضلة ✅' },
        { key: 'failedtofav', text: 'فشل إضافة هذا العقار إلى المفضلة ❌' },
        { key: 'deletesuccessproperty', text: 'تم حذف عقارك بنجاح ✅' },
        { key: 'updatesuccess', text: 'تم تعديل عقارك بنجاح ✅' },
        { key: 'updatefail', text: 'فشل في تعديل عقارك ❌' },
        { key: 'deletefailproperty', text: 'فشل في حذف العقار ❌' },
        { key: 'deletefromfav', text: 'تم إزالة العقار من المفضلة ✅' },
        { key: 'deletefailfromfav', text: 'فشل في إزالة العقار من المفضلة ❌' },
        { key: 'successupdateprofile', text: 'تم تحديث الملف الشخصي بنجاح ✅' },
        { key: 'failedupdateprofile', text: 'فشل في تحديث الملف الشخصي يرجى المحاولة لاحقا ❌' },
        { key: 'successpasschange', text: 'تم تغيير كلمة المرور بنجاح ✅' },
        { key: 'failpasschange', text: 'فشل في تغيير كلمة المرور ❌ يرجى المحاولة لاحقا' },
        { key: 'pleaselogin', text: 'يرجى تسجيل الدخول أولا' }

    ];
    const option = options.find((option) => option.key === Confirmkey);
    const dispatch = useDispatch();
    return (<div className={classes.container}>
        <p className={classes.p}>{option ? option.text : ''}</p>
        <button className={classes.btn} onClick={() => { dispatch(reset()) }}>حسنا</button>
    </div>);
}
export default Confirm;