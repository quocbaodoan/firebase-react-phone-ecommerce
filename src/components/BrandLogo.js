import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

export default function BrandLogo(props) {
    const {img, brand} = props.productBrand;
    return (
        <Link to={"/"+brand.toLowerCase()}>
                {value => {
                    return(
                        <BrandLogoWrapper className="flex-fill" onClick={() => value.setSearchValue(brand.toLowerCase())}>
                            <div className="logo-img p-2">
                                <img src={img} alt="brand-logo" className="brand p-1"/>
                            </div>
                        </BrandLogoWrapper>
                    )
                }}
        </Link>
    )
}

const BrandLogoWrapper = styled.div`
    .brand{
        position: inherit;
        width: 95px !important;
    }
    
    .flex-fill{
        width: 114px !important;
    }

    .logo-img{
        background: white;
    }
`
