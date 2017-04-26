import { createAction } from 'redux-actions';

export const LOAD_DEFAULT = 'LOAD_DEFAULT';
export const LOAD_DEFAULT_SUCCESS = 'LOAD_DEFAULT_SUCCESS';
export const CALC_PRICE = 'CALC_PRICE';
export const CALC_PRICE_SUCCESS = 'CALC_PRICE_SUCCESS';
export const CHECKOUT_PRODUCTS = 'CHECKOUT_PRODUCTS'
export const CHECKOUT_PRODUCTS_SUCCESS = 'CHECKOUT_PRODUCTS_SUCCESS'

export default function reducer(state = {products: [], customers: [], cart: null}, action) {
    switch (action.type) {
        case LOAD_DEFAULT_SUCCESS:
            return {
            ...state,
                products: action.payload.products.response,
                customers: action.payload.customers.response
            };
        case CALC_PRICE_SUCCESS:
            return {
            ...state,
                cart: action.payload
            }; 
        default:
            return state;
    }
}

export const loadDefault = createAction(LOAD_DEFAULT);
export const calcPrice = createAction(CALC_PRICE);
export const checkoutProducts = createAction(CHECKOUT_PRODUCTS);

