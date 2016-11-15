import * as _const from '../constants/actions';

const initialState = {
    cats: [],
    items: [],
    fetching: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        // начало запроса каталога
        case _const.GET_CAT_ITEMS_REQUEST:
            return {...state, fetching: true};

        // каталог загружен
        case _const.GET_CAT_ITEMS_SUCCESS:
            let {cats, items} = action.payload;
            return {...state, cats, items, fetching: false};

        default:
            return state;
    }
}