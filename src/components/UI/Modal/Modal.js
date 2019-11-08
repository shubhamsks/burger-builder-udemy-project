import React,{Component } from "react";
import styles from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary";
import BackDrop from '../BackDrop/BackDrop';
class Modal extends Component{
	shouldComponentUpdate(nextProps, _nextState){
		if(nextProps.show !== this.props.show || nextProps.children !== this.props.children){
			return true;
		}
		return false;
	}
	render(){
		return (
			<Aux>
			<BackDrop show = {this.props.show} clicked = {this.props.modalClosed}/>
			<div
				className={styles.Modal}
				style={{
					transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
					opacity: this.props.show ? "1" : "0"
				}}
			>
				{this.props.children}
			</div>
			</Aux>
		);
	}
};

export default Modal;
