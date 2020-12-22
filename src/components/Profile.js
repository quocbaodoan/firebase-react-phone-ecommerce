import React, { useState, useEffect } from 'react';
import { update } from '../store/actions/userActions';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "./Loading";
import validate from "./validateInfo";

export default function Profile(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const submitHandler = (e) => {
        e.preventDefault();
        setErrors(validate(email, password, rePassword));
        setIsSubmitting(true);
    }
    const userUpdate = useSelector(state => state.userUpdate);
    const { loading, success, error } = userUpdate;
    

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            dispatch(update({ email, password }));
        }
    }, [errors, userInfo]);

    useEffect(() => {
        if (userInfo) {
            setEmail(userInfo.email);
            setPassword(userInfo.password);
            setRePassword(userInfo.password);
        }
    }, [userInfo]);

    return (
        <div className="container" style={{minHeight: "92vh"}}>
            <UserInfoWrapper className="row">
                <div className="col-12 mx-auto">
                    <div className="row" style={{minHeight: "600px"}}>
                        <div className="col-lg-6 col-12 mx-auto form-content-left">
                            <img src="images/img-3.svg" alt="spaceship" className="form-img"/>
                        </div>
                        <div className="col-lg-6 col-12 mx-auto form-content-right">
                            <form onSubmit={submitHandler}>
                                <div className="py-5 px-2">
                                    <div className="row">
                                        <div className="col-12 mt-3 text-center">
                                            <h2 style={{ color: "#056676", fontWeight: "500" }}>Thông tin cá nhân</h2>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="email">Email</label>
                                            <input className="mt-2" value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                                            {errors.email && <p className="required">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="password">Mật khẩu</label>
                                            <input className="mt-2" value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
                                            {errors.password && <p className="required">{errors.password}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-4 pb-2">
                                        <div className="col-10 mx-auto">
                                            <label htmlFor="rePassword">Nhập lại mật khẩu</label>
                                            <input className="mt-2" value={rePassword} type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}></input>
                                            {errors.rePassword && <p className="required">{errors.rePassword}</p>}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-10 mx-auto text-center">
                                            {error && 
                                                <div className="error">{error}</div>
                                            }
                                            {success && 
                                                <div className="error">Cập nhật thông tin thành công!</div>
                                            }
                                            <button type="submit" className="btn btn-primary w-100" style={{ height: "50px", position: "relative" }}>
                                                Cập nhật{loading && <div className="loading"><Loading /></div>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </UserInfoWrapper>
        </div>
    )
}

const UserInfoWrapper = styled.div`
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 10px;
    min-height: 600px;
    margin-top: 70px;

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
        min-height: 400px;
    }

    .form-content-right{
        border-radius: 0 10px 10px 0;
        position: relative;
        background: white;
        min-height: 600px;
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