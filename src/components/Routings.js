import React, { useState } from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProductContainer from "./Products/ProductContainer";
import CustomerContainer from "./Customers/CustomerContainer";
import AccountDetails from "./Account/AccountDetails";
import BillContainer from "./Billing/BillContainer";
import { resetState } from "../actions/authActions";
import BillList from "./Billing/BillList";
import '../styles/RoutingStyles/routings.css'
import { swalAuthAlert } from "../selectors/alert";
import PrivateRoute from "./PrivateRoute";

const Routings = (props) => {
    const loggedIn = useSelector(state=>state.auth.loggedIn)
    const username = useSelector(state=>state.account.username)
    const dispatch = useDispatch()

    const linkStylePrimary = {
        textDecoration:'none',
        color:'white'
    }

    const handleLogout = () => {
        dispatch(resetState())
        swalAuthAlert('logged out successfully')
        localStorage.removeItem('token')
        // props.history.push('/')
    }
    
    return (
            <div className="container-fluid">
                <div className="row main-content">
                    <div className="col-1 px-3 nav flex-column d-flex justify-content-between side-bar">
                        {
                            loggedIn &&
                            <>
                                <div>
                                    <div className="nav-option">
                                        <Link style={linkStylePrimary} to="/account"><i className="fas fa-user-circle fa-2x"></i></Link>
                                    </div>
                                    <div className="nav-option">
                                        <Link style={linkStylePrimary} to="/dashboard"><i className="fas fa-home fa-2x"></i></Link>
                                    </div>
                                    <div className="nav-option">
                                        <Link style={linkStylePrimary} to="/customers"><i className="fas fa-user-friends fa-2x"></i></Link>
                                    </div>
                                    <div className="nav-option">
                                        <Link style={linkStylePrimary} to="/products"><i className="fas fa-box-open fa-2x"></i></Link>
                                    </div>
                                    <div className="nav-option">
                                        <Link style={linkStylePrimary} to="/bills"><i class="fas fa-file-invoice fa-2x px-1"></i></Link>
                                    </div>
                                    <div className="nav-option">
                                        <Link style={linkStylePrimary} to="/listing-bills"><i className="fas fa-copy fa-2x px-1"></i></Link>
                                    </div>
                                </div>
                                <div className="nav-option">
                                    <Link style={linkStylePrimary} to="/" onClick={handleLogout}><i style={{color:'#dc3545'}} className="fas fa-sign-out-alt fa-2x fa-rotate-180"></i></Link>
                                </div>
                            </>
                        }
                    </div>
                    <div className="col-11">
                        <div className="row">
                            <Route path="/" component={Login} exact />
                            <Route path="/register" component={Register} />
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                            <PrivateRoute path="/products" component={ProductContainer}/>
                            <PrivateRoute path="/customers" component={CustomerContainer}/>
                            <PrivateRoute path="/account" component={AccountDetails}/>
                            <PrivateRoute path="/bills" component={BillContainer}/>
                            <PrivateRoute path="/listing-bills" component={BillList}/>
                        </div>
                    </div>
                </div>
            </div>
    )

}

export default withRouter(Routings)