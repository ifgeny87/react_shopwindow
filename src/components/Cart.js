import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pageActions from '../actions/pageActions';
import ShopItem from './ShopItem';

class Cart extends Component {
	constructor(props) {
		super(props);
		// конструктор устанавливает state
		this.state = this.resetCube(props);
	}

	// когда контрол замаунтен, стейт надо менять через setState
	componentWillReceiveProps(props) {
		this.setState(this.resetCube(props));
	}

	// метод собирает куб для работы с корзиной
	resetCube(props) {
		const {shop_cart, shop_items} = props;

		if(!shop_items.cats.length) {
			return {};
		}

		// массив товаров с количеством в корзине
		let cube = {};
		let all_count = 0;
		let all_sum = 0;
		shop_cart.items.map(cart_i => {
			let item = shop_items.items[cart_i.id];
			if(!item) return;
			// товар найден, заведу запись [{cat_id: {...item, count: N, sum: N}}]
			if(!(item.cat_id in cube)) {
				// создаю новую категорию для корзины если ее еще нет
				let cat = shop_items.cats.find(cat => cat.id == item.cat_id);
				cube[item.cat_id] = {name: cat.name, items: []};
			}

			let sum = item.price * cart_i.count;
			all_sum += sum;
			all_count += cart_i.count;

			cube[item.cat_id].items.push({
				...item,
				count: cart_i.count,
				sum: sum
			})
		});
		
		return {cube: shop_cart.items.length ? cube : null, all_count, all_sum};
	}

	onChangeCount(e) {
		let value = +e.target.value;
		if(isNaN(value) || value < 0)
			return;
			
		this.props.pageActions.editCartItem(e.target.dataset.id, value);
	}

	onRemoveClick(e) {
		this.props.pageActions.removeCartItem(e.target.dataset.id);
	}

	onClearCart(e) {
		this.props.pageActions.clearCart();
	}

	onFormSubmit(e) {
		e.preventDefault(); // чтобы реально форма не ушла куда-нибудь

		this.props.pageActions.submitCartForm(() => alert('Заказ пошел пошел пошел'));
	}

	render() {
    	const {shop_cart, shop_items} = this.props;

    	console.log(shop_cart);

    	if(!this.state || !this.state.cube)
    		return <div>
    			<h3>Тут пусто</h3>
    			<p>Выберите категорию и наполните корзину</p>
    		</div>;

    	let nodes = [];

    	for(let index in this.state.cube) {
    		let cat = this.state.cube[index];
    		if(cat.items.length) {
    			nodes.push(<div key={index}>
	        		<h2>Категория: {cat.name}</h2>
	        		<table className="shop-cart-item">
	        		<tbody>
	        		{cat.items.map((item, index) => <tr key={index}>
	        			<td><img src=""/></td>
	        			<td>{item.name}</td>
	        			<td>{item.price} руб.</td>
	        			<td><input type="number" defaultValue={item.count} onChange={::this.onChangeCount} data-id={item.id}/></td>
	        			<td>{item.sum} руб.</td>
	        			<td><button onClick={::this.onRemoveClick} data-id={item.id}>Убрать</button></td>
	    			</tr>)}
	    			</tbody>
	        		</table>
	        	</div>);
        	}
    	}

    	return <div className="shop-cart">
        	<h1 id="h1">Оформление заказа</h1>
        	
        	{nodes}

        	<table className="shop-cart-result">
        	<tbody>
        		<tr>
        		<td>
        			Всего товаров: {this.state.all_count} шт.
        		</td>
        		<td>
        			Сумма всего: {this.state.all_sum} руб.
        		</td>
        		</tr>
    		</tbody>
        	</table>

        	<button onClick={::this.onClearCart}>Очистить корзину</button>

        	<div className="shop-cart-offer">
	        	<form onSubmit={::this.onFormSubmit}>
	        		<input type="text" name="name" placeholder="Ваше имя"/>
	        		<input type="text" name="email" placeholder="E-mail"/>
	        		<input type="text" name="phone" placeholder="Телефон"/>
	        		<input type="text" name="address" placeholder="Адрес доставки"/>
	        		<textarea name="comment" placeholder="Комментарий к заказу"></textarea>
	        		<input type="submit" value="Отправить заказ"/>
	        	</form>
	        </div>
        </div>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    };
}

export default connect(state => state, mapDispatchToProps)(Cart);