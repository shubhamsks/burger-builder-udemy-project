import  React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import  Spinner from '../../../components/UI/Spinner/Spinner'
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
class ContactData extends React.Component{
    createInputElementJson = (elementType,inputType='text',placeholder)=>{

        let inputElement =null;
        switch (elementType) {
            case ('input'):
                inputElement={
                    elementType:elementType,
                    elementConfig : {
                        type: inputType,
                        placeholder:placeholder,
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:20,
                    },
                    valid:false,
                    touched:false,
                };
                break;
            default:
                inputElement ={
                    elementType:elementType,
                    elementConfig : {
                        type: inputType,
                        placeholder:placeholder,
                    },
                    value:'',
                };
                break;
        }
        return inputElement;
    };
    state={
            orderForm: {
                name: this.createInputElementJson('input', 'text', 'Your name'),
                street: this.createInputElementJson('input', 'text', 'Street address'),
                zipcode: this.createInputElementJson('input', 'text', 'ZIP CODE'),
                country: this.createInputElementJson('input', 'text', 'Country'),
                email: this.createInputElementJson('input', 'email', 'Your email'),
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: 'fastest',
                    valid: true,
                    validation:{
                        required: false,

                    }
                },
            },
            formIsValid:false,
    };
    orderHandler =(event)=>{
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
        	ingredients: this.props.ings,
        	price: this.props.price,
            order:formData,
            userId:this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
        
    };
    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;

    }
    inputChangedHandler =(event, inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement  = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let identifier in updatedOrderForm){
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
    };
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement=>{
                    return (
                        <Input
                            invalid = {!formElement.config.valid}
                            elementtype = {formElement.config.elementType}
                            elementconfig={formElement.config.elementConfig}
                            key = {formElement.id}
                            shouldValidate={formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed = {(event)=>this.inputChangedHandler(event, formElement.id)}
                            />);
                        })}
                <Button
                    disabled ={!this.state.formIsValid}
                    btnType="Success"
                    >ORDER</Button>
        </form>);
        if(this.props.loading){
            form =<Spinner/>;
        }
        return(
            <div className={classes.Contactdata}>
                <h4>
                    Enter Your contact data
                </h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToprops = (dispatch) => {
    return{
        onOrderBurger:(orderData, token)=>dispatch(actionCreators.purchaseBurger(orderData, token)),
    };
}
export default connect(mapStateToProps, mapDispatchToprops)(withErrorHandler(ContactData, axios));