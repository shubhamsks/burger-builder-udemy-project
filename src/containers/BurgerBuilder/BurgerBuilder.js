import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummar/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
	salad: 10,
	cheese: 20,
	meat: 50,
	bacon: 5
};
class BurgerBuilder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: null,
			totalPrice: 30,
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
	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
		console.log(this.state.purchasing);
	};
	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	};
	purchasingHandler = () => {
		let cpurchasing = !this.state.purchasing;
		this.setState({
			purchasing: cpurchasing
		});
		console.log(this.state.purchasing);
	};
	purchasingContinueHandler = () => {

		const queryParams = [];
		for(let i in this.state.ingredients){
			queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price='+this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname:'/checkout',
			search:'?'+ queryString,
		});
	};
	componentDidMount() {
		console.log('component did mount');
		axios.get("https://react-my-burger-1d6be.firebaseio.com/ingredients.json")
			.then(response => {
				let updatedIngredients = response.data;
				this.setState({
					ingredients: updatedIngredients,
				});
			})
			.catch(error=>{
				this.setState({error:true});
			})
			;
	}

	render() {
		const disableInfo = {
			...this.state.ingredients
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
		}
		let orderSummary = null;
		let burger = this.state.error?<p>Ingredients cannot be loaded something went wrong!</p>: <Spinner />;
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						purchasable={this.state.purchasable}
						totalPrice={this.state.totalPrice}
						disableInfo={disableInfo}
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						ordered={this.purchasingHandler}
					/>
				</Aux>
			);
			orderSummary =  (
				<OrderSummary
					pruchasContinueHandler={this.purchasingContinueHandler}
					price={this.state.totalPrice}
					purchasCancelHandler={this.purchasingHandler}
					ingredeints={this.state.ingredients}
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
export default withErrorHandler(BurgerBuilder, axios);
