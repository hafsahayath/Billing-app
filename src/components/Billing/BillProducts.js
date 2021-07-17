import React, { useState, useEffect } from 'react'
import { Hint } from 'react-autocomplete-hint'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const BillProducts = (props) => {
    const products = useSelector(state=>state.products)
    const [productDetails, setProductDetails] = useState([{id:'', name:'', quantity:'', subTotal:''}])
    const [product, setProduct] = useState({})
    const [grandTotal, setGrandTotal] = useState('')

    const { addLineItem } = props

    useEffect(()=>{
        const res = productDetails.reduce((acc, curr)=>acc+curr.subTotal,0)
        setGrandTotal(res)
    },[productDetails])

    const productNames = products.map(ele=>ele.name)

    const handleAutoFill = (e, index) => {
        const productName = e.target.value
        const productFind = products.find(ele=>ele.name===productName)
        if(productFind){
            const res = productDetails.map((ele, i)=>{
                if(index === i){
                    return {...ele, id: productFind._id, subTotal:ele.quantity*productFind.price}
                } else {
                    return ele
                }
            })
            setProduct(productFind)
            setProductDetails(res)
        } else {
            if(productName!==''){
                alert('product not available')
                const res = productDetails.map((ele, i)=>{
                    if(index === i){
                        return {...ele, name:''}
                    } else {
                        return ele
                    }
                })
                setProductDetails(res)
            }
        }
    }

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const res = productDetails.map((ele,i)=>{
            if(index === i){
                return {...ele, [name]:value}
            } else {
                return ele
            }
        })
        setProductDetails(res)
    }

    const handleAddLineItem = () => {
        setProductDetails([...productDetails, {id:'', name:'', quantity:'', subTotal:''}])
    }

    const handleRemoveLineItem = (index) => {
        const res = productDetails.filter((ele,i)=>{
            return i !== index
        })
        setProductDetails(res)
    }

    const handleBlur = (e, index) => {
        const res = productDetails.map((ele,i)=>{
            if(i===index){
                return {...ele, subTotal:product.price*ele.quantity}
            } else {
                return ele
            }
        })
        setProductDetails(res)
        const lineItems = res.map(ele=>{
            if(ele.name && ele.quantity){
                return {product: ele.id, quantity: ele.quantity}
            }
        }).filter(ele=>ele)
        addLineItem(lineItems)
    }

    return (
        <div className="pt-3">
            { productDetails.map((ele,i)=>{
                    return (
                        <div className="row align-items-end m-3" key={i}> 
                            <div className="col">
                                <label>Product name</label>
                                <Hint options={productNames}>
                                    <input className="form-control" type="text" name="name" value={ele.name} onBlur={(e)=>handleAutoFill(e, i)} onChange={(e)=>handleChange(e, i)} />
                                </Hint>
                            </div>
                            <div className="col">
                                <label>Quantity</label>
                                <input className="form-control" type="number" name="quantity" value={ele.quantity} onChange={(e)=>handleChange(e, i)} onBlur={(e)=>handleBlur(e, i)}/>
                            </div>
                            <div className="col">
                                <label>Sub total</label>
                                <input className="form-control" type="text" name="subTotal" value={ele.subTotal} disabled={true}/>
                            </div>
                            <div className="col">
                                <Button onClick={()=>handleRemoveLineItem(i)}>remove</Button>
                            </div>
                        </div>
                    )
                }) 
            }
            <div className="d-flex justify-content-end mr-5 pt-4">
                <label>Total</label>
                <input className="form-control col-3" type="text" value={grandTotal} disabled={true} />
                <div className="mx-2">
                    <Button onClick={handleAddLineItem}>add</Button>
                </div>          
            </div>
        </div>
    )
}

export default BillProducts