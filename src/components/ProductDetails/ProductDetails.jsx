import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { data, useParams } from 'react-router-dom'
import axios from 'axios'
import RelatedProducts from './components/RelatedProduct/RelatedProduct';
import Slider from 'react-slick';
import Loader from '../Shared/Loader/Loader';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {
    const [count, setCount] = useState(0)
    const [details, setDetails] = useState(null)

    const {id,categoryId} = useParams()

    function getProductDetails() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(({data}) =>{
            console.log(data)
            setDetails(data.data)
        })
        .catch(err =>{
            console.log(err);   
        })
    }    

    useEffect(() =>{
        getProductDetails()
    },[id])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let {addToCart} = useContext(cartContext)
    
    async function addProductToCart(id) {
        let data = await addToCart(id)
        if (data.status == "success") {
            toast("Product added successfully", { theme: "dark", type: "success" });
        }
    }
    
    return (
        <>
            {details && <div className="flex flex-col md:flex-row items-center container ga-3 py-20">
                <div className="w-1/4">
                    <Slider {...settings}>
                        {details?.images.map(src => <img src={src} alt="productDetails" className='pe-20' />)}
                    </Slider>
                </div>
                <div className="w-3/4">
                    <h1 className='font-extrabold'>{details?.title}</h1>
                    <p className='py-3 ms-3 text-gray-500'>{details?.description}</p>
                    <span>{details?.category.name}</span>
                    <div className="flex justify-between mb-5">
                        <p className='font-extrabold'>{details?.price} EGP</p>
                        <p>{details?.ratingsAverage} <i className='fa fa-star rating-color'></i></p>
                    </div>
                    <button onClick={()=>addProductToCart(details.id)} className='btn bg-main w-full rounded-sm text=center text-white p-2 '>Add to card</button>
                </div>
            </div>}
            {!details && <Loader />}
            

            <h2 className='text-3xl ms-5 mb-2 font-extrabold'>Related Products:</h2>
            <RelatedProducts categoryId = {categoryId}/>
        </>
    )
}
