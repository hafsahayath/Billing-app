import React from 'react'
import { Card } from 'react-bootstrap'

const Stats = ({variant, Header, value}) => {
    return (
        <div style={{textAlign:'center'}}>
            <Card
                bg={variant.toLowerCase()}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Body>
                    <Card.Title style={{fontSize:'35px', paddingTop:'10px'}}> {value} </Card.Title>
                </Card.Body>
                <Card.Header>{Header}</Card.Header>
            </Card>
        </div>
    )
}

export default Stats