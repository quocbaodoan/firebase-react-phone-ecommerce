import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../store/actions/userActions';
import styled from "styled-components";
import validate from "./validateInfo";
import Loading from './Loading';

export default function Signin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (userInfo) {
            props.history.push("/");
        }
        return () => {
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors(validate(email, password));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            dispatch(signin(email, password));
        }
    }, [errors]);

    return (
        <div className="container" style={{minHeight: "92vh"}}>
            <SignInWrapper className="row">
                <div className="col-12 mx-auto">
                    <div className="row" style={{minHeight: "600px"}}>
                        <div className="col-lg-6 col-12 mx-auto form-content-left">
                            <img src="images/img-2.svg" alt="spaceship" className="form-img"/>
                        </div>
                        <div className="col-lg-6 col-12 mx-auto form-content-right">
                            <form onSubmit={submitHandler}>
                                <div className="p-4">
                                    <div className="row">
                                        <div className="col-12 text-center mt-5 mb-3">
                                            <h2 className="text-uppercase" style={{color: "#056676", fontWeight: "500" }}>Đăng nhập</h2>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="email">Email</label>
                                            <input className="mt-2" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                                            {errors.email && <p className="required">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-5 pb-4">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input className="mt-2" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                                            {errors.password && <p className="required">{errors.password}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-4 text-center">
                                        <div className="col col-10 mx-auto justify-content-center align-self-center">
                                            {error && 
                                                <div className="error">Email hoặc mật khẩu của bạn không chính xác!</div>
                                            }
                                            <button type="submit" className="btn btn-primary w-100" style={{ height: "50px" }}>
                                                Đăng nhập{loading && <div className="loading"><Loading/></div>}
                                            </button>
                                            
                                        </div>
                                    </div>
                                    <div className="row mb-4 mt-1">
                                        <div className="col col-10 mx-auto text-muted d-flex flex-row">
                                            Bạn chưa có tài khoản?<Link to="register" style={{textDecoration: "none", color: "#056676"}} className="ml-1">
                                                Đăng ký ngay
                                            </Link>
                                            <Link to="reset-password" style={{textDecoration: "none", color: "#056676"}} className="ml-auto">
                                                Quên mật khẩu?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </SignInWrapper>
        </div>
    )
}

const SignInWrapper = styled.div`
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 10px;
    min-height: 600px;
    margin-top: 70px;

    form{
        border-radius: 20px;
    }

    input[type="text"], input[type="password"], input[type="date"], select, input[type="name"], input[type="email"]{
        position: relative;
        border: none;
        background-color: transparent;
        border-bottom: 1px solid #c9cfd6;
        margin-bottom: 0.8rem;
        width: 100%;
        padding: 0px 0px 0.5rem 0px;
    }

    textarea{
        position: relative;
        border-color: #6c757d;
        border-radius: 10px;
        height: 200px;
    }

    input[type="password"]:focus, input[type="email"]:focus{
        outline: none;
    }

    .btn-primary{
        background-color: #056676 !important;
        border-color: #056676 !important;
    }

    .form-img {
        width: 80%;
        height: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .form-content-left {
        background: #056676;
        border-radius: 10px 0 0 10px;
        position: relative;
        min-height: 400px;
    }

    .form-content-right{
        border-radius: 0 10px 10px 0;
        position: relative;
        background: white;
        min-height: 600px;
    }

    label{
        color: #056676 !important;
    }

    .error{
        width: 100%;
        position: absolute;
        color: #056676;
        top: -53%;
        left: 50%;
        transform: translate(-50%, 0%);
    }

    .required{
        font-size: 0.9rem;
        width: 100%;
        margin-left: 15px;
        position: absolute;
        color: #6c757d;
        top: 88%;
        left: 0%;
        transform: translate(0%, 0%);
    }

    .loading{
        position: absolute;
        top: 20%;
        left: 87%;
        transform: translate(0%, 0%);
    }

    @media (max-width: 992px){
        margin-top: 0px;
        margin-bottom: 2px;

        .form-content-left {
            border-radius: 10px 10px 0 0;
        }

        .form-content-right{
            border-radius: 0 0 10px 10px;
        }
    }
`