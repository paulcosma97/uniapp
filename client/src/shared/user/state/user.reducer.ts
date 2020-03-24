import User from "../model/user.model";
import {UserActions, UserActionsUnion} from "./user.actions";

export interface UserState {
    data?: User;
    login: {
        error: boolean;
    }
    loading: boolean;
}

const initialState: UserState = {
    loading: false,
    login: {
        error: false
    }
};

export default function reducer(state = initialState, action: UserActionsUnion): UserState {
    switch (action.type) {
        case UserActions.LOAD_USER: {
            return {
                ...state,
                loading: true
            }
        }
        case UserActions.LOAD_USER_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }
        case UserActions.LOAD_USER_FAIL: {
            return {
                ...state,
                data: undefined,
                loading: false
            }
        }
        case UserActions.LOGIN_USER_SUCCESS:
        case UserActions.LOGIN_USER: {
            return {
                ...state,
                login: {
                    error: false
                }
            }
        }
        case UserActions.LOGIN_USER_FAIL: {
            return {
                ...state,
                login: {
                    error: true
                }
            }
        }
        default: {
            return state;
        }
    }
}