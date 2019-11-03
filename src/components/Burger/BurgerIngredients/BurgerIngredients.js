import React, { Component } from "react";
import styles from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
class BurgerIngredients extends Component {
  render() {
    let indgredient = null;
    switch (this.props.type) {
      case "bread-bottom":
        indgredient = <div className={styles["BreadBottom"]}></div>;
        break;
      case "bread-top":
        indgredient = (
          <div className={styles["BreadTop"]}>
            <div className={styles["Seeds1"]}></div>
            <div className={styles["Seeds2"]}></div>
          </div>
        );
        break;
      case "meat":
        indgredient = <div className={styles["Meat"]}></div>;
        break;
      case "cheese":
        indgredient = <div className={styles["Cheese"]}></div>;
        break;
      case "salad":
        indgredient = <div className={styles["Salad"]}></div>;
        break;
      case "bacon":
        indgredient = <div className={styles["Bacon"]}></div>;
        break;
      default:
        indgredient = null;
    }
    return indgredient;
  }
}
BurgerIngredients.propTypes = {
	type:PropTypes.string.isRequired,
};

export default BurgerIngredients;
