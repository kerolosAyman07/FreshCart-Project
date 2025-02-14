import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import Loader from '../Shared/Loader/Loader'
import { data } from 'react-router-dom'

export default function Categories() {
    const [count, setCount] = useState(0)

    let [categories,setCategories] = useState([])
    

    async function categoriesApi(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data)
    }

    useEffect(() =>{
        categoriesApi()
    },[])


    return (
        <>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
                    {categories.map(category => (
                        <div key={category._id} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-main hover:shadow-sm transition-all">
                            <a href="#">
                                <img className="rounded-t-lg w-full h-64 object-cover" src={category.image} alt="error" />
                                <div className="p-5 text-center">
                                    <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-main dark:text-white">
                                        {category.name}
                                    </h5>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            {categories.length == 0 && <Loader />}
        </>
    )
}
