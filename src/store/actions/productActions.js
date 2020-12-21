import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,
    PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST,
} from '../constants/productConstants';
import axios from 'axios';
import Axios from 'axios';


const listProducts = (searchKeyword = '', sortOrder = '') => async (dispatch) => {
    try {
        // let imageUrl = [];
        // await app.storage().ref().listAll().then((result) => {
        //     result.items.forEach(item => {
        //         item.getDownloadURL().then((url) => {

        //             imageUrl.push(url.toString())
        //         })
        //     })
        // });
        dispatch({ type: PRODUCT_LIST_REQUEST });
        await axios.get("https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products.json")
            .then(res => {
                const data = res.data;
                console.log("Res: " + res.data);
                let products = [];
                for (const key in data) {
                    if (data[key]) {
                        products.push({
                            id: key,
                            ...data[key]
                            // image: imageUrl.find(url => url.indexOf(data[key].image) > -1)
                        });
                    }
                }
                if (searchKeyword !== "") {
                    products = products.filter(product => product.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1);
                }
                if (sortOrder === "lowest") {
                    products.sort(function (a, b) {
                        return a.price - b.price;
                    });
                }
                else if (sortOrder === "highest") {
                    products.sort(function (a, b) {
                        return b.price - a.price;
                    });
                }
                console.log(products);
                dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
            });


        // dispatch({ type: PRODUCT_LIST_REQUEST });
        // await axios.get("https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products.json")
        //     .then(res => {
        //         const getProducts = async () => {
        //             const data = res.data;
        //             let products = [];
        //             for (const key in data) {
        //                 let imageUrl = "";
        //                 imageUrl = await getImageUrl(data[key].image).then((result) => {
        //                     console.log("Image url: " + result);
        //                     return result;
        //                 })
        //                 products.push({
        //                     id: key,
        //                     ...data[key],
        //                     image: imageUrl,
        //                 });
        //             }
        //             console.log(products);
        //             if (searchKeyword !== "") {
        //                 products = products.filter(product => product.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1);
        //             }
        //             if (sortOrder === "lowest") {
        //                 products.sort(function (a, b) {
        //                     return a.price - b.price;
        //                 });
        //             }
        //             else if (sortOrder === "highest") {
        //                 products.sort(function (a, b) {
        //                     return b.price - a.price;
        //                 });
        //             }
        //             dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
        //         }
        //         getProducts();
        //     });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

const saveProduct = (product, productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
        console.log(productId)
        if (!productId) {
            const data = await Axios.post("https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products.json", product);
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        } else {
            const data = await Axios.put("https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products/" + productId + ".json", product);
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
};

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        let data = [];
        await axios.get("https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products/" + productId + ".json")
            .then(res => {
                data = res.data;
                console.log(res.data);
                // const getProduct = async () => {
                //     const imageUrl = await getImageUrl(res.data.image).then((result) => {
                //         console.log("Image url: " + result);
                //         return result;
                //     })
                //     data = {
                //         ...res.data,
                //         image: imageUrl
                //     }
                //     console.log("Data: " + data);

                //     dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
                // }
                // getProduct();
            })
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
        const data = await axios.delete("https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products/" + productId + ".json");
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
    }
};

// async function getImageUrl(image) {
//     let imageRef = app.storage().ref(image)
//     let imageUrl = "";
//     await imageRef
//         .getDownloadURL()
//         .then((url) => {
//             imageUrl = url;
//         })
//     return imageUrl;
// }

export {
    listProducts,
    detailsProduct,
    saveProduct,
    deleteProduct,
};