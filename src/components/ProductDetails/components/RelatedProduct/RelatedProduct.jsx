import React, { useEffect, useState } from 'react'
import styles from './RelatedProduct.module.css'
import axios from 'axios'
import Products from '../../../Products/Products'
import ProductItem from '../../../Shared/ProductItem/ProductItem'
import Loader from '../../../Shared/Loader/Loader'

export default function RelatedProduct(props) {
    const [count, setCount] = useState(0)

    const [relatedProducts, setRelatedProducts] = useState([])

    let {categoryId} = props 

    
    function getRelatedProduct() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({data}) =>{
            console.log(data)
            let res = data.data.filter(product => product.category._id == categoryId)
            setRelatedProducts(res)
            })
        .catch(err =>{
            console.log(err);   
        })
    }    

    useEffect(() =>{
        getRelatedProduct()
    },[])

    return (
        <div className='flex flex-wrap gap-y-3 container mb-10'>
            {relatedProducts.map(product => <ProductItem key={product.id} product={product}/>)}
        </div>
    )
}
