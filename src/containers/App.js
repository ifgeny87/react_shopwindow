import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pageActions from '../actions/pageActions';
import Navigator from '../components/Navigator';
import ShopWindow from '../components/ShopWindow';
import Cart from '../components/Cart';

class App extends Component {
    render() {
        return <div>
            <Navigator/>
            <section>
            	{this.props.children}
            </section>
        </div>
    }
}

App.ShopWindow = ShopWindow;
App.Cart = Cart;

export default App;