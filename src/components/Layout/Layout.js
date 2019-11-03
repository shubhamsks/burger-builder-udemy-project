import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
	state = {
		showSideDrawer:false,
	}
	sideDrawerClosedHandler = ()=>{
		console.log('sk1');
		
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
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer 
				open = {this.state.showSideDrawer}
				closed = {this.sideDrawerClosedHandler}/>
			<main className={styles['Content']}>
				{this.props.children}
			</main>
			</Aux>
		);
	}
}
export default Layout;
