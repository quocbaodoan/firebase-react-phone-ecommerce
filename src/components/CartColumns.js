import React from 'react'
import styled from "styled-components"

export default function CartColumns() {
    return (
        <CartColumnsWrapper>
            <div className="container text-center d-none d-lg-block">
                <div className="row">
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase py-auto">Sản phẩm</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase">Tên sản phẩm</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase">Giá</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase">Số lượng</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase">Loại bỏ</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                        <p className="text-uppercase">Tổng</p>
                    </div>
                </div>
            </div>
        </CartColumnsWrapper>
    )
}

const CartColumnsWrapper = styled.div`
    .container{
        background: white;
        height: 40px;
        border-radius: 20px;
        color: #666666;
    }
    p{
        margin-top: 8px !important;
    }
`