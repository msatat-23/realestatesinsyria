'use client'
import classes from './page.module.css';
import { Readex_Pro } from 'next/font/google';
import Navbar from '@/components/navbar/navbar';
import Search from '@/components/search/search';
import { useSearchParams } from 'next/navigation';
import SearchFilter from '@/components/searchfilter/searchfilter';
import { useSelector, useDispatch } from 'react-redux';
import { resetfields } from '@/store/advancedsearchSlice';
import { useState, useEffect } from 'react';
import Property from '@/components/property/property';
import Footer from '@/components/footer/footer';
import axios from 'axios';
import Confirm from '@/components/confirmcomponent/confirm';
import { setProperties } from '@/store/mainpagePropertiesSlice';
import { Suspense } from 'react'; 

const Readex_Pro_Font = Readex_Pro({ subsets: ['arabic'], weight: '400' });

const SearchResults = () => {
    return (
        <div className={`${classes.searchpage} ${Readex_Pro_Font.className}`}>
            <Navbar mainpage={false} />
            <Suspense fallback={
                <div className={classes.loadingFallback}>
                    <p>جارٍ تحميل نتائج البحث...</p>
                </div>
            }>
                <DynamicSearchContent />
            </Suspense>
            <Footer />
        </div>
    );
};

function DynamicSearchContent() {
    const [results, setresults] = useState([]);
    const [loading, setloading] = useState(false);
    const searchParams = useSearchParams(); 
    const searchText = searchParams.get('q');
    const searchStatus = searchParams.get('status');
    const reduxstate = useSelector(state => state.advancedsearch);
    const dispatch = useDispatch();
    const empty = Object.values(reduxstate).every(value => value === '');
    const notifystate = useSelector(state => state.notify);

    const fetchresults = async (params) => {
        const url = `http://localhost:8000/api/search`;
        try {
            setloading(true);
            const res = await axios.get(url, { params: params });
            const data = res.data.results;
            const formmated = data.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    status: item.status,
                    price: item.price,
                    area: item.space,
                    city: item.city_name,
                    region: item.region_name,
                    date: item.created_at,
                    sub_type: item.sub_type,
                    image: item.first_image
                }
            });
            const order = formmated.sort((a, b) => {
                const priority = { 'حصري': 1, 'مميز': 2 };
                const aPriority = priority[a.sub_type] || 3;
                const bPriority = priority[b.sub_type] || 3;
                return aPriority - bPriority;
            });
            setresults(order);
            dispatch(resetfields());
            setloading(false);
        } catch {
            console.log('خطأ في جلب نتائج البحث');
            setloading(false);
        }
    }

    const searchHandler = (q = searchText ? searchText : '', status = searchStatus ? searchStatus : '') => {
        const reduxparams = {
            min_price: reduxstate.min_price,
            max_price: reduxstate.max_price,
            governorate: reduxstate.governorate.label,
            city: reduxstate.city.label,
            region: reduxstate.region.label,
            property_type: reduxstate.property_type,
            property_status: reduxstate.property_status,
            min_area: reduxstate.min_area,
            max_area: reduxstate.max_area,
            minroomsNum: reduxstate.minroomsNum,
            maxroomsNum: reduxstate.maxroomsNum,
            floor: reduxstate.floor,
        };
        const params = { q, status, ...reduxparams };
        fetchresults(params);
    };

    const handleorder = (key) => {
        switch (key) {
            case 'priceasc':
                setresults([...results].sort((a, b) => +a.price - +b.price));
                break;
            case 'pricedesc':
                setresults([...results].sort((a, b) => +b.price - +a.price));
                break;
            case 'dateasc':
                setresults([...results].sort((a, b) => {
                    const dateA = new Date(a.date.split('/').reverse().join('/'));
                    const dateB = new Date(b.date.split('/').reverse().join('/'));
                    return dateA - dateB;
                }));
                break;
            case 'datedesc':
                setresults([...results].sort((a, b) => {
                    const dateA = new Date(a.date.split('/').reverse().join('/'));
                    const dateB = new Date(b.date.split('/').reverse().join('/'));
                    return dateB - dateA;
                }));
                break;
        }
    }

    useEffect(() => {
        if (searchText || searchStatus || !empty) {
            searchHandler(searchText, searchStatus);
        }
    }, [searchText, searchStatus, empty]);

    return (
        <>
            <Search value={searchText} search={searchHandler} selected={searchStatus} />
            <SearchFilter search={searchHandler} order={handleorder} />
            <div className={classes.results}>
                {results.map(property => (
                    <Property
                        key={property.id}
                        {...property}
                        url={property.image ? `${property.image}` : `/assets/pics/propertydumpic/ChatGPT Image Apr 28, 2025, 04_25_50 PM.png`}
                    />
                ))}
            </div>
            {loading && (
                <div className={classes.overlay}>
                    <div className={classes.spinner}></div>
                    <p>جار التحميل...</p>
                </div>
            )}
            {notifystate.active && <Confirm Confirmkey={notifystate.key} />}
        </>
    );
}

export default SearchResults;