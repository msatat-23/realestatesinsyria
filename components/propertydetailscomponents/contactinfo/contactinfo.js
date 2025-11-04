import classes from './contactinfo.module.css';


const ContactInfo = ({ contactInfo }) => {
    const contactinfo = contactInfo;

    return (<div className={classes.container}><h1>معلومات التواصل :</h1>
        <p>{contactInfo}</p></div>)
}

export default ContactInfo;