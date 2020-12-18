import {
    USER_RESET_PASSWORD_REQUEST, USER_RESET_PASSWORD_SUCCESS, USER_RESET_PASSWORD_FAIL,
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

function userResetPasswordReducer(state = {}, action) {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { loading: true };
        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, success: true };
        case USER_RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function userSigninReducer(state = {}, action) {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default: return state;
    }
}

function userUpdateReducer(state = {}, action) {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function userRegisterReducer(state = {}, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

export { userResetPasswordReducer, userSigninReducer, userRegisterReducer, userUpdateReducer }