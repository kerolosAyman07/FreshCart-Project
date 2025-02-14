import { createContext, useState } from "react";

let counterContext = createContext();

export default function CounterContextProvider(props){
    let [count , setCount] = useState(null)
    return <counterContext.Provider  value = {{count,setCount}}>
        {props.children}
    </counterContext.Provider>
}