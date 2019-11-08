import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import Navbar from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolBar = props =>(
    <header className = {styles.Toolbar}>
        <DrawerToggle clicked = {props.drawerToggleClicked}/>
        <Logo height = '80%'/>
        <nav className = {styles.DesktopOnly}>
            <Navbar isAuthenticated = {props.isAuth}/>
        </nav>
    </header>
);
export default toolBar;