import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { tokenContext } from "./tokenContext";

export const WishlistContext = createContext();

export function WishlistContextProvider({ children }) {

    const [wishlistId, setWishlistId] = useState([]);
    const [numOfWishListCart, setNumOfWishListCart] = useState(0)
    const {token} = useContext(tokenContext)
    const headers = {
        token
    }

    useEffect(() => {
        token && addToWishlist()
    }, [token])

    async function addToWishlist(productId) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        });
        if(data.status == "success"){
            setNumOfWishListCart(data.numOfWishListCart)
        }
        setWishlistId(data.wishlistId)
        return data

    }

    async function removeFromWishlist(productId) {
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        });
        if (data.status == "success") {
            setNumOfWishListCart(data.numOfWishListCart)
        }
        setWishlistId(data)
        return data
    }

    return (
        <WishlistContext.Provider value={{ wishlistId,setWishlistId, addToWishlist, removeFromWishlist ,numOfWishListCart ,setNumOfWishListCart}}>
            {children}
        </WishlistContext.Provider>
    );
}
