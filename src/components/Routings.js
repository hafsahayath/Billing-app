import React, { useState } from "react";
import { Link, Route, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, Navbar,NavDropdown, Nav, Container, Button } from "react-bootstrap";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Dashboard from "./Dashboard/Dashboard";
import ProductContainer from "./Products/ProductContainer";
import CustomerContainer from "./Customers/CustomerContainer";
import AccountDetails from "./Account/AccountDetails";
import BillContainer from "./Billing/BillContainer";
import { resetState } from "../actions/authActions";
// import PrivateRoute from "./PrivateRoute";
import BillList from "./Billing/BillList";
import '../styles/RoutingStyles/routings.css'
import { swalAuthAlert } from "../selectors/alert";

const Routings = (props) => {
    const loggedIn = useSelector(state=>state.auth.loggedIn)
    const username = useSelector(state=>state.account.username)
    const dispatch = useDispatch()

    const linkStylePrimary = {
        textDecoration:'none',
        color:'white'
    }

    const linkStyleSecondary = {
        textDecoration:'none',
        color:'black'
    }

    const handleLogout = () => {
        dispatch(resetState())
        swalAuthAlert('logged out successfully')
        localStorage.removeItem('token')
        // props.history.push('/')
    }
    
    return (
        <div>
            {
                loggedIn  &&
                <div className="container-fluid">
                    <div className="row main-content">
                        <div className="col-1 px-3 nav flex-column side-bar">
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
                        <div className="col-11">
                            <div className="row justify-content-end">
                                    <Link style={linkStyleSecondary} to="/" onClick={handleLogout}>Logout</Link>
                            </div>
                            <div className="row">
                                <Route path="/dashboard" render={(props)=>{
                                    return loggedIn ? <Dashboard {...props}/> : <Redirect to="/" />
                                }}/>
                                <Route path="/products" render={(props)=>{
                                    return loggedIn ? <ProductContainer {...props}/> : <Redirect to="/" />
                                }}/>
                                <Route path="/customers" render={(props)=>{
                                    return loggedIn ? <CustomerContainer {...props}/> : <Redirect to="/" />
                                }}/>
                                <Route path="/account" render={(props)=>{
                                    return loggedIn ? <AccountDetails {...props}/> : <Redirect to="/" />
                                }}/>
                                <Route path="/bills" render={(props)=>{
                                    return loggedIn ? <BillContainer {...props}/> : <Redirect to="/" />
                                }}/>
                                <Route path="/listing-bills" render={(props)=>{
                                    return loggedIn ? <BillList {...props}/> : <Redirect to="/" />
                                }}/>

                            </div>
                        </div>
                    </div>
                </div>
            }
            
            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} />
        </div>
    )

}

export default withRouter(Routings)