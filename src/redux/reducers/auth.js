import { INIT_STATE } from "../../constant";
import { getType, login,logout } from "../actions";


export default function authReducers(state = INIT_STATE.auth, action) {
//State Login
    switch (action.type) {
        case getType(login.loginRequest):
            return {
                ...state,
                isLoading: true
            } 
        case getType(login.loginSuccess):
            return {
                ...state,
                isLoading: false,
                isLogin:true,
                data: action.payload,
                status:'Login Successfully!'
            } 
        case getType(login.loginFailure):
            return {
                ...state,
                isLoading: false,
                status:'Incorrect Username or Password!'
            } 
//End Login







//State Logout
            case getType(logout.logoutRequest):
            return {
                ...state,
                isLoading: true
            } 
            case getType(logout.logoutSuccess):
            return {
                ...state,
                isLogin:false,
                isLoading: false,
                status:''
            } 
            case getType(logout.logoutFailure):
            return {
                ...state,
                isLoading: false
            }      
        default:
            return state;
//End Logout
    }

}