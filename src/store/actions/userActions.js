import Cookie from 'js-cookie';
import {
    USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAIL,
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";
import { auth } from "../../firebase";


const resetPassword = (email) => async (dispatch) => {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST, payload: { email } });
    console.log("Email: " +  email);

    try {
        await auth.sendPasswordResetEmail(String(email));
        dispatch({type: USER_RESET_PASSWORD_SUCCESS});
    }
    catch (error) {
        dispatch({ type: USER_RESET_PASSWORD_FAIL, payload: error.message });
    }
}

const update = ({ email, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { email, password } });
    try {
        let data = {};
        if (userInfo.email !== email && userInfo.password !== password) {
            auth.currentUser.updateEmail(email);
            auth.currentUser.updatePassword(password);
            data = {
                email: email,
                password: password,
            }
        }
        else if (userInfo.email !== email) {
            auth.currentUser.updateEmail(email);
            data = {
                email: email,
                password: userInfo.password,
            }
        }
        else if (userInfo.password !== password) {
            auth.currentUser.updatePassword(password);
            data = {
                email: userInfo.email,
                password: password,
            }
        }
        auth.onAuthStateChanged(user => {
            auth.currentUser.reload()
        })

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        await auth.signInWithEmailAndPassword(email, password);
        const data = {
            email: email,
            password: password,
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
        await auth.createUserWithEmailAndPassword(email, password);
        const data = {
            email: email,
            password: password,
        }
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

export { resetPassword, signin, register, logout, update };