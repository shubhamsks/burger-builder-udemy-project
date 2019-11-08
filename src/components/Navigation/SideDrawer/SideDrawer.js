import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxiliary';
const sideDrawer = props =>{
    let attachedClasses = [styles.SideDrawer, styles.Close];
    if(props.open){
        attachedClasses = [styles.SideDrawer, styles.Open];
    }

    return (
        <Aux>
        <Backdrop show = {props.open} clicked = {props.closed}/>
        <div className = {attachedClasses.join(' ')} onClick={props.closed}>
            <Logo height = '11%'/>
            <nav>
                <NavigationItems isAuthenticated = {props.isAuth}/>
            </nav>
        </div>
        </Aux>
    );
}
export default sideDrawer;
