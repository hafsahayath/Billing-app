import React,{ useState } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProductContainer from "./Products/ProductContainer";
import CustomerContainer from "./Customers/CustomerContainer";
import AccountDetails from "./Account/AccountDetails";
import BillContainer from "./Billing/BillContainer";

const Routings = (props) => {
    const loggedIn = useSelector(state=>state.auth.loggedIn)
    return (
        <div>
            {
                loggedIn ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/customers">Customers</Link>
                        <Link to="/products">Products</Link>
                        <Link to="/account">Account</Link>
                        <Link to="/bills">Bills</Link>
                        <Link to="/" onClick={()=>{
                            // write dispatch to clear all states in store
                            alert('logged out successfully')
                            localStorage.removeItem('token')
                        }}>Logout</Link>
                    </>
                ) : null
            }


            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/products" component={ProductContainer} />
            <Route path="/customers" component={CustomerContainer}/>
            <Route path="/account" component={AccountDetails}/>
            <Route path="/bills" component={BillContainer}/>
        </div>
    )

}

export default withRouter(Routings)