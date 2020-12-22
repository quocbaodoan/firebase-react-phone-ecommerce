import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Details from './components/Details';
import Cart from './components/Cart';
import Signin from './components/Signin';
import Register from './components/Register';
import ResetPassword from "./components/ResetPassword";
import ProductManagement from './components/ProductManagement';
import Profile from './components/Profile';
import NavBar from "./components/NavBar";
import 'antd/dist/antd.css';
import PrivateRoute from "./route/PrivateRoute";
import AdminRoute from "./route/AdminRoute";
import Footer from './components/Footer';
import styled from "styled-components"

function App(props) {
    return (
        <BrowserRouter>
            <NavBar />
            <MainWrapper>
                <div>
                    <PrivateRoute path="/profile" component={Profile} />
                    <AdminRoute path="/products" component={ProductManagement} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/register" component={Register} />
                    <Route path="/reset-password" component={ResetPassword} />
                    <Route path="/product/:id" component={Details} />
                    <Route path="/cart/:id?" component={Cart} />
                    <Route path="/category/:id" component={Home} />
                    <Route path="/" exact={true} component={Home} />
                </div>
            </MainWrapper>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

const MainWrapper = styled.div`
    padding-top: 80px;
    @media (max-width:767px){
        padding-top: 60px;
    }
    @media (max-width:480px){
        padding-top: 51px;
    }
`


