import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pageActions from '../actions/pageActions';
import ShopItem from './ShopItem';

class ShopWindow extends Component {
	render() {
    	const {cat_id} = this.props.params;
    	
    	if(!cat_id)
    		return <div>
    			Выберите категорию
    		</div>;

		const {shop_items} = this.props;

    	if(shop_items.fetching || !shop_items.cats.length)
    		return <span>...</span>;

    	let cat = shop_items.cats.find(c => c.id == cat_id);

    	if(!cat)
    		return <span>Нет такой категории</span>;

    	if(!cat.items.length)
    		return <span>В категории нет товаров</span>;

    	return <div>
            <h1>Категория: {cat.name}</h1>
            {cat.items.map((item, index) =>
            	<ShopItem key={index} item={item} addToCart={this.props.pageActions.addToCart}/>
        	)}
        </div>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    };
}

export default connect(state => state, mapDispatchToProps)(ShopWindow);