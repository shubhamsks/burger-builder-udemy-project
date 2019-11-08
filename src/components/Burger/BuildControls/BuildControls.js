import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControl = props => {
  return (
		<div className={styles["BuildControls"]}>
			<p>Current price <strong>{props.totalPrice}</strong></p>
			{
				controls.map((ctrl) => {
					return <BuildControl
						key = {ctrl.label+ctrl.type}
						label={ctrl.label}
						added={() => props.ingredientAdded(ctrl.type)}
						removed={() => props.ingredientRemoved(ctrl.type)}		
						disabled = {props.disableInfo[ctrl.type]}
					/>
				})
			}
			<button 
			onClick = {props.ordered}
			className={styles.OrderButton} 
			disabled={!props.purchasable}>{ props.isAuth?'ORDER NOW':'AUTHENTICATE TO ORDER'}</button>
		</div>
  );
};
export default buildControl;
