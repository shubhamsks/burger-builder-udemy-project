import  React from 'react';
import classes from './Input.module.css';
const input = (props)=>{
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter correct info</p>;
        // console.log(validationError)
        // console.log('here')
    }
    switch (props.elementtype) {
        case ('input'):
            inputElement = <input onChange={props.changed}
                                  className={inputClasses.join(' ')}
                                  {...props.elementconfig}/>;
            break;
        case ('textarea'):
            inputElement = <textarea onChange={props.changed}
                                     className={inputClasses.join(' ')}
                                     {...props.elementconfig}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    value = {props.value}
                >
                    {props.elementconfig.options.map(option=>(
                        <option
                            key={option.value}
                            value={option.value}>{option.displayValue}</option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementconfig}/>;
            break;
    }

    return(
        <div className={classes.Input}>
            {inputElement}
            {validationError}
        </div>
    );
};
export default input;