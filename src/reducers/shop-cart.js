import * as _const from '../constants/actions';

const initialState = {
    // TODO Clear this
    items: [{
        id: '101_1',
        count: 3
    }, {
        id: '101_2',
        count: 2
    }, {
        id: '102_1',
        count: 1
    }, {
        id: '103_2',
        count: 4
    }],
    count: 10
};

function sumCount() {
    return this.reduce((res, v) => res + v.count, 0)
}

export default function(state = initialState, action) {
    let items, item;
    switch (action.type) {
        // добавление товара в корзину
        case _const.ADD_ITEM_TO_CART:
            items = state.items.slice();
            // payload содержит id товара
            item = items.find(v => v.id == action.payload);
            if(item)
                item.count++;
            else
                items.push({id: action.payload, count: 1});
            return {...state, items, count: sumCount.call(items)};

        // удаление товара из корзины
        case _const.REMOVE_CART_ITEM:
            items = state.items.filter(v => v.id != action.payload);
            return {...state, items, count: sumCount.call(items)};

        // изменение количества в корзине
        case _const.EDIT_CART_ITEM:
            items = state.items.slice();
            item = items.find(v => v.id == action.payload.item_id);
            item.count = action.payload.count;
            // а в рузельтате items надо копировать
            return {...state, items, count: sumCount.call(items)};

        // очистка корзины
        case _const.CLEAR_CART:
            return {...state, items: [], count: 0};

        case _const.SUBMIT_CART_FORM:
            // FIXME просто оичстим корзину
            return {...state, items: [], count: 0};

        default:
            return state;
    }
}