import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap'

const BillHeader = (props) => {
    const account = useSelector(state=>state.account)
    const date = new Date().toISOString().split('T')[0]
    
    return (
        <div style={{display:'flex', justifyContent:'space-between',margin:'20px'}}>
            <Card style={{ width: '12rem', textAlign:'center' }}>
                <Card.Body>
                    <Card.Title>{account.businessName}</Card.Title>
                    <Card.Text>
                        {account.address}
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className="form-group d-flex justify-content-end">
                <label className="px-1 col-2 my-1">Date</label>
                <input className="form-control col-6" type="text" defaultValue={date} disabled={true}/>
            </div>
        </div>
    )
}

export default BillHeader
