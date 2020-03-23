import User from "../model/user.model";
import {UserActions, UserActionsUnion} from "./user.actions";

export interface UserState {
    data?: User;
    loading: boolean;
}

const initialState: UserState = {
    loading: false
};

export default function reducer(state = initialState, action: UserActionsUnion): UserState {
    switch (action.type) {
        case UserActions.LOGIN_USER:
        case UserActions.REGISTER_USER:
        case UserActions.LOAD_USER: {
            return {
                ...state,
                loading: true
            }
        }
        case UserActions.LOGIN_USER_SUCCESS:
        case UserActions.REGISTER_USER_SUCCESS:
        case UserActions.LOAD_USER_SUCCESS: {
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        }
        case UserActions.LOGIN_USER_FAIL:
        case UserActions.REGISTER_USER_FAIL:
        case UserActions.LOAD_USER_FAIL: {
            return {
                ...state,
                data: undefined,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}