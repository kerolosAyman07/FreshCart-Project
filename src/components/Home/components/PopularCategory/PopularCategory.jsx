import React, { useEffect, useState } from 'react'
import styles from './PopularCategory.module.css'
import axios from 'axios'
import Slider from 'react-slick'

export default function PopularCategory() {
    const [count, setCount] = useState(0)

    const [popularCategory, setPopularCategory] = useState([])
    

    async function getPopularCategory() {
        try{
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            setPopularCategory(data.data)
        }
        catch(error){
            console.log(error)
        }
    }    

    useEffect(() =>{
        getPopularCategory()
    },[])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 7,
        slidesToScroll: 1,
    };

    return (
        <div className='container mb-10'>
            <h2 className='font-extrabold mb-3'>Shop Popular Categoris</h2>
            <Slider {...settings}>
                {popularCategory.map(popularCategory => <img src={popularCategory.image} className={styles.categoryImg} alt="popularCategory" /> )}
            </Slider>
        </div>

    )
}
