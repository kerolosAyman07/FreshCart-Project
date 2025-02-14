import React, { useState } from 'react'
import styles from './StaticSlider.module.css'
import slide1 from '../../../../assets/images/slider-image-1.jpeg'
import slide2 from '../../../../assets/images/slider-image-2.jpeg'
import slide3 from '../../../../assets/images/slider-image-3.jpeg'
import static1 from '../../../../assets/images/grocery-banner.png'
import static2 from '../../../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'


export default function StaticSlider() {
    const [count, setCount] = useState(0)


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='flex flex-wrap gap-y-3 container mb-10'>
            <div className="w-3/4">
                <Slider {...settings}>
                    <img src={slide1} className={styles.imgColor} alt="slide1" />
                    <img src={slide2} className={styles.imgColor} alt="slide2" />
                    <img src={slide3} className={styles.imgColor} alt="slide3" />
                </Slider>
            </div>
            <div className="w-1/4">
                <img src={static1} className='h-[250px]' alt="static1" />
                <img src={static2} className='h-[250px]' alt="static2" />
            </div>
        </div>
    )
}
