import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
const burger = props => {
	let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredients key={igKey + i} type={igKey} />
		});
	}).reduce((prev, curr) => {
		return prev.concat(curr);
	}, []);
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p> Please start adding ingredients</p>
	}
	return (
		<div className={styles['Burger']}>
			<BurgerIngredients type='bread-top' />
			{transformedIngredients}
			<BurgerIngredients type ='bread-bottom' />
		</div>
	);
};
export default burger;