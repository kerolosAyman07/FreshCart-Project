import React, { useState } from 'react'
import styles from './ProductItem.module.css'
import { data, Link } from 'react-router-dom'

export default function ProductItem(props) {
    const [count, setCount] = useState(0)
    let {imageCover,title,category,price,ratingsAverage,id} = props.product

    return (
        <div className="md:w-1/2 lg:w-1/6 px-3 mb-3 ">
            <div className="product">
                <Link to={`/productDetails/${id}/${category._id}`}>
                    <img src={imageCover} alt="" />
                    <span className='text-main'>{category.name}</span>
                    <h2>{title.split(" ").splice(0, 2).join(" ")}</h2>
                    <div className="flex justify-between">
                        <p className='font-extrabold'>{price} EGP</p>
                        <p>{ratingsAverage} <i className='fa fa-star rating-color'></i></p>
                    </div>
                </Link>
                <button onClick={()=>props.addProductToCart(id)} className='btn bg-main w-full rounded-sm text=center text-white p-2 mt-1'>Add to card</button>
            </div>
        </div>
    )
}
