import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import shop_items from './shop-items';
import shop_cart from './shop-cart';

export default combineReducers({
    shop_items,
    shop_cart,
    routing: routerReducer
});