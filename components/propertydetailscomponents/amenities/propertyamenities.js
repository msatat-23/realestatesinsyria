import classes from './amenities.module.css';



const PropertyAmenities = ({ amenities }) => {


    return (<div className={classes.container}>
        <h1 className={classes.header}>مميزات العقار</h1>
        <table className={classes.table}>
            <tbody>
                {amenities.map((amenity) => <tr><td>{amenity.amenity}</td><td>{amenity.description}</td></tr>)}

            </tbody>
        </table></div>)
}

export default PropertyAmenities;