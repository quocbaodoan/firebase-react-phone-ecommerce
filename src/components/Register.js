import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../store/actions/userActions';
import Loading from "./Loading";
import validate from "./validateInfo";
import styled from "styled-components";


export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
    
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors(validate(email, password, rePassword));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            dispatch(register(email, password));
        }
    }, [errors]);

    return (
        <div className="container pt-5" style={{minHeight: "92vh"}}>
            <div className="row pt-4">
                <div className="col-12 mx-auto">
                    <RegisterWrapper className="row">
                        <div className="col-6 mx-auto form-content-left">
                            <img src="images/img-4.svg" alt="spaceship" className="form-img" />
                        </div>
                        <div className="col-6 mx-auto form-content-right">
                            <form onSubmit={submitHandler}>
                                <div className="p-4">
                                    <div className="row pb-1">
                                        <div className="col-12 text-center mt-4">
                                            <h2 className="text-uppercase" style={{ color: "#056676", fontWeight: "500" }}>Đăng ký</h2>
                                        </div>
                                    </div>
                                    <div>
                                        {error && <div>{error}</div>}
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="email">Email</label>
                                            <input className="mt-2" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                                            {errors.email && <p className="required">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input className="mt-2" type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                                            {errors.password && <p className="required">{errors.password}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-4 pb-2">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="rePassword">Nhập lại mật khẩu</label>
                                            <input className="mt-2" type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                                            {errors.rePassword && <p className="required">{errors.rePassword}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-4 text-center">
                                        <div className="col col-10 mx-auto">
                                            {error && 
                                                <div className="error">Email hoặc mật khẩu của bạn không chính xác!</div>
                                            }
                                            <button type="submit" className="btn btn-primary w-100" style={{ width: "120px", height: "50px", position: "relative" }}>
                                                Đăng ký{loading && <div className="loading"><Loading/></div>}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row mt-1 text-center">
                                        <div className="col col-10 mx-auto text-muted">
                                            Bạn đã có tài khoản? <Link to="signin" style={{ textDecoration: "none", color: "#056676" }}>
                                                Đăng nhập ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </RegisterWrapper>
                </div>
            </div>
        </div>
    )
}

const RegisterWrapper = styled.div`
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 10px;
    height: 600px;
    
    form{
        border-radius: 20px;
        background-color: white;
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

    input[type="password"]:focus, input[type="email"]:focus, input[type="name"]:focus{
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
    }

    .form-content-right{
        border-radius: 0 10px 10px 0;
        position: relative;
        background: white;
    }

    label{
        color: #056676;
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
        top: 84%;
        left: 0%;
        transform: translate(0%, 0%);
    }

    .loading{
        position: absolute;
        top: 20%;
        left: 90%;
        transform: translate(0%, 0%);
    }
`