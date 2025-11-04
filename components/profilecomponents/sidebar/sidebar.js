
import classes from './sidebar.module.css';
import { useState } from 'react';
const SideBar = ({ onchange, activeSection }) => {
    const sections = [
        { key: 'info', label: 'معلومات الحساب' },
        { key: 'myproperties', label: 'عقاراتي' },
        { key: 'savedproperties', label: 'العقارات المحفوظة' },
        { key: 'sub', label: 'اشترك وأصبح عضو مميز' },
        { key: 'settings', label: 'إعدادات الحساب' },
    ];
    const [hide, sethide] = useState(false);

    return (
        <div className={`${classes.sidebar} ${hide ? classes.hide : ''}`}>
            <img src='/assets/icons/exit/no.png' className={`${classes.exit} ${hide ? classes.hideelement : ''}`} onClick={() => { sethide(true) }} />
            <ul className={hide ? classes.hideelement : ''}>
                {sections.map((section) => (
                    <li
                        key={section.key}
                        className={activeSection === section.key ? classes.active : ''}
                        onClick={() => onchange(section.key)}
                    >
                        {section.label}
                    </li>
                ))}
            </ul>
            <img src='/assets/icons/left_arrow/left-chevron.png' className={`${classes.arrow} ${!hide ? classes.hideelement : ''}`} onClick={() => { sethide(false) }} />
        </div>
    );
};

export default SideBar;
