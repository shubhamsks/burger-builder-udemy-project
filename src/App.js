import React, { Component } from "react";
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import {Route,Switch, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth';

import {connect} from 'react-redux';
import * as actions from './store/actions/index'
class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
      <Route path = '/' exact component = {BurgerBuilder}/>
      <Route path='/auth' component={Auth}/>
      <Redirect to='/'/>
      </Switch>
    );
    if(this.props.isAuth){
      routes = (<Switch>
           <Route path = '/checkout' component = {Checkout}/>
            <Route path = '/orders' component = {Orders}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/logout' component={Logout}/>
            <Route path = '/' exact component = {BurgerBuilder}/>
            <Redirect to='/'/>
      </Switch>);
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>

      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    isAuth:state.auth.token !== null,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onTryAutoSignUp:()=>dispatch(actions.authCheckState()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
