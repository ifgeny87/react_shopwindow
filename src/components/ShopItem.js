import React, {Component, PropTypes} from 'react';

export default class ShopItem extends Component {
    onPutInCart(e) {
        this.props.addToCart(this.props.item.id);
    }

	render() {
        const item = this.props.item;

    	return <div className="shop-item">
            <img src=""/>
            <h3>{item.name}</h3>
            <div style={{float: 'right'}}>
                <button onClick={::this.onPutInCart}>В корзину</button>
            </div>
            <div>
                {item.price} руб.
            </div>
        </div>;
    }
}

ShopItem.propTypes = {
    addToCart: PropTypes.func.isRequired
};