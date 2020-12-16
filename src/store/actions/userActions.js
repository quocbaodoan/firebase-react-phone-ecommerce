import Axios from "axios";
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";
import { auth } from "../../firebase";
import { getToken } from "../../util"

const update = ({ userId, email, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, email, password } });
    try {
        const { data } = await Axios.put("/api/users/" + userId,
            { email, password }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        await auth.signInWithEmailAndPassword(email, password)
        const signinUser = {email, password};
        const data = {
            email: email,
            password: password,
            token: getToken(signinUser)
        }
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const register = (email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
    try {
        const { data } = await auth.createUserWithEmailAndPassword(email, password);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update };