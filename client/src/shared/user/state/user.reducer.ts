import User from "../model/user.model";
import {UserActions, UserActionsUnion} from "./user.actions";


export interface UserState {
    data?: User;
    login: {
        error: boolean;
    },
    register: {
        error: boolean | null;
    }
    loading: boolean;
}

const initialState: UserState = {
    loading: false,
    login: {
        error: false
    },
    register: {
        error: null
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
        case UserActions.LOGIN_USER_SUCCESS:
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
        case UserActions.REGISTER_USER: {
            return {
                ...state,
                register: {
                    error: null,
                }
            }
        }
        case UserActions.REGISTER_USER_SUCCESS: {
            return {
                ...state,
                register: {
                    error: false
                }
            }
        }
        case UserActions.REGISTER_USER_FAIL: {
            return {
                ...state,
                register: {
                    error: true,
                }
            }
        }
        case UserActions.LOGOUT_USER: {
            return {
                ...state,
                loading: true
            }
        }
        case UserActions.LOGOUT_USER_SUCCESS: {
            return {
                ...initialState
            }
        }
        case UserActions.LOGOUT_USER_FAIL: {
            return {
                ...state,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}