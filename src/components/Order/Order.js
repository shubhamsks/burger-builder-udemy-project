import  React from 'react';
import classes from './Order.module.css'
const order = (props)=> {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = ingredients.map((ig,index)=>{
        return <span
            style={{
                textTransform:'captalize',
                margin:'5px',
                display:'inline-block',
                border:'1px solid #ccc',
                padding:'5px',

            }}
            key={index}
            >
            {ig.name} {ig.amount}</span>;
    });
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong> INR {props.price}</strong></p>
        </div>
    );
};
export default order;