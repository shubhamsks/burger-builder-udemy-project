import  React ,{Component} from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import{connect } from 'react-redux';
class Checkout extends Component {
    componentDidMount(){

    }

    checkoutCancel = ()=>{
        this.props.history.goBack();
    };
    checkoutContinue=()=>{
        this.props.history.replace('/checkout/contact-data')
    };


    render() {
        let summary = <Redirect to='/'/>;

        if(this.props.ings){
            const purchasedRedirect = this.props.purchased? <Redirect to='/'/>:null;
            summary = (
                
            <div style={{width:'100%'}}>
                {purchasedRedirect}
            <CheckoutSummary
                ingredients = {this.props.ings}
                checkoutCancelled = {this.checkoutCancel}
                checkoutContinued={this.checkoutContinue}/>
            <Route path ={this.props.match.path+'/contact-data'}
            component={ContactData} />
            </div>
            );
        }

        return (
            <>
             {summary} 
             </>
        );
    }
}

const mapStateToProps = state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);