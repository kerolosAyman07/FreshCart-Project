import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'flowbite/dist/flowbite.min.js'
import CounterContextProvider from './context/counterContext.jsx'
import TokenContextProvider from './context/tokenContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './context/cartContext.jsx'
import OrderContextProvider from './context/orderContext.jsx'
import { WishlistContextProvider } from './context/wishListContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <OrderContextProvider>
            <WishlistContextProvider>
              <App />
            </WishlistContextProvider>
          </OrderContextProvider>
        </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>,
)
