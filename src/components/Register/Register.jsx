import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const [count, setCount] = useState(0)
    const [isCallingApi, setIsCallingApi] = useState(false)
    const [apiError, setApiError] = useState(null)

    let navigate = useNavigate()

    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Min length is 3").max(15, "Max length is 15").required("Required"),
        email: Yup.string().email('Invalid email').required("Required"),
        password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'),'Invalid password').required("Required"),
        rePassword: Yup.string().oneOf([Yup.ref('password')],'RePassword is not match password').required("Required"),
        phone: Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'),'Invalid phone').required("Required"),
    })

    const registerForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: callApiRegister
    })

    async function callApiRegister(values){
        try{
            setIsCallingApi(true)
            setApiError(null)
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            console.log(data);
            setIsCallingApi(false)
            navigate("/login")
        }
        catch(error){
            setApiError(error.response.data.message)
            setIsCallingApi(false)
        }
    }

    return (
        <form onSubmit={registerForm.handleSubmit} className="w-3/4 mx-auto">
            <h2 className='text-3xl mb-2 my-4'>Register Now :</h2>
            <div>
                {apiError ? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {apiError}
                </div> : ''}
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name:</label>
                <input type="text" id="name" onBlur={registerForm.handleBlur} value={registerForm.values.name} onChange={registerForm.handleChange} name="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-maindark:shadow-xs-light" required />
                <div>
                    {registerForm.errors.name && registerForm.touched.name? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {registerForm.errors.name}
                    </div> : ''}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email:</label>
                <input type="email" id="email" onBlur={registerForm.handleBlur} value={registerForm.values.email} onChange={registerForm.handleChange} name="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-maindark:shadow-xs-light" required />
                <div>
                    {registerForm.errors.email && registerForm.touched.email? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {registerForm.errors.email}
                    </div> : ''}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password:</label>
                <input type="password" id="password" onBlur={registerForm.handleBlur} value={registerForm.values.password} onChange={registerForm.handleChange} name="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light" required />
                <div>
                    {registerForm.errors.password && registerForm.touched.password? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {registerForm.errors.password}
                    </div> : ''}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RePassword:</label>
                <input type="password" id="rePassword" onBlur={registerForm.handleBlur} value={registerForm.values.rePassword} onChange={registerForm.handleChange} name="rePassword" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light" required />
                <div>
                    {registerForm.errors.rePassword && registerForm.touched.rePassword? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {registerForm.errors.rePassword}
                    </div> : ''}
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
                <input type="text" id="phone" onBlur={registerForm.handleBlur} value={registerForm.values.phone} onChange={registerForm.handleChange} name="phone" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main dark:shadow-xs-light" required />
                <div>
                    {registerForm.errors.phone && registerForm.touched.phone? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {registerForm.errors.phone}
                    </div> : ''}
                </div>
            </div>

            {isCallingApi ? <div className="w-auto flex justify-end">
                <div className='border-main p-2 rounded-md'>
                    <ClipLoader color='#0aad0a' size={20} />
                </div>
            </div> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:main block ml-auto">Register</button>
            }
        </form>
    )
}
