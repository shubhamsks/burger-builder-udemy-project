import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummar/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions';
class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			purchasable: false,
			purchasing: false,
			loading: false,
			error:false,
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
		console.log(this.state.purchasing);
	};
	purchasingContinueHandler = () => {
		this.props.history.push('/checkout');
	};
	componentDidMount() {
		console.log('component did mount');
		// axios.get("https://react-my-burger-1d6be.firebaseio.com/ingredients.json")
		// 	.then(response => {
		// 		let updatedIngredients = response.data;
		// 		this.setState({
		// 			ingredients: updatedIngredients,
		// 		});
		// 	})
		// 	.catch(error=>{
		// 		this.setState({error:true});
		// 	})
		// 	;
	}

	render() {
		const disableInfo = {
			...this.props.ings
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.state.error?<p>Ingredients cannot be loaded something went wrong!</p>: <Spinner />;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						purchasable={this.props.purchasable}
						totalPrice={this.props.price}
						disableInfo={disableInfo}
						ingredientAdded={this.props.onIngredientAddedHandler}
						ingredientRemove	d={this.props.onIngredientRemovedHandler}
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
			if (this.state.loading) {
				orderSummary = <Spinner />;
			}

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
		ings:state.ingredients,
		price:state.totalPrice,
		purchasable:state.purchasable
	}
}
const mapDispatchToProps=dispatch=>{
	return{
		onIngredientAddedHandler:(ingName)=> dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
		onIngredientRemovedHandler:(ingName)=> dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName}),
	}
}
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
