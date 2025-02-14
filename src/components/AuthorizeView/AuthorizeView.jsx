import { Navigate } from "react-router-dom";

export function AuthorizeView(props){
    if(localStorage.getItem("userToken")){
        return <Navigate to={'/home'}/>
    }
    else{
        return props.children
    }
}