import classes from './bigbutton.module.css';


const Bigbutton = (props) => {



    return (<button className={classes.button}>{props.buttontext}</button>)
}

export default Bigbutton;