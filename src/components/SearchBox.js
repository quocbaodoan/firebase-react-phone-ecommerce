import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { listProducts } from '../store/actions/productActions';
import { withRouter } from 'react-router-dom';

function SearchBox(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        props.history.push("/");
    };
    useEffect(() => {
        if (props.location.pathname === "/"){
            dispatch(listProducts(searchKeyword));
        }
    }, [props.location.pathname, searchKeyword]);
    return (
        <SearchWrapper>
            <form onSubmit={submitHandler} className="form-inline d-flex flex-row">
                <input name="searchKeyword" className="form-control" placeholder="Nhập từ khóa cần tìm" onChange={(e) => setSearchKeyword(e.target.value)} />
                <button type="submit"><i className="fas fa-search"></i></button>
            </form>
        </SearchWrapper>
    )
}

export default withRouter(SearchBox);

const SearchWrapper = styled.div`
    .form-control{
        width: 300px;
        border-radius: 10px !important;
        transition: none;
    }

    .form-control:focus{
        box-shadow: 0 0 0 0.2rem #ced4da;
        border: none;
    }

    input[type="text"]{
        color: #056676;
    }

    button{
        border: none;
        background-color: transparent;
    }

    .fa-search{
        color: #056676;
        font-size: 120%;
    }

    button:focus{
        outline: none;
    }

    .dropdown-search{
        width: 300px;
        color: black;
        background-color: white;
        position: absolute;
        z-index: 1;
    }

    .dropdown-item{
        padding: 6px 30px !important;
    }

    a{
        color: #056676 !important;
        text-decoration: none;
    }

    a:active{
        color: #fcfcfc !important;
    }

    .fa-search:hover{
        color: #056676; 
    }

    .dropdown-item:active{
        background-color: #5eaaa8;
    }

    .fa-search{
        margin-left: 2px;
    }

    @media screen and (max-width: 768px) {
        .form-control {
            width: 200px; /* The width is 100%, when the viewport is 800px or smaller */
            font-size: 14px;
        }

        .dropdown-search{
            width: auto;
        }
        .fa-search{
            margin-left: 0px;
        }
    }
    @media screen and (max-width: 480px) {
        .form-control {
            width: 160px; /* The width is 100%, when the viewport is 800px or smaller */
            font-size: 12px;
            height: 30px !important;
        }
        .dropdown-search{
            width: auto;
        }
    }
`