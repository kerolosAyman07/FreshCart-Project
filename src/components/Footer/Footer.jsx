import React, { useState } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
    const [count, setCount] = useState(0)

    return (
        <footer className='bg-[#f0f2f1] bottom-0 w-screen'>
            <div className="container w-full mb-5 mt-5">
                <h2 className='text-2xl text-[#212529]'>Get the FreshCart app</h2>
                <p className='text-sm text-[#6d767e]'>We will send you a link, open it on your phone to download the app</p>
                <div className="flex m-4">
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main" placeholder="Email .." required />
                    <button className='md:ms-5 px-10 py-1.5 bg-main rounded-md text-white'>Share App Link</button>
                </div>
            </div>
            <div className="flex justify-between mx-16 py-6 border-y-2 mb-10">
                <div className="flex">
                    <p>Payment Partners</p>
                </div>
                <div className="flex">
                    <p>Get deliveries with FreshCart</p>
                </div>
            </div>
        </footer>
    )
}
