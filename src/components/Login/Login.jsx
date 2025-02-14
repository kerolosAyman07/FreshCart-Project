import React, { useContext, useState } from 'react'
import styles from './Login.module.css'
import { ClipLoader } from 'react-spinners'
import * as Yup from 'yup'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../../context/tokenContext'

export default function Login() {
    const [count, setCount] = useState(0)

    const [isCallingApi, setIsCallingApi] = useState(false)
    const [apiError, setApiError] = useState(null)
    let {setToken} = useContext(tokenContext)

    let navigate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required("Required"),
        password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'),'Invalid password').required("Required"),
    })

    const loginForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: callApiLogin
    })

    async function callApiLogin(values){
        try{
            setIsCallingApi(true)
            setApiError(null)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            localStorage.setItem("userToken",data.token)
            setToken(data.token)
            setIsCallingApi(false)
            navigate("/")
        }
        catch(error){
            setApiError(error.response.data.message)
            setIsCallingApi(false)
        }

    }

    return (
        <form onSubmit={loginForm.handleSubmit} className="w-3/4 mx-auto">
            <h2 className='text-3xl mb-2 my-4'>Login Now :</h2>
            <div>
                {apiError ? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {apiError}
                </div> : ''}
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
                <input type="email" id="email" onBlur={loginForm.handleBlur} value={loginForm.values.email} onChange={loginForm.handleChange} name="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-maindark:shadow-xs-light" required />
                <div>
                    {loginForm.errors.email && loginForm.touched.email? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {loginForm.errors.email}
                    </div> : ''}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password:</label>
                <input type="password" id="password" onBlur={loginForm.handleBlur} value={loginForm.values.password} onChange={loginForm.handleChange} name="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light" required />
                <div>
                    {loginForm.errors.password && loginForm.touched.password? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {loginForm.errors.password}
                    </div> : ''}
                </div>
            </div>

            {isCallingApi ? <div className="w-auto flex justify-end">
                <div className='border-main p-2 rounded-md'>
                    <ClipLoader color='#0aad0a' size={20} />
                </div>
            </div> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:main block ml-auto">Login</button>
            }
        </form>
    )
}

