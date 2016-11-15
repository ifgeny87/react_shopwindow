import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

function textByCount(count) {
    if(Math.floor(count % 100 / 10) == 1)
        return 'товаров';

    switch(count % 10) {
        case 1:
            return 'товар';

        case 2:
        case 3:
        case 4:
            return 'товара';

        default:
            return 'товаров';
    }
}

class Navigator extends Component {
    render() {
    	const {shop_items, shop_cart} = this.props;
    	const cart_count = !shop_cart.count ? 'пусто'
            : shop_cart.count + ' ' + textByCount(shop_cart.count);
    	
    	return <nav>
            <Link to="/" className="logo">Logo</Link>

        	{/* Категории */}
            {shop_items.cats.length ? shop_items.cats.map((v, index) =>
            	<Link to={`/cat/${v.id}`} key={index} className="cat-link">{v.name}</Link>
            ) : '...'}

        	{/* Корзина */}
        	<Link to="/cart" className="cart-link">{`В корзине ${cart_count}`}</Link>
        </nav>
    }
}

export default connect(state => state)(Navigator);