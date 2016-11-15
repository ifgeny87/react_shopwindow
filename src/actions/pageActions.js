import * as _const from '../constants/actions';

export function getShopItems(cat_id) {
    return(dispatch) => {
        // сообщаем о том, что запрос отправлен
        dispatch({
            type: _const.GET_CAT_ITEMS_REQUEST,
            payload: cat_id
        });

        setTimeout(() => {
            // категории
            let cats = [{
                id: 101,
                name: 'Холодильники',
                type: 'Холодильник'
            }, {
                id: 102,
                name: 'Мультиварки',
                type: 'Мультиварка'
            }, {
                id: 103,
                name: 'Телевизоры',
                type: 'Телевизор'
            }, {
                id: 104,
                name: 'Фены',
                type: 'Фен'
            }];
            
            // для каждой категории формирую список товаров
            let items = [];
            cats.map(cat => {
                cat.items = [];

                let count  = (cat.id % 100) * 4;

                for(let i = 1; i < count; i++) {
                    let item = {
                        id: cat.id + '_' + i,
                        cat_id: cat.id,
                        name: `${cat.type} ${i}`,
                        price: (cat.id + i) * 10
                    };
                    // товар запоминается как в отдельный массив, так и в массив категории
                    items[item.id] = item;
                    cat.items.push(item);
                }
            });

            // типа пришел ответ
            dispatch({
                type: _const.GET_CAT_ITEMS_SUCCESS,
                payload: {cats, items}
            });
        }, 100)

    }
}

export function addToCart(item_id, cb) {
    return(dispatch) => {
        dispatch({
            type: _const.ADD_ITEM_TO_CART,
            payload: item_id
        });

        if(cb) cb();
    }
}

export function editCartItem(item_id, count) {
    return(dispatch) => {
        dispatch({
            type: _const.EDIT_CART_ITEM,
            payload: {item_id, count}
        });
    }
}

export function removeCartItem(item_id, cb) {
    return(dispatch) => {
        dispatch({
            type: _const.REMOVE_CART_ITEM,
            payload: item_id
        });
    }
}

export function clearCart() {
    return(dispatch) => {
        dispatch({
            type: _const.CLEAR_CART
        });
    }
}

export function submitCartForm() {
    return(dispatch) => {
        dispatch({
            type: _const.SUBMIT_CART_FORM
        });
    }
}