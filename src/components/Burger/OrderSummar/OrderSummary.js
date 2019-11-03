import React, { Component } from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";
class Ordersummary extends Component {
    componentDidUpdate(){
        console.log('OrderSummary update');
    }
	render() {
		const ingredientSummary = Object.keys(this.props.ingredeints).map(igKey => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: "captalize" }}>{igKey}</span>:{" "}
					{this.props.ingredeints[igKey]}
				</li>
			);
		});

		return (
			<Aux>
				<h3>Your order summary </h3>
				<p> A delicious burger with following ingredients</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total price : {this.props.price}</strong>
				</p>
				<p>Continue to checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchasCancelHandler}>
					CANCEL
				</Button>
				<Button btnType="Success" clicked={this.props.pruchasContinueHandler}>
					CONTINUE
				</Button>
			</Aux>
		);
	}
}
export default Ordersummary;
