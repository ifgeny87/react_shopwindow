import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {render}  from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import App from './containers/App';
import * as pageActions from './actions/pageActions';
import './styles/app.less';

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={App.ShopWindow} />
				<Route path="cat/:cat_id" component={App.ShopWindow} />
				<Route path="cart" component={App.Cart} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
)

// загрузка категорий
store.dispatch(pageActions.getShopItems());