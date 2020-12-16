import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
} from '../constants/productConstants';
import axios from 'axios';
import Axios from 'axios';

const listProducts = (searchKeyword = '', sortOrder = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        await axios.get("https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products.json")
            .then(res => {
                const data = res.data;
                let products = [];
                for (const key in data) {
                    products.push({
                        id: key,
                        name: data[key].name,
                        price: data[key].price,
                    });
                }
                dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
            });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
        const {userSignin: { userInfo }} = getState();
        if (!product._id) {
            const { data } = await Axios.post('/api/products', product, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        } else {
            const { data } = await Axios.put('/api/products/' + product._id, product, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
};

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get('https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products/' + productId + '.json');
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        const {userSignin: { userInfo }} = getState();
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
        const { data } = await axios.delete('/api/products/' + productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            },
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
};

export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProduct,
};