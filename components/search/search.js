"use client";

import { useState, useEffect } from 'react';
import classes from './search.module.css';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateField } from '@/store/advancedsearchSlice';
import Loading from '../loading/loading';
import { usePathname } from 'next/navigation';
const Search = () => {
    const [selected, setselected] = useState('بيع');
    const [searchText, setsearchText] = useState('');
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const path = usePathname();
    const dispatch = useDispatch();
    const reduxfilters = useSelector(state => state.advancedsearch);
    const SubmissionHandler = (e) => {
        e.preventDefault();
        router.push(`/search?q=${reduxfilters.q}&purpose=${reduxfilters.purpose}&minprice=${reduxfilters.min_price}&maxprice=${reduxfilters.max_price}&governorate=${reduxfilters.governorate.label}&city=${reduxfilters.city.label}&region=${reduxfilters.region.label}&type=${reduxfilters.property_type}&minarea=${reduxfilters.min_area}&maxarea=${reduxfilters.max_area}&minrooms=${reduxfilters.minroomsNum}&maxrooms=${reduxfilters.maxroomsNum}`);
        if (path === '/')
            setloading(true);
    };
    return (
        <div className={classes.search}>
            <div className={classes.options}>
                <span className={`${classes.choice} ${selected === 'بيع' ? classes.selected : ''}`} onClick={() => {
                    setselected("بيع");
                    dispatch(updateField({ field: 'property_status', value: "بيع" }));
                }}>بيع</span>
                <span className={`${classes.choice}  ${selected === 'آجار' ? classes.selected : ''}`} onClick={() => {
                    setselected("آجار");
                    dispatch(updateField({ field: 'property_status', value: "آجار" }));
                }}>آجار</span>
                <span className={`${classes.choice}  ${selected === 'رهن' ? classes.selected : ''}`} onClick={() => {
                    setselected("رهن");
                    dispatch(updateField({ field: 'property_status', value: "رهن" }));
                }}>رهن</span>
            </div>
            <div>
                <form onSubmit={SubmissionHandler}>
                    <input className={classes.input} type='search' placeholder='أدخل عنوان , مدينة , شارع , نوع عقار' value={reduxfilters.q || ''} onChange={(e) => {
                        setsearchText(e.target.value);
                        dispatch(updateField({ field: 'q', value: e.target.value }));
                    }} />
                    <button type='submit'><img className={classes.img} src='/assets/icons/searchicon/search.png' alt='searchicon' /></button>
                </form>
            </div>
            {
                loading && <Loading />
            }
        </div>
    )
}
export default Search;