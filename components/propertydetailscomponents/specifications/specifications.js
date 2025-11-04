import classes from './specifications.module.css';



const Specifications = ({ governorate, city, region, price, area, directions, roomsNumber, floor }) => {


    return (<div className={classes.container}>
        <h1 className={classes.header}>المواصفات</h1>
        <table className={classes.table}>
            <tbody>
                {governorate && <tr><td>المحافظة</td><td>{governorate}</td></tr>}
                {city && <tr><td>المدينة</td><td>{city}</td></tr>}
                {region && <tr><td>المنطقة</td><td>{region}</td></tr>}
                {price && <tr><td>السعر</td><td>{price}$</td></tr>}
                {area && <tr><td>المساحة</td><td>{area}m</td></tr>}
                {directions && <tr><td>الاتجاهات</td><td>{directions}</td></tr>}
                {roomsNumber && <tr><td>عدد الغرف</td><td>{roomsNumber}</td></tr>}
                {floor && floor !== '0' && <tr><td>الطابق</td><td>{floor}</td></tr>}
            </tbody>
        </table>
    </div>)
}
export default Specifications;