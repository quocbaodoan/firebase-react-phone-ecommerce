import React from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Product(props) {
    return (
        <ProductWrapper className="col-8 col-md-6 col-lg-3 my-3 align-self-start mx-auto mx-md-0">
            <div key={props.product.id}>
                <div className="card">
                    <div className="img-container px-5 pt-5 pb-4">
                        <Link to={'/product/' + props.product.id}>
                            <img src={props.product.image} alt="product" className="card-img-top" />
                        </Link>
                        {/* <button className="cart-btn" disabled={inCart ? true : false} onClick={() => {value.addToCart(id); value.openModal(id);}}>
                            {inCart ? (<p className="mb-0" disabled>Đã có</p>) : (<p className="mb-0" disabled>Thêm vào giỏ</p>)}
                        </button> */}
                    </div>
                    <div className="card-footer">
                        <h6>
                            <Link to={'/product/' + props.product.id}>{props.product.name}</Link>
                        </h6>
                        <h6 className="mt-0 mb-0 price">
                            <span className="justify-content-end" style={{color: "#666"}}>{convertToString(props.product.price)}đ</span>
                        </h6>
                    </div>
                </div>
            </div>
        </ProductWrapper>
    )
};

function convertToString(value) {
    let resString = value.toString();
    let resFinal = "";
    while (resString.length > 3) {
        resFinal = "." + resString.substr(resString.length - 3, resString.length - 1) + resFinal;
        resString = resString.substr(0, resString.length - 3);
    }
    resFinal = resString + resFinal;
    return resFinal;
}

const ProductWrapper = styled.div`
    .card{
        border-color: transparent;
        border-radius: 10px;
        transition: all 0.3s linear;
    }

    .card-footer{
        background: transparent;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top: transparent;
        transition: all 0.3s linear;
        color: #888 !important;
        padding-bottom: 16px;
    }

    .card-footer h6 a{
        color: #555  !important;
        text-decoration: none;
        transition: all 0.3s linear;
        font-weight: 400;
    }

    &:hover{
        .card{
            border: 0.04rem solid rgba(0, 0, 0, 0.2);
            box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2)
        }
    }
    
    .img-container{
        position: relative;
        overflow: hidden;
    }

    .card-img-top{
        transition: transform 0.3s linear;
    }

    .img-container:hover .card-img-top{
        transform: scale(1.04);
    }

    .cart-btn{
        width: 100px;
        position: absolute;
        bottom: 2%;
        left: 32%;
        padding: 4px 0.4rem;
        background: #5eaaa8;
        border:none;
        color: #fcfcfc;
        border-radius: 10px;
        transform: translate(0, 125%);
        font-size: 17px;
        transition: transform 0.3s linear;
    }

    .img-container:hover .cart-btn{
        transform: translate(0, 0);
    }

    .cart-btn:hover{
        color: var(--mainBlack);
        cursor: pointer;
    }

    .price{
        font-size: 0.9rem;
        font-weight: 300;
    }
`;