import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        let data = [];
        await Axios.get('https://phone-ecommerce-91794-default-rtdb.firebaseio.com/products/' + productId + '.json')
            .then(res => {
                data = res.data;

                dispatch({
                    type: CART_ADD_ITEM, payload: {
                        product: productId,
                        name: data.name,
                        image: data.image,
                        price: data.price,
                        countInStock: data.countInStock,
                        qty
                    }
                });
                // const getProduct = async () => {
                //     const imageUrl = await getImageUrl(res.data.image).then((result) => {
                //         console.log("Image url: " + result);
                //         return result;
                //     })
                //     data = {
                //         ...res.data,
                //         image: imageUrl
                //     }
                //     console.log(data);
                //     dispatch({
                //         type: CART_ADD_ITEM, payload: {
                //             product: productId,
                //             name: data.name,
                //             image: data.image,
                //             price: data.price,
                //             countInStock: data.countInStock,
                //             qty
                //         }
                //     });
                // }
                // getProduct();
            })
        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {

    }
}
const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

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

export { addToCart, removeFromCart }