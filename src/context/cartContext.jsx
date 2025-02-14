import { createContext, useContext, useEffect, useState } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";

export const cartContext = createContext();

export default function CartContextProvider({children}){

    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState('')
    const [cartDetails, setCartDetails] = useState(null)
    const APIUrl = `https://ecommerce.routemisr.com/api/v1/cart`
    const orderAPIUrl = `https://ecommerce.routemisr.com/api/v1/orders`
    const {token} = useContext(tokenContext)
    const headers = {
        token
    }

    useEffect(()=>{
        token && getCart()
    },[token])

    async function addToCart(productId){
        const {data} = await axios.post(APIUrl,{productId},{
            headers
        })
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
        }
        return data
    }

    async function getCart(){
        const {data} = await axios.get(APIUrl,{
            headers
        })
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartId(data.cartId)
        setCartDetails(data)
        return data
    }

    async function removeProduct(id) {
        const {data} = await axios.delete(`${APIUrl}/${id}`,{
            headers
        })
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
        }

        setCartDetails(data)
        return data
    }

    async function updateCount(id,count) {
        const {data} = await axios.put(`${APIUrl}/${id}`,{count},{
            headers
        })
        if(data.status == "success"){
            setNumOfCartItems(data.numOfCartItems)
        }
        setCartDetails(data)
        return data
    }

    async function cashOnDelievry(shippingAddress) {
        const {data} = await axios.post(`${orderAPIUrl}/${cartId}`,{shippingAddress},{
            headers
        })
        if(data.status == "success"){
            getCart()
        }
        return data
    }

    async function onlinePayment(shippingAddress) {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{
            headers
        })
        return data
    }

    return(
        <cartContext.Provider value={{numOfCartItems,setNumOfCartItems,addToCart,getCart,cartDetails,removeProduct,updateCount,cashOnDelievry,onlinePayment}}>
            {children}
        </cartContext.Provider>
    )
}