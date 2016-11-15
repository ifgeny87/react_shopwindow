/*
import {GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS} from '../constants/Page';

const initialState = {
    year: 2016,
    photos: [],
    fetching: false
};

export default function page(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_REQUEST:
            // стейт нельзя модифицировать
            // отправим новый стейт
            return {...state, year: action.payload, fetching: true};

        case GET_PHOTOS_SUCCESS:
            return {...state, photos: action.payload, fetching: false};

        default:
            // если стейт не меняется, отправим старый
            return state;
    }
}
*/