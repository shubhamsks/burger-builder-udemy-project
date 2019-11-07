import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummar/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import {connect} from 'react-redux'
import * as  actionCreators from '../../store/actions/index';
class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasable: false,
			purchasing: false,
		};
	}
	updatePurchaseState = ingredients => {
		const keys = Object.keys(ingredients);

		let sum = 0;
		keys.forEach(element => {
			sum = sum + ingredients[element];
		});
		this.setState({ purchasable: sum > 0 });
	};
	purchasingHandler = () => {
		let cpurchasing = !this.state.purchasing;
		this.setState({
			purchasing: cpurchasing
		});
	};
	purchasingContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};
	componentDidMount() {
		console.log('component did mount');
		this.props.onInitIngredients();
	}

	render() {
		const disableInfo = {
			...this.props.ings
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.props.error?<p>Ingredients cannot be loaded something went wrong!</p>: <Spinner />;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						purchasable={this.props.purchasable}
						totalPrice={this.props.price}
						disableInfo={disableInfo}
						ingredientAdded={this.props.onIngredientAddedHandler}
						ingredientRemoved={this.props.onIngredientRemovedHandler}
						ordered={this.purchasingHandler}
					/>
				</Aux>
			);
			orderSummary =  (
				<OrderSummary
					pruchasContinueHandler={this.purchasingContinueHandler}
					price={this.props.price}
					purchasCancelHandler={this.purchasingHandler}
					ingredeints={this.props.ings}
				/>
			);
		}
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchasingHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state=>{
	return{
		ings:state.burgerBuilder.ingredients,
		price:state.burgerBuilder.totalPrice,
		purchasable:state.burgerBuilder.purchasable,
		error:state.burgerBuilder.error,
		
	}
}
const mapDispatchToProps=dispatch=>{
	return{
		onIngredientAddedHandler:(ingName)=> dispatch(actionCreators.addIngredient(ingName)),
		onIngredientRemovedHandler:(ingName)=> dispatch(actionCreators.removeIngredient(ingName)),
		onInitIngredients:()=> dispatch(actionCreators.initIngredients()),
		onInitPurchase:()=> dispatch(actionCreators.purchaseInit())
	}
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
