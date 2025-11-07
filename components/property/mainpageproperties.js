"use client";
import { Fragment } from "react";
import Property from "./property";
import classes from "./mainpageproperties.module.css";


const Mainpageproperties = ({ properties }) => {




    return (
        <Fragment>
            <div className={classes.group}>
                {properties.exclusive.map((property) => (
                    <Property
                        key={property.id}
                        {...property}
                    />
                ))}
            </div>

            <div className={classes.group}>
                {properties.special.map((property) => (
                    <Property
                        key={property.id}
                        {...property}
                    />
                ))}
            </div>
            {/* {loading && <div className={classes.overlay}>
                <div className={classes.spinner}></div>
                <p>جار التحميل...</p>
            </div>} */}
        </Fragment>
    );
};

export default Mainpageproperties;
