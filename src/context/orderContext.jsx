import { createContext, useContext} from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";

export const orderContext = createContext();

export default function OrderContextProvider({children}){

    let {token} = useContext(tokenContext);
    const headers = {token}
    const api_url = `https://ecommerce.routemisr.com/api/v1/orders`

    async function onlineOrder(cartId,shippingAddress) {
        let {data} = await axios.post(`${api_url}/checkout-session/${cartId}?url=http://localhost:5173`,shippingAddress,{headers})   
        return data
    }

    async function getUserOrder(id) {
        let { data } = await axios.get(`${api_url}/user/${id}`)
        return data
    }

    return(
        <orderContext.Provider value={{onlineOrder,getUserOrder}}>
            {children}
        </orderContext.Provider>
    )
}