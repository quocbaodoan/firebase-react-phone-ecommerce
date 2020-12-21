import React, { useState } from 'react';
import styled from "styled-components";
import logo from "../logo.png";
import { listProducts } from '../store/actions/productActions';
import { logout } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { Menu, Dropdown, Button } from 'antd';
import { withRouter } from 'react-router-dom';

function NavBar(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const [sortOrder, setSortOrder] = useState('');
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/");
    }
    const setDefault = (e) => {
        dispatch(listProducts("", sortOrder));
    };
    const menu = (
        <Menu style={{padding: "0.6rem 0.6rem", width: "180px"}}>
            <Menu.Item style={{marginTop: "0.2rem"}} className="text-center">
                <Link to="/profile" style={{color: "#056676"}}>Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item>
                <button onClick={handleLogout} className="btn btn-danger w-100">Đăng xuất</button>
            </Menu.Item>
        </Menu>
    );
    return (
        <div>
            <NavWrapper>
                <div className="navbar navbar-expand-sm navbar-dark px-sm-1 container d-flex">
                    {/* https://www.iconfinder.com/icons/1243689/call_phone_icon
                    Creative Commons (Attribution 3.0 Unported);
                    https://www.iconfinder.com/Makoto_msk */}
                    <Link to="/">
                        <img src={logo} alt="store" className="navbar-brand" onClick={setDefault} />
                    </Link>
                    <SearchBox />
                    <div className="ml-auto d-flex pt-1">
                        {userInfo && userInfo.email === "quocbaodoan1999@gmail.com" ? null :
                            <Link to="/cart" className="ml-1">
                                <button className="btn btn-primary mr-3">
                                    <div className="row justify-content-center">
                                        <i className="fas fa-shopping-cart"></i>         
                                    </div>
                                    <div className="row" style={{fontSize: "0.8rem", fontWeight: "300", marginTop: "1px"}}>
                                        Giỏ hàng
                                    </div>
                                </button>
                            </Link>
                        }
                        {userInfo && userInfo.email === "quocbaodoan1999@gmail.com" && (
                            // <Link to="/products" className="ml-1"><button className="btn btn-primary">Sản phẩm</button></Link>
                            <Link to="/products">
                                <button className="btn btn-primary mr-3">
                                    <div className="row justify-content-center">
                                        <i className="fas fa-store"></i>
                                    </div>
                                    <div className="row" style={{fontSize: "0.8rem", fontWeight: "300", marginTop: "1px"}}>
                                        <span>Sản phẩm</span>
                                    </div>
                                </button>
                            </Link>
                        )}

                        {!userInfo ? (
                            // <Link to="/signin"><button className="btn btn-primary ml-1">Đăng nhập</button></Link>
                            <Link to="/signin">
                                <Button style={{border: "none", lineHeight: "1.5",
                                                transition: "none",
                                                height: "48px",
                                                padding: "0.375rem .75rem",
                                                fontSize: "1rem",
                                                borderRadius: "0.25rem",
                                                boxShadow: "none",
                                                color: "#056676"}}> 
                                    <div className="row justify-content-center">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="row" style={{fontSize: "0.8rem", fontWeight: "300", marginTop: "2px"}}>
                                        <span>Đăng nhập</span>
                                    </div>
                                </Button>
                            </Link>
                        ) :
                        (
                            <Dropdown overlay={menu} placement="bottomRight">
                                <Button style={{border: "none", lineHeight: "1.5",
                                                transition: "none",
                                                height: "48px",
                                                padding: "0.375rem .75rem",
                                                fontSize: "1rem",
                                                borderRadius: "0.25rem",
                                                boxShadow: "none",
                                                color: "#056676"}}> 
                                    <div className="row justify-content-center">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="row" style={{fontSize: "0.8rem", fontWeight: "300", marginTop: "2px"}}>
                                        <span>Thông tin</span>
                                    </div>
                                </Button>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </NavWrapper>
        </div>
    )
}

export default withRouter(NavBar);

const NavWrapper = styled.nav`
    z-index: 1040;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 0.5rem 1rem 0px;
    position: fixed;
    top: 0;
    width: 100%;
    overflow: hidden;
    .nav-link{
        color: var(--mainWhite) !important;
        font-size: 1.6rem;
        text-transform: capitalize !important;
    }

    .navbar-brand{
        color: white !important;
        width: 70px;
        padding: 0px;
    }

    .navbar{
        padding: 5px;
    }
    a{
        color: #056676 !important;
    }

    .btn-primary{
        background-color: transparent !important;
        border-color: transparent !important;
        color: #056676;

        &:active{
            color: #056676 !important;
        }

        &:focus{
            box-shadow: none !important;
            outline: none;
        }
    }

    .btn-outline-primary{
        border-color: #056676 !important;
        color: #056676 !important;

        &:hover{
            background: #056676;
            color: #fcfcfc !important;
        }

        &:active{
            background-color: #056676 !important;
            color: #fcfcfc !important;
        }

        &:focus{
            box-shadow: none !important;
        }
    }

    .fas{
        font-size: 150%;
    }

    @media (max-width:767px){

    padding: 8px 0px;
        .fas{
            font-size: 110%;
        }
        .navbar-brand{
            width: 50px;
            margin-right: 8px;
        }
    }

    @media (max-width:480px){
        .fas{
            font-size: 100%;
        }
        .navbar-brand{
            margin-right: 0px;
        }
    }
`