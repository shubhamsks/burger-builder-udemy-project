import React  from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
class Auth extends React.Component{
    state={
        controls :{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:10,
                },
                valid:false,
                touched:false,
            }
        },
        isSignUp:true,
    }
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
    inputChangedHandler =(event, controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true,
            }
        };
        this.setState({controls:updatedControls});
    };
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    };
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignUp: !prevState.isSignUp};
        });

    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement =>(
            <Input
                invalid = {!formElement.config.valid}       
                elementtype = {formElement.config.elementType}
                elementconfig={formElement.config.elementConfig}
                key = {formElement.id}
                shouldValidate={formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event)=>this.inputChangedHandler(event, formElement.id)}
            />

        ));
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to = {this.props.authRedirectPath}/>
        }
        return(
            <div className = {classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SIGN {this.state.isSignUp?'UP':'IN'} </Button>
                </form>
                <Button
                clicked = {this.switchAuthModeHandler}
                 btnType="Danger">SWITCH TO {this.state.isSignUp? 'SIGNIN':'SIGNUP'} </Button>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token!== null,
        building:state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}
const  mapDispatchToProps =dispatch=>{
    return{
        onAuth:(email,password,isSignUp)=>dispatch(action.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(action.setAuthRedirect('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);