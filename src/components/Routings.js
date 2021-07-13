import React from "react";
import { Link, Redirect, Route, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProductContainer from "./Products/ProductContainer";
import CustomerContainer from "./Customers/CustomerContainer";
import AccountDetails from "./Account/AccountDetails";
import BillContainer from "./Billing/BillContainer";
import { resetState } from "../actions/authActions";

const Routings = (props) => {
    const loggedIn = useSelector(state=>state.auth.loggedIn)
    const dispatch = useDispatch()
    
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
                        <Link onClick={()=>{
                            dispatch(resetState())
                            alert('logged out successfully')
                            localStorage.removeItem('token')
                            props.history.push('/')
                        }}>Logout</Link>
                    </>
                ) : null
            }


            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" render={(props)=>{
                return loggedIn ? <Dashboard {...props} /> : <Redirect to="/"/>
            }}/>
            <Route path="/products" render={(props)=>{
                return loggedIn ? <ProductContainer {...props} /> : <Redirect to="/"/>
            }} />
            <Route path="/customers" render={(props)=>{
                return loggedIn ? <CustomerContainer {...props} /> : <Redirect to="/"/>
            }}/>
            <Route path="/account" render={(props)=>{
                return loggedIn ? <AccountDetails {...props} /> : <Redirect to="/"/>
            }}/>
            <Route path="/bills" render={(props)=>{
                return loggedIn ? <BillContainer {...props} /> : <Redirect to="/"/>
            }}/>
        </div>
    )

}

export default withRouter(Routings)