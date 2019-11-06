import  React ,{Component} from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import{connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancel = ()=>{
        this.props.history.goBack();
    };
    checkoutContinue=()=>{
        this.props.history.replace('/checkout/contact-data')
    };


    render() {
        return (
            <div style={{width:'100%'}}>
                <CheckoutSummary
                    ingredients = {this.props.ings}
                    checkoutCancelled = {this.checkoutCancel}
                    checkoutContinued={this.checkoutContinue}/>
                    <Route path ={this.props.match.path+'/contact-data'}
                    component={ContactData}
                    />
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        ings:state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);