import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { asyncGetAccDetails } from '../../actions/accountDetailsActions'

const AccountDetails = (props) => {
    const account = useSelector(state=>state.account)
    const dispatch = useDispatch()

    const centerStyle = {
        position:'fixed',
        margin:'auto',
        height:'300px',
        width:'300px',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    useEffect(()=>{
        dispatch(asyncGetAccDetails())
    },[])

    return (
        <div style={centerStyle}>
            <Card className="text-center">
                <Card.Header>Account Details</Card.Header>
                    <Card.Body>
                        <Card.Title>{account.businessName}</Card.Title>
                        <Card.Text>
                            <strong>{account.username}</strong> <br />
                            {account.address}
                        </Card.Text>
                        <Link to="/dashboard">Quick Access</Link>
                    </Card.Body>
            </Card>
            <h2></h2>
        </div>
    )
}

export default AccountDetails