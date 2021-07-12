import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";
import productReducer from "../reducers/productReducer";
import customerReducer from "../reducers/customerReducer";
import accountReducer from "../reducers/accountReducer";

const configStore = () => {
    const store = createStore(combineReducers({
        auth: authReducer,
        products: productReducer,
        customers: customerReducer,
        account: accountReducer
    }),applyMiddleware(thunk))
    return store
}

export default configStore