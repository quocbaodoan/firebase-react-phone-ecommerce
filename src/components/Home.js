import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../store/actions/productActions';
import styled from "styled-components";
import { productBrands, slideImages } from "../data";
import { Carousel } from "react-bootstrap";
import Pagination from "./Pagination";
import Product from "./Product";

export default function Home(props) {
    const [searchKeyword, setSearchKeyword] = useState("");
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const sortHandler = (e) => {
        dispatch(listProducts(searchKeyword, e.target.value));
    };

    const setSearchValue = (value) => {
        dispatch(listProducts(value, ""));
    };
    console.log(products);
    return (
        <HomeWrapper style={{ minHeight: "100vh" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Carousel indicators={false}>
                            <Carousel.Item>
                                <img className="d-block w-100" src={slideImages[0].img} alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={slideImages[1].img} alt="Third slide" />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                    </div>
                    <div className="col-6 text-right text-muted">
                        <span>Sắp xếp theo</span>
                        <select name="SortOrder" onChange={sortHandler} className="mdb-select md-form ml-1" style={{ borderRadius: "5px", border: "none", padding: "5px", backgroundColor: "white", color: "#6c757d" }}>
                            <option value="">Mới nhất</option>
                            <option value="highest">Từ cao đến thấp</option>
                            <option value="lowest">Từ thấp đên cao</option>
                        </select>
                    </div>
                </div>
                <div className="text-center d-block col-11 col-md-12 mt-3" style={{ padding: "0px" }}>
                    <div className="row" style={{ margin: "0px" }}>
                        {productBrands.map(productBrand => {
                            return (
                                <BrandLogoWrapper className="flex-fill">
                                    <div className="logo-img p-2" onClick={() => setSearchValue(productBrand.brand)} style={{ cursor: "pointer" }}>
                                        <img src={productBrand.img} alt="brand-logo" className="brand p-1" />
                                    </div>
                                </BrandLogoWrapper>
                            )
                        })}
                    </div>
                </div>
                <div className="row">
                    {products.slice(indexOfFirstPost, indexOfLastPost).map(product => {
                        return (
                            <Product key={product.id} product={product} />
                        )
                    })}
                    {((searchKeyword !== undefined) ?
                        products.filter(product => product.name.toLowerCase().indexOf(searchKeyword) > -1).length
                        : products.length) > 8 ?
                        <Pagination
                            postsPerPage={8}
                            totalPosts={(searchKeyword !== undefined) ?
                                products.filter(product => product.name.toLowerCase().indexOf(searchKeyword) > -1).length
                                :
                                products.length
                            }
                            paginate={paginate}
                        />
                        : null
                    }
                </div>
            </div>
        </HomeWrapper>
    );
}

const BrandLogoWrapper = styled.div`
    .brand{
        position: inherit;
        width: 95px;
    }
    
    .flex-fill{
        width: 114px !important;
    }

    .logo-img{
        background: white;
    }
`

const HomeWrapper = styled.div`
    select{
        cursor: pointer;

        &:focus{
            outline: none;
        }
    }
`