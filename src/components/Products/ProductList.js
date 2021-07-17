import React, { Profiler, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Form } from 'react-bootstrap'
import { asyncGetProducts } from '../../actions/productActions'
import ProductItem from './ProductItem'
import '../../styles/productStyles/productList.css'

const ProductList = (props) => {
    const dispatch = useDispatch()
    const products = useSelector(state=>state.products)
    const [edit, setEdit] = useState(false)
    const [search, setSearch] = useState('')
    const [listSearchData, setListSearchData] = useState([])
    const [select, setSelect] = useState('')

    useEffect(()=>{
        dispatch(asyncGetProducts())
    },[edit])

    useEffect(()=>{
        if(search===''){
            setListSearchData([...products])
        } else {
            const res = products.filter(ele=>{
                return (ele.name.toLowerCase().includes(search.toLowerCase()))
            })
            setListSearchData(res)
        }
    },[products, search])

    const editToggle = () => {
        setEdit(!edit)
    }

    const resetSearch = () => {
        setSearch('')
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSelectChange = (e) => {
        let option = e.target.value
        setSelect(option)
        if(option===''){
            setListSearchData([...products])
        } else if(option==='highToLow'){
            const res = listSearchData.sort((a,b)=>b.price-a.price)
            setListSearchData(res)
        } else if(option==='lowToHigh'){
            const res = listSearchData.sort((a,b)=>a.price-b.price)
            setListSearchData(res)
        }
    }

    return (
        <div className="main-product-container-list">
            <div className="search-sort">
                <div className="product-search-component">
                    <Form.Control type="text" value={search} placeholder="search by name" onChange={handleSearchChange} />
                </div>
                <div className="product-sort">
                    <select value={select} onChange={handleSelectChange}>
                        <option value="">select</option>
                        <option value="highToLow">High to low</option>
                        <option value="lowToHigh">Low to High</option>
                    </select>
                </div>
            </div>
            <div>
                <Table className="w-75 text-center" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchData.map((ele,i)=>{
                            return <ProductItem key={ele._id} {...ele} i={i} editToggle={editToggle} resetSearch={resetSearch}/>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ProductList
