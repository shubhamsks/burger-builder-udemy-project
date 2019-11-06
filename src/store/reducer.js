import  * as actionTypes from './actions';
const INGREDIENT_PRICES = {
	salad: 10,
	cheese: 20,
	meat: 50,
	bacon: 5
};
const initialState = {
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0,
    },
    totalPrice:30,
    purchasable:false
}
const reducer =(state = initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] +1,
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                purchasable:true,
            };
        case actionTypes.REMOVE_INGREDIENT:
            let purchasable = false;
            let newState = {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1,
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
            if(newState.totalPrice > 30){
                purchasable=true;
            }
            return{
                ...newState,
                purchasable:purchasable,
            }
        default:
            return state;

    }
}
export default reducer;