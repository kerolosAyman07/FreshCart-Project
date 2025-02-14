import React, { useContext, useState } from 'react'
import styles from './Checkout.module.css'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { tokenContext } from '../../context/tokenContext'
import { useNavigate } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'

export default function Checkout() {
    const [count, setCount] = useState(0)
    const [isCallingApi, setIsCallingApi] = useState(false)
    const [apiError, setApiError] = useState(null)
    const [isOnline, setIsOnline] = useState(false)


    let {cashOnDelievry , onlinePayment} = useContext(cartContext)

    const initialValues = {
        details: '',
        phone: '',
        city: '',
    }

    const validationSchema = Yup.object().shape({
        details: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
    })

    const shippingForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: callPayment
    })

    async function callPayment(values){
        
        try{
            setIsCallingApi(true)
            if(isOnline){
                let x = await onlinePayment(values)
                window.location.href = x.session.url
            }
            else{
                await cashOnDelievry(values)
            }
        }
        catch(error){
            setIsCallingApi(false)
        }
    }

    return (
        <form onSubmit={shippingForm.handleSubmit} className="w-3/4 mx-auto">
            <h2 className='text-3xl mb-2 my-4'>Shipping info:</h2>
            <div>
                {apiError ? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {apiError}
                </div> : ''}
            </div>
            <div className="mb-5">
                <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details:</label>
                <input type="text" name="details" id="details" onBlur={shippingForm.handleBlur} value={shippingForm.values.details} onChange={shippingForm.handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-maindark:shadow-xs-light" required />
                <div>
                    {shippingForm.errors.details && shippingForm.touched.details? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {shippingForm.errors.details}
                    </div> : ''}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
                <input type="tel" name="phone" id="phone" onBlur={shippingForm.handleBlur} value={shippingForm.values.phone} onChange={shippingForm.handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-maindark:shadow-xs-light" required />
                <div>
                    {shippingForm.errors.phone && shippingForm.touched.phone? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {shippingForm.errors.phone}
                    </div> : ''}
                </div>
            </div>            
            <div className="mb-5">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City:</label>
                <input type="text" name="city" id="city" onBlur={shippingForm.handleBlur} value={shippingForm.values.city} onChange={shippingForm.handleChange} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-maindark:shadow-xs-light" required />
                <div>
                    {shippingForm.errors.city && shippingForm.touched.city? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {shippingForm.errors.city}
                    </div> : ''}
                </div>
            </div>
            <div className="mb-5 flex items-center">
                <input type="checkbox" value={'online'} onChange={()=> setIsOnline(true)} name="" id="" />
                <label className="ms-2 font-bold" htmlFor="">Online</label>
            </div>
            {isCallingApi ? <div className="w-auto flex justify-end">
                <div className='border-main p-2 rounded-md'>
                    <ClipLoader color='#0aad0a' size={20} />
                </div>
            </div> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:main block ml-auto">Pay now</button>
            }
        </form>
    )

}
