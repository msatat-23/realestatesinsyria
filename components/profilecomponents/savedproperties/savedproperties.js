'use client'
import classes from './savedproperties.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Property from '@/components/property/property';
import { setActive } from '@/store/notifySlice';
import Confirm from '@/components/confirmcomponent/confirm';
import { fetchSavedProperties } from '@/app/addproperty/[id]/get-data';
import { deleteSavedPropertyForUser } from '@/app/addproperty/[id]/delete-data';

const SavedProperties = () => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [savedproperties, setsavedproperties] = useState([]);
    const [id, setid] = useState('');
    const [Loading, setLoading] = useState(false);
    const userid = useSelector(state => state.user.id);
    const notifystate = useSelector(state => state.notify);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchsavedproperties = async () => {
            try {
                setLoading(true);
                const res = await fetchSavedProperties(userid);
                const data = JSON.parse(res);
                setsavedproperties(data);
                setLoading(false);
            } catch {
                console.log('خطأ في جلب العقارات المحفوظة');
                setLoading(false);
            }
        };
        fetchsavedproperties();
    }, []);
    const handleDeleteSavedP = async () => {
        setShowConfirmDelete(false);
        try {
            setLoading(true);
            const res = await deleteSavedPropertyForUser(userid, id);
            console.log(JSON.parse(res.data));
            if (res.ok) {
                setsavedproperties(prev => prev.filter(property => property.id != id));
                dispatch(setActive('deletefromfav'));
            }
            setLoading(false);
        } catch {
            console.log('فشل في إزالة العقار من المفضلة ');
            setLoading(false);
            dispatch(setActive('deletefailfromfav'));
        }
    };
    return (<div className={classes.savedproperties}>
        {savedproperties.length === 0 && <p className='font-bold mx-auto mt-8 text-3xl text-[#557B97]'>لايوجد عقارات محفوظة لديك.</p>}
        {savedproperties.map(property => <div key={property.id}><Property key={property.id} {...property} url={`${property.first_image}`} />
            <div className={classes.btns}>
                <button className={classes.btn} onClick={() => {
                    setShowConfirmDelete(true);
                    setid(property.id);
                }}>إزالة العقار من العقارات المحفوظة</button>
            </div></div>)}
        {showConfirmDelete && (
            <div className={classes.confirmoverlay}>
                <div className={classes.confirmmodal}>
                    <p>هل أنت متأكد أنك تريد إزالة هذا العقار من العقارات المحفوظة؟</p>
                    <div className={classes.confirmbuttons}>
                        <button className={classes.cancelbtn} onClick={() => setShowConfirmDelete(false)}>إلغاء</button>
                        <button className={classes.confirmdeletebtn} onClick={handleDeleteSavedP}>نعم، أزل العقار</button>
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
    </div>);
}
export default SavedProperties;