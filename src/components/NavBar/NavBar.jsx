import React, { useContext, useState } from 'react'
import styles from './NavBar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'
import { cartContext } from '../../context/cartContext'

export default function NavBar() {
    const [count, setCount] = useState(0)
    let {token,setToken} = useContext(tokenContext)
    let {numOfCartItems} = useContext(cartContext)
    let {numOfWishListCart} = useContext(cartContext)

    let navigate = useNavigate()

    function logOut(){
        localStorage.removeItem("userToken")
        setToken(null)
        navigate("/login")
    }



    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="logo" />
                    <div className="hidden w-full absolute md:relative md:top-0 top-[70px] left-0 md:block md:w-auto" id="navbar-default">
                      
                      {token ? <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to={''} className="block font-bold py-2 px-3 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-main" aria-current="page">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'cart'} className="block font-bold py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart <span className="rounded-3xl px-2 py-1 font-bold text-white bg-main">{numOfCartItems}</span></NavLink>
                            </li>
                            <li>
                                <NavLink to={'products'} className="block font-bold py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
                            </li>
                            <li>
                                <NavLink to={'categories'} className="block font-bold py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
                            </li>
                            <li>
                                <NavLink to={'brands'} className="block font-bold py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
                            </li>
                            <li>
                                <NavLink to={'wishlist'} className="block font-bold py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wish List<span className="rounded-3xl ms-1 px-2 py-1 font-bold text-white bg-main">{numOfWishListCart}</span></NavLink>
                            </li>
                        </ul> : ''}   
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <ul className='flex gap-3'>
                        <li><i className='fa-brands fa-instagram hover:text-main'></i></li>
                        <li><i className='fa-brands fa-facebook  hover:text-main'></i></li>
                        <li><i className='fa-brands fa-tiktok  hover:text-main'></i></li>
                        <li><i className='fa-brands fa-twitter  hover:text-main'></i></li>
                        <li><i className='fa-brands fa-linkedin  hover:text-main'></i></li>
                        <li><i className='fa-brands fa-youtube  hover:text-main'></i></li>
                    </ul>
                    {token ? <li>
                        <span onClick={logOut} className='hover:text-black text-main cursor-pointer font-bold'>SignOut</span>
                    </li> : <> <ul className='flex gap-3'>
                        <li><NavLink to={'register'}>Register</NavLink></li>
                        <li><NavLink to={'login'}>Login</NavLink></li>
                    </ul>
                    </>}

                </div>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </div>
        </nav>
    )
}
