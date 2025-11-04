import { useEffect } from 'react';
import classes from './statistics.module.css';

const Statistics = ({ views, rating, numofraters, created_at }) => {
    const formmatedDate = created_at ? new Date(created_at).toLocaleDateString('en-GB',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-') : '';

    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    <th>
                        <div className={classes.headerItem}>
                            <img src='/assets/icons/stats_icons/eye.png' alt="views" />
                            <span>عدد المشاهدات</span>
                        </div>
                    </th>
                    <th>
                        <div className={classes.headerItem}>
                            <img src='/assets/icons/stats_icons/star.png' alt="rating" />
                            <span>تقييم العقار</span>
                        </div>
                    </th>
                    <th>
                        <div className={classes.headerItem}>
                            <img src='/assets/icons/stats_icons/stats.png' alt="raters" />
                            <span>عدد المقيمين</span>
                        </div>
                    </th>
                    <th>
                        <div className={classes.headerItem}>
                            <img src='/assets/icons/stats_icons/calendar (1).png' alt="date" />
                            <span>تاريخ النشر</span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="عدد المشاهدات">{views}</td>
                    <td data-label="تقييم العقار">{rating}</td>
                    <td data-label="عدد المقيمين">{numofraters}</td>
                    <td data-label="تاريخ النشر">{formmatedDate}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Statistics;
