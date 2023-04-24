import { initialAuthState } from './../state/user-state';
import { REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST } from 'constants/auth-constants';
import { LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS } from 'constants/auth-constants';

export const authReducer = (state = initialAuthState as any, action: any) => {

    switch(action.type) {

        case REGISTER_USER_REQUEST:
            return {loading: true, error: undefined, user: {} }

        case REGISTER_USER_SUCCESS:
            return {...state, loading: false, error: undefined, user: action.payload}

        case REGISTER_USER_FAIL:
            return {...state, error: action.payload, user: {}, loading: false}

        case LOGIN_USER_REQUEST:
            return {loading: true, error: undefined, user: {} }

        case LOGIN_USER_SUCCESS:
            return {...state, loading: false, error: undefined, user: action.payload}
    
        default:
            return state
    }
}