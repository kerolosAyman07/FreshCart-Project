import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../../../Shared/ProductItem/ProductItem'
import Loader from '../../../Shared/Loader/Loader'
import { cartContext } from '../../../../context/cartContext'
import { toast } from 'react-toastify'
import { theme } from 'flowbite-react'

export default function RecentProducts() {
    const [count, setCount] = useState(0)
    let [products,setProducts] = useState([])
    
    let {addToCart} = useContext(cartContext)

    async function addProductToCart (id){
        let data = await addToCart(id)
        if(data.status == "success"){
            toast("Product added successfully", {theme:"dark", type: "success"});
        }
    }

    async function productsApi(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        setProducts(data.data)
    }

    useEffect(() =>{
        productsApi()
    },[])

    return (
        <>
            {products.length != 0 && <div className='flex flex-wrap gap-y-3 container mb-10'>
                {products.map(product => <ProductItem key={product.id} addProductToCart={addProductToCart} product={product} />)}
            </div>}
            {products.length == 0 && <Loader />}
        </>
    )
}
