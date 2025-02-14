import React, { useState } from 'react'
import styles from './Products.module.css'
import RecentProducts from '../Home/components/RecentProducts/RecentProducts';

export default function Products() {
    const [count, setCount] = useState(0)

    return (
        <div>
           <RecentProducts/>
        </div>
    )
}
