import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../store/actions/userActions';
import styled from "styled-components";
import validate from "./validateInfo";
import Loading from './Loading';

export default function ResetPassword(props) {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userResetPassword = useSelector(state => state.userResetPassword);
    const { loading, success, error } = userResetPassword;
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     if (userInfo) {
    //         props.history.push("/");
    //     }
    //     return () => {
    //     };
    // }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors(validate(email));
        setIsSubmitting(true);
        console.log("false");
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            console.log("true");
            dispatch(resetPassword(email));
        }
    }, [errors]);
    console.log(email);

    return (
        <div className="container pt-5" style={{minHeight: "92vh"}}>
            <div className="row pt-4">
                <div className="col-12 mx-auto">
                    <ResetPasswordWrapper className="row">
                        <div className="col-6 mx-auto form-content-left">
                            <img src="images/img-3.svg" alt="spaceship" className="form-img"/>
                        </div>
                        <div className="col-6 mx-auto form-content-right">
                            <form onSubmit={submitHandler}>
                                <div className="py-5 px-4 mt-3">
                                    <div className="row pb-2">
                                        <div className="col-12 text-center mt-5 mb-3">
                                            <h2 className="text-uppercase" style={{color: "#056676", fontWeight: "500" }}>QUÊN MẬT KHẨU</h2>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                    <div className="row mt-5 pb-4">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="email">Email</label>
                                            <input className="mt-2" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                                            {errors.email && <p className="required">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-5 text-center">
                                        <div className="col col-10 mx-auto justify-content-center align-self-center">
                                            {error && 
                                                <div className="error">Email của bạn không chính xác!</div>
                                            }
                                            {success && 
                                                <div className="error">Xin vui lòng kiểm tra hộp thư!</div>
                                            }
                                            <button type="submit" className="btn btn-primary w-100" style={{ height: "50px" }}>
                                                Gửi{loading && <div className="loading"><Loading/></div>}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row text-center mb-4 mt-1">
                                        <div className="col col-10 mx-auto text-muted">
                                            Bạn chưa có tài khoản? <Link to="register" style={{textDecoration: "none", color: "#056676"}}>
                                                Đăng ký ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ResetPasswordWrapper>
                </div>
            </div>
        </div>
    )
}

const ResetPasswordWrapper = styled.div`
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 10px;
    height: 600px;

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
    }

    .form-content-right{
        border-radius: 0 10px 10px 0;
        position: relative;
        background: white;
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
`