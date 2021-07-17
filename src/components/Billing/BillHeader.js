import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { dateFormatter } from '../../selectors/billing'

const BillHeader = (props) => {
    const account = useSelector(state=>state.account)
    const date = dateFormatter(new Date().toISOString())
    return (
        <div style={{display:'flex', justifyContent:'space-between',margin:'30px'}}>
            <Card style={{ width: '12rem', textAlign:'center' }}>
                <Card.Body>
                    <Card.Title>{account.businessName}</Card.Title>
                    <Card.Text>
                        {account.address}
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className="form-group d-flex px-2">
                <label className="px-1 col-2">Date</label>
                <input className="form-control col-6" type="text" defaultValue={date} disabled={true}/>
            </div>
        </div>
    )
}

export default BillHeader
