import React, { useContext } from 'react';
import styles from './Cart.module.css';
import { cartContext } from '../../context/cartContext';
import Loader from '../Shared/Loader/Loader';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cartDetails, removeProduct, updateCount } = useContext(cartContext);

    async function deleteProduct(id) {
        await removeProduct(id);
    }

    async function updateItems(id,count) {
        await updateCount(id,count); 
    }

    return (
        <>
            {cartDetails ? cartDetails?.data?.products?.length == 0 ? <div className="container"><h1 className="text-center text-3xl my-6">Empty Cart</h1></div> : <div className="container py-8">
                <div className="flex flex-col my-6">
                    <h2 className="text-2xl font-bold">
                        Total Product Number: <span className="text-main font-bold">{cartDetails.numOfCartItems}</span>
                    </h2>
                    <h2 className="text-2xl font-bold">
                        Total Price: <span className="text-main font-bold">{cartDetails.data.totalCartPrice} EGP</span>
                    </h2>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Qty</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartDetails.data.products.map(product => (
                                <tr key={product.product._id} className="bg-white border-b hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.product.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button onClick={() => updateItems(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100">
                                                <span className="sr-only">Decrease quantity</span>
                                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 2" fill="none">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <span>{product.count}</span>
                                            <button onClick={() => updateItems(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100">
                                                <span className="sr-only">Increase quantity</span>
                                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {product.price} EGP
                                    </td>
                                    <td className="px-6 py-4">
                                        <span onClick={() => deleteProduct(product.product._id)} className="cursor-pointer font-bold text-red-600 dark:text-red-500 hover:underline">Remove</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <Link to={'/checkout'} className="bg-main hover:text-white text-white px-4 py-2 rounded-md my-4 flex justify-end">Check out</Link>
                </div>
            </div> : <div className="my-6"><Loader /></div>}
        </>
    )
}