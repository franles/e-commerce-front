
import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { ProductContext } from './productContextData.js'

axios.defaults.withCredentials = true
const API_URL = import.meta.env.VITE_BACKEND_URL + '/products'

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [productsLoading, setProductsLoading] = useState(false)
    const [productLoading, setProductLoading] = useState(false)
    const [error, setError] = useState(null)
    const hasRunRef = useRef(false)

    //Funcion para obtener productos
    const getProducts = useCallback(async () => {
        try {
            setProductsLoading(true)
            const response = await axios.get(API_URL)
            setProducts(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener los productos')
        } finally {
            setProductsLoading(false)
        }
    }, [])

    //funcion para obtener productos con id
    const getProductById = useCallback(async (id) => {
        setProductLoading(true)
        setProduct({})
        try {
            const response = await axios.get(`${API_URL}/${id}`)
            setProduct(response.data)
        } catch (error) {
            setError(error.message || 'Error al obtener el producto')
        } finally {
            setProductLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!hasRunRef.current) {
            hasRunRef.current = true
            getProducts()
        }
    }, [getProducts])

    const value = {
        products,
        product,
        productsLoading,
        productLoading,
        error,
        getProducts,
        getProductById,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

//Hook personalizado
