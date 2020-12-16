import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Details from './components/Details';
import Cart from './components/Cart';
import Signin from './components/Signin';
import Register from './components/Register';
import ProductManagement from './components/ProductManagement';
import Profile from './components/Profile';
import NavBar from "./components/NavBar";
import 'antd/dist/antd.css';

function App(props) {
    return (
        <BrowserRouter>
            <NavBar />
            <main className="main">
                <div className="content">
                    <Route path="/profile" component={Profile} />
                    <Route path="/products" component={ProductManagement} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/register" component={Register} />
                    <Route path="/product/:id" component={Details} />
                    <Route path="/cart/:id?" component={Cart} />
                    <Route path="/category/:id" component={Home} />
                    <Route path="/" exact={true} component={Home} />
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;




