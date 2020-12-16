import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../store/actions/productActions';
import styled from "styled-components";
import Loading from "./Loading"

export default function Details(props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
        //
        };
    }, []);
    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
    };

    return (
    <div>
        {loading ? (
            <div className="loading"><Loading/></div>
        ) : error ? (
            <div>{error} </div>
        ) : 
        (
            <ProductWrapper className="container">        
                <div className="pl-2 pt-3">
                    <Link to="/" className="text-decoration-none" style={{color: "#056676"}}><i className="fas fa-chevron-circle-left mr-1"></i>Về trang chủ</Link>
                </div>
                <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted mb-3">
                        <h1 style={{color: "#056676", fontWeight: "500"}}>{product.name}</h1>
                    </div>
                </div>
                {/*end title*/}
                {/*product info*/}
                <div className="row">
                    <div className="col-10 mx-auto col-md-4 my-3 text-capitalize pr-0">
                        <img src={product.image} className="img-fluid pl-4 py-4" alt="product"/>
                    </div>
                    {/*product text*/}
                    <div className="col-10 mx-auto col-md-4 my-3 pl-0">
                        <div className="cart">
                            <div className="row mt-3 mb-2">
                                <div className="col-6 mx-auto">
                                    <h5 style={{color: "#056676"}}>
                                        Thương hiệu: <span>{product.brand}</span>
                                    </h5>
                                </div>
                                <div className="col-6 mx-auto">   
                                    <h5 style={{color: "#056676"}}>
                                        Tình trạng: {product.countInStock > 0 ? 'còn hàng' : 'hết hàng'}
                                    </h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-6">
                                    <h5 style={{color: "#056676", marginTop: "2px"}}>
                                        Giá: {(product.price !== undefined) ? (convertToString(product.price)) : null}<span>đ</span>
                                    </h5>
                                </div>
                                <div className="col col-6">
                                    <div className="row m-0">
                                        <h5 style={{color: "#056676", marginTop: "2px"}} className="mr-2">Số lượng:</h5>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <input className="btn btn-decrement mx-1" onClick={() => setQty(qty - 1)} disabled={(qty <= 1) ? true : false}/>
                                            </div>
                                            <div>
                                                <span className="btn btn-number-cart mx-1" style={{color: "#056676", padding: "0px"}}>{qty}</span> 
                                            </div>
                                            <div>
                                                <input className="btn btn-increment mx-1" onClick={() => setQty(qty + 1)} disabled={(qty >= product.countInStock) ? true : false}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    {product.countInStock > 0 && (
                                    <button
                                        onClick={handleAddToCart}
                                        className="btn btn-primary w-100"
                                    >
                                        Thêm vào giỏ
                                    </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p style={{color: "#666666"}} className="mt-2">
                            {product.description}
                        </p>
                        
                    </div>
                    <div className="col-10 mx-auto col-md-4 my-3 text-capitalize pr-4">    
                        <h5 className="mt-3" style={{color: "#056676"}}>Thông số kỹ thuật</h5>
                        <ul className="parameter">
                            <li>
                                <span className="main">Màn hình:</span>
                                <span className="sub">{product.display}</span>
                            </li>
                            <li>
                                <span className="main">Hệ điều hành:</span>
                                <span className="sub">{product.os}</span>
                            </li>
                            <li>
                                <span className="main">Camera sau:</span>
                                <span className="sub">{product.camera}</span>
                            </li>
                            <li>
                                <span className="main">Camera trước:</span>
                                <span className="sub">{product.front}</span>
                            </li>
                            <li>
                                <span className="main">CPU:</span>
                                <span className="sub">{product.cpu}</span>
                            </li>
                            <li>
                                <span className="main">RAM:</span>
                                <span className="sub">{product.ram}</span>
                            </li>
                            <li>
                                <span className="main">Bộ nhớ trong:</span>
                                <span className="sub">{product.memory}</span>
                            </li>
                            <li>
                                <span className="main">Thẻ sim:</span>
                                <span className="sub">{product.sim}</span>
                            </li>
                            <li>
                                <span className="main">Dung lượng pin:</span>
                                <span className="sub">{product.battery}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ProductWrapper>
        )}
        </div>
    );
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

const ProductWrapper = styled.div`
    min-height: 92vh;
    background: white;
    .img-fluid{
        background: white;
        border-radius: 20px;
    }
    
    .parameter{
        font-weight: 300;
        display: block;
        position: relative;
        overflow: hidden;
        padding-left: 0px !important;
    }

    li{
        display: table;
        width: 100%;
        border-top: 1px solid #eeeeee;
        padding: 8px 0px;
    }

    .main{
        display: table-cell;
        width: 35%;
        vertical-align: top;
        color: #666666;
    }

    .sub{
        display: table-cell;
        width: auto;
        color: #056676;
    }

    .btn-primary {
        background-color: #056676 !important;
        border-color: #056676 !important;
        height: 50px;
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

    h5{
        font-size: 1.1rem;
        font-weight: 400;
    }
`
