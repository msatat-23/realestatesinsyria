'use client'
import classes from './page.module.css';
import { Fragment, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { Readex_Pro } from 'next/font/google';


const Readex_Pro_Font = Readex_Pro({ subsets: ['arabic'], weight: '400' });
const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'استفسار',
        message: '',
        code: ''
    });
    const [showsuccess, setshowsuccess] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlesuccess = () => {
        setshowsuccess(true);
        setTimeout(() => setshowsuccess(false), 3000);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handlesuccess();
        setFormData({ name: '', email: '', type: 'استفسار', message: '', code: '' });
    };

    return (<Fragment>
        <div className={Readex_Pro_Font.className}>
            <Navbar mainpage={false} />
            <div className={`${classes.container} ${Readex_Pro_Font.className}`}>
                {showsuccess && <p className={classes.success}>تم الإرسال بنجاح سيتم إرسال رسالة بالرد إلى بريدك الالكتروني &#9989;</p>}
                <h1 className={classes.title}>اتصل بنا</h1>
                <p className={classes.description}>نحن في موقعنا العقاري نحرص على تقديم أفضل تجربة للمستخدم، سواء كنت تبحث عن عقار أحلامك أو تقوم بعرض عقارك للبيع أو الإيجار.

                    إن كانت لديك أي استفسارات، اقتراحات، أو واجهت أي مشكلة أثناء استخدام الموقع، فريق الدعم جاهز لسماعك ومساعدتك في أسرع وقت ممكن.

                    يرجى استخدام النموذج أدناه للتواصل معنا، أو اختيار قسم الشكاوى إذا كنت ترغب بالإبلاغ عن محتوى أو مشكلة محددة.</p>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="الاسم الكامل"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={classes.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={classes.input}
                    />
                    <select name="type" value={formData.type} onChange={handleChange} className={classes.select}>
                        <option value="استفسار">استفسار</option>
                        <option value="شكوى">شكوى</option>
                    </select>
                    <textarea
                        name="message"
                        placeholder="محتوى الرسالة"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={classes.textarea}
                    ></textarea>
                    {formData.type === 'شكوى' && <input type="text"
                        name="code"
                        placeholder="أدخل كود العقار إذا كانت الشكوى موجهة ضد عقار معين"
                        value={formData.code}
                        onChange={handleChange}
                        required
                        className={classes.input} />}

                    <button className={classes.button} type="submit">إرسال</button>
                </form>
            </div>
            <Footer />
        </div> </Fragment>
    );
}
export default ContactUs;