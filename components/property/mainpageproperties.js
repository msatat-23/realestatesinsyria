"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import Property from "./property";
import classes from "./mainpageproperties.module.css";
import axios from "axios";

const Mainpageproperties = ({ properties }) => {
    const [exclusiveProperties, setExclusiveProperties] = useState([]);
    const [specialProperties, setSpecialProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef(null);



    useEffect(() => {
        setExclusiveProperties(properties.exclusive);
        setSpecialProperties(properties.special)
    }, [])


    return (
        <Fragment>
            <div className={classes.group}>
                {exclusiveProperties.map((property) => (
                    <Property
                        key={property.id}
                        url={property.image || "/assets/pics/propertydumpic/ChatGPT Image Apr 28, 2025, 04_25_50 PM.png"}
                        {...property}
                    />
                ))}
            </div>

            <div className={classes.group}>
                {specialProperties.map((property) => (
                    <Property
                        key={property.id}
                        url={property.image || "/assets/pics/propertydumpic/ChatGPT Image Apr 28, 2025, 04_25_50 PM.png"}
                        {...property}
                    />
                ))}
            </div>
            {loading && <div className={classes.overlay}>
                <div className={classes.spinner}></div>
                <p>جار التحميل...</p>
            </div>}
        </Fragment>
    );
};

export default Mainpageproperties;
