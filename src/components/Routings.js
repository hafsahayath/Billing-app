import React from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProductContainer from "./Products/ProductContainer";
import CustomerContainer from "./Customers/CustomerContainer";
import AccountDetails from "./Account/AccountDetails";
import BillContainer from "./Billing/BillContainer";
import { resetState } from "../actions/authActions";
import PrivateRoute from "./PrivateRoute";
import BillList from "./Billing/BillList";

const Routings = (props) => {
    const loggedIn = useSelector(state=>state.auth.loggedIn)
    const dispatch = useDispatch()
    
    return (
        <div>
            {
                loggedIn  &&
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/customers">Customers</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/account">Account</Link>
                        <Link to="/bills">Bills</Link>
                        <Link to="/" onClick={()=>{
                            dispatch(resetState())
                            alert('logged out successfully')
                            localStorage.removeItem('token')
                            // props.history.push('/')
                        }}>Logout</Link>
                    </>
            }

            
            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard">
                <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/products">
                <ProductContainer />
            </PrivateRoute>
            <PrivateRoute path="/customers">
                <CustomerContainer />
            </PrivateRoute>
            <PrivateRoute path="/account">
                <AccountDetails />
            </PrivateRoute>
            <PrivateRoute path="/bills">
                <BillContainer />
            </PrivateRoute>
            <PrivateRoute path="/listing-bills">
                <BillList />
            </PrivateRoute>
        </div>
    )

}

export default withRouter(Routings)