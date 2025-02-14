import React, { useState } from 'react'
import styles from './WishList.module.css'

export default function WishList() {
    const {addToWishlist, removeFromWishlist } = useContext(cartContext);

    async function deleteProduct(id) {
        await removeFromWishlist(id);
    }

    async function updateItems(id,count) {
        await addToWishlist(id,count); 
    }
    return (
        <div>
            
        </div>
    )
}
