import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Shared/Loader/Loader'

export default function Brands() {
    let [brands,setBrands] = useState([])
    

    async function categoriesApi(){
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        setBrands(data.data)    
    }

    useEffect(() =>{
        categoriesApi()
    },[])

    
    return (
        <>
          <div className="container mx-auto px-4">
           <h2 className="text-main text-center font-extrabold my-10 text-4xl">All Brands</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 my-6">
                        {brands.map(brand => (
                            <div key={brand._id} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-main hover:shadow-sm transition-all">
                                <a href="#">
                                    <img className="rounded-t-lg w-full h-50 object-cover" src={brand.image} alt="error" />
                                    <div className="p-5 text-center">
                                        <h5 className="mb-2 text-sm font-extrabold tracking-tight text-black dark:text-white">
                                            {brand.name}
                                        </h5>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
            </div>
            {brands.length == 0 && <Loader />}
        </>
    )
}
