import React, { useState } from 'react'
import styles from './Loader.module.css'
import { ClipLoader } from 'react-spinners'

export default function Loader() {
    const [count, setCount] = useState(0)

    return (
        <div className='flex justify-center'>
            <ClipLoader color='#0aad0a' size={50} />
        </div>
    )
}
