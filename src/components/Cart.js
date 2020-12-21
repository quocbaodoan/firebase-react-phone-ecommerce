import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import CartColumns from "./CartColumns";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import PaypalButton from "./PaypalButton";

export default function Cart(props) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    
    useEffect(() => {
        if (productId) {
        dispatch(addToCart(productId, qty));
        }
    }, []);

    return(
        <div className="container" style={{minHeight: "92vh"}}>
            {
            cartItems.length === 0 ?
            (
                <div>
                    <h1 className="text-center py-4" style={{color: "#056676", fontWeight: "500", letterSpacing: "6px"}}>GIỎ HÀNG HIỆN CÒN TRỐNG</h1>
                </div>
            )
            :
            (
                <div>       
                    <h1 className="text-center pt-4 pb-2" style={{color: "#056676", fontWeight: "500", letterSpacing: "7px"}}>GIỎ HÀNG</h1>
                    <div className="row">
                        <div className="col-xl-9">
                            <CartColumns/>
                            {cartItems.map(item =>
                                <CartWrapper className="px-lg-0">
                                    <div className="row text-center">
                                        <div className="col-10 mx-auto col-lg-2">
                                            <Link to={"/product/" + item.product}>
                                                <img src={item.image} style={{width:"5rem"}} className="img-fluid" alt="product"/>
                                            </Link>
                                        </div>
                                        <div className="col-10 mx-auto col-lg-2 my-auto">
                                            <span className="d-lg-none">Sản phẩm: </span>
                                            <Link to={"/product/" + item.product} style={{color: "#056676", textDecoration: "none"}}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="col-10 mx-auto col-lg-2 my-auto">
                                            <span className="d-lg-none">Giá: </span>
                                            {convertToString(item.price)}đ
                                        </div>
                                        <div className="col-10 mx-auto col-lg-2 my-lg-auto">
                                            <div className="d-flex justify-content-center">
                                                <div>
                                                    <input className="btn btn-decrement mx-1" onClick={(e) => dispatch(addToCart(item.product, item.qty - 1))} disabled={(item.qty <= 1) ? true : false}/>
                                                </div>
                                                <div>
                                                    <span className="btn btn-number-cart mx-1" style={{color: "#056676", padding: "0px"}}>{item.qty}</span> 
                                                </div>
                                                <div>
                                                    <input className="btn btn-increment mx-1" onClick={(e) => dispatch(addToCart(item.product, item.qty + 1))} disabled={(item.qty >= item.countInStock) ? true : false}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-10 mx-auto col-lg-2 my-auto">
                                            <div className="cart-remove-icon" onClick={() => removeFromCartHandler(item.product)}>
                                                <i className="fas fa-trash" ></i>
                                            </div>
                                        </div>
                                        <div className="col-10 mx-auto col-lg-2 my-auto">
                                            {convertToString(item.price * item.qty)}đ
                                        </div>
                                    </div>
                                </CartWrapper>
                            )}
                        </div>
                        <div className="col-xl-3">
                            <CartTotalWrapper className="text-center pt-4 pb-2">
                                <h4 style={{color: "#056676"}}>
                                    Tổng thanh toán 
                                </h4>
                                <h5 style={{color: "#056676"}} className="mt-3">
                                    {convertToString(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}đ
                                </h5>
                                <button className="btn btn-primary w-100" disabled={cartItems.length === 0}>
                                    <PaypalButton total={cartItems.reduce((a, c) => a + c.price * c.qty, 0)} />
                                </button>
                            </CartTotalWrapper>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function convertToString(value){
    let resString = value.toString();
    let resFinal = "";
    while(resString.length > 3){
        resFinal = "." + resString.substr(resString.length - 3, resString.length - 1) + resFinal;
        resString = resString.substr(0, resString.length - 3);
    }
    resFinal = resString + resFinal;
    return resFinal;
}

const CartWrapper = styled.div`
    input{
        font-size: 0px !important;
    }

    .btn-decrement{
        padding: 0 !important;
        border-top: 10px solid transparent !important;
        border-right: 16px solid #666666 !important;
        border-bottom: 10px solid transparent !important;
    }

    .btn-number-cart{
        padding: 0px !important;
    }

    .btn-increment{
        padding: 0 !important;
        border-top: 10px solid transparent !important;
        border-left: 16px solid #666666 !important;
        border-bottom: 10px solid transparent !important;
    }

    .cart-remove-icon{
        cursor: pointer;
        font-size: 1.2rem;
        color: #d14545;
    }

    .btn-decrement{
        font-size: 0px !important;
        padding: 0 !important;
        border-top: 10px solid transparent !important;
        border-right: 16px solid #666666 !important;
        border-bottom: 10px solid transparent !important;
    }

    .btn-increment{
        font-size: 0px !important;
        padding: 0 !important;
        border-top: 10px solid transparent !important;
        border-left: 16px solid #666666 !important;
        border-bottom: 10px solid transparent !important;
    }

    background: white;
    margin-top: 10px;
    padding: 10px 0px;
    border-radius: 20px;
    color: #056676 !important;
`

const CartTotalWrapper = styled.div`
    background-color: white;
    border-radius: 10px;

    .btn-primary {
        background-color: white !important;
        border-color: white !important;
        height: 50px;
        border-radius: 0px 0px 10px 10px;
    }
`