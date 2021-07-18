import React, { useState, useEffect } from 'react'
import { Hint } from 'react-autocomplete-hint'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const BillProducts = (props) => {
    const products = useSelector(state=>state.products)
    const [productDetails, setProductDetails] = useState([{id:'', name:'', quantity:'', subTotal:''}])
    const [product, setProduct] = useState({})
    const [grandTotal, setGrandTotal] = useState('')

    const { addLineItem, modalShow } = props

    useEffect(()=>{
        const res = productDetails.reduce((acc, curr)=>acc+curr.subTotal,0)
        setGrandTotal(res)
    },[productDetails])

    useEffect(()=>{
        if(modalShow){
            setProductDetails([{id:'', name:'', quantity:'', subTotal:''}])
        }
    },[modalShow])

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
                return {...ele, [name]:value, subTotal:0}
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
                return {...ele, subTotal:ele.quantity*product.price}
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

    const btnStyles = {
        border: 'transparent',
        background: 'transparent',
        color: '#007bff'
    }

    const btnDangerStyles = {
        border: 'transparent',
        background: 'transparent',
        color: '#dc3545'
    }

    return (
        <div className="pt-3">
            { productDetails.map((ele,i)=>{
                    return (
                        <>
                            <div className="row align-items-end m-3" key={i}> 
                                <div className="col-4">
                                    <label>Product name</label>
                                    <Hint options={productNames}>
                                        <input className="form-control" type="text" name="name" value={ele.name} onBlur={(e)=>handleAutoFill(e, i)} onChange={(e)=>handleChange(e, i)} />
                                    </Hint>
                                </div>
                                <div className="col-4">
                                    <label>Quantity</label>
                                    <input className="form-control" type="number" name="quantity" value={ele.quantity} onChange={(e)=>handleChange(e, i)} onBlur={(e)=>handleBlur(e, i)}/>
                                </div>
                                <div className="col-2">
                                    <label>Sub total</label>
                                    <input className="form-control" type="text" name="subTotal" value={ele.subTotal} disabled={true}/>
                                </div>
                                <div className="col-2">
                                    {
                                        productDetails.length > 1 && 
                                        <button style={btnDangerStyles} onClick={()=>handleRemoveLineItem(i)}><i class="fas fa-minus"></i></button>
                                    }
                                    {
                                        i === productDetails.length - 1 &&
                                        <button style={btnStyles} className="col-1 w-75 mx-4" onClick={handleAddLineItem}><i class="fas fa-plus"></i></button>
                                    }
                                    </div>
                                </div>
                            </>

                    )
                }) 
            }
            <div className="row justify-content-end align-items-center my-4 mx-4">
                <label className="mx-2 my-1">Total</label>
                <input className="form-control col-2" type="text" value={grandTotal} disabled={true} />    
            </div>
        </div>
    )
}

export default BillProducts