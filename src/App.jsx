import { use, useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import { tokenContext } from './context/tokenContext'
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes'
import { AuthorizeView } from './components/AuthorizeView/AuthorizeView'
import { ToastContainer } from 'react-toastify'
import Checkout from './components/Checkout/Checkout'
import AllOrders from './components/AllOrders/AllOrders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WishList from './components/WishList/WishList'

function App() {
  const [count, setCount] = useState(0)

  let query = new QueryClient()
  let {setToken} = useContext(tokenContext)
  useEffect (() => {
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"))
    }
  },[])

  const routes = createHashRouter([
    {path:"" , element: <LayOut /> , children:[
      {index: true , element: <Home />},
      {path:"home" , element: <ProtectedRoutes><Home /></ProtectedRoutes>},
      {path:"categories" , element: <ProtectedRoutes><Categories /></ProtectedRoutes>},
      {path:"brands" , element: <ProtectedRoutes><Brands /></ProtectedRoutes>},
      {path:"products" , element: <ProtectedRoutes><Products /></ProtectedRoutes>},
      {path:"login" , element: <AuthorizeView><Login /></AuthorizeView>},
      {path:"register" , element: <AuthorizeView><Register /> </AuthorizeView>},
      {path:"cart" , element: <ProtectedRoutes><Cart /></ProtectedRoutes>},
      {path:"productDetails/:id/:categoryId" , element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes>},
      {path:"checkout" , element: <ProtectedRoutes><Checkout /></ProtectedRoutes>},
      {path:"allOrders" , element: <ProtectedRoutes><AllOrders /></ProtectedRoutes>},
      {path:"wishlist" , element: <ProtectedRoutes><WishList /></ProtectedRoutes>},


      {path:"*" , element: <NotFound />},

    ]}
  ])
  return (
    <>
      <QueryClientProvider client={query}>
        <RouterProvider router={routes} />
        <ToastContainer />
      </QueryClientProvider>
    </>
  )
}

export default App
