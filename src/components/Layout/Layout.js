import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component{
	state = {
		showSideDrawer:false,
	}
	sideDrawerClosedHandler = ()=>{
		
		this.setState({
			showSideDrawer:false,
		});
	}
	sideDrawerToggleHandler = ()=>{
		const updatedShowSideDrawer = !this.state.showSideDrawer;
		this.setState({
			showSideDrawer:updatedShowSideDrawer,
		});
	}
	render(){
		return (
			<Aux>
				<Toolbar 
				isAuth ={this.props.isAuth}
				drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer 
				isAuth ={this.props.isAuth}
				open = {this.state.showSideDrawer}
				closed = {this.sideDrawerClosedHandler}/>
			<main className={styles['Content']}>
				{this.props.children}
			</main>
			</Aux>
		);
	}
}
const mapStateToProps = (state)=>{
	return{
		isAuth:state.auth.token!==null,
	}
}

export default connect(mapStateToProps)(Layout);
