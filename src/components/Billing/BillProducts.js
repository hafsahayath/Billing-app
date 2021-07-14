import React, { useState, useEffect } from 'react'
import { Hint } from 'react-autocomplete-hint'
import { useSelector } from 'react-redux'

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
        <div>
            { productDetails.map((ele,i)=>{
                    return (
                        <div key={i}> 
                            <label>Product name</label>
                            <Hint options={productNames}>
                                <input type="text" name="name" value={ele.name} onBlur={(e)=>handleAutoFill(e, i)} onChange={(e)=>handleChange(e, i)} />
                            </Hint>
                            <label>Quantity</label>
                            <input type="number" name="quantity" value={ele.quantity} onChange={(e)=>handleChange(e, i)} onBlur={(e)=>handleBlur(e, i)}/>
                            <label>Sub total</label>
                            <input type="text" name="subTotal" value={ele.subTotal} disabled={true}/>
                            <button onClick={()=>handleRemoveLineItem(i)}>remove</button>
                        </div>
                    )
                }) 
            }
            <button onClick={handleAddLineItem}>add</button>
            <label>Total</label>
            <input type="text" value={grandTotal} disabled={true} />           
        </div>
    )
}

export default BillProducts