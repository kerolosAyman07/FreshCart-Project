import React, { useState } from 'react'
import styles from './NotFound.module.css'
import notFound from '../../assets/images/404.png'

export default function NotFound() {
    const [count, setCount] = useState(0)

    return (
        <div className='container'>
            <img src={notFound} className='w-full' alt="notFoundImg" />
        </div>
    )
}
