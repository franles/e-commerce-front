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

    //funcion para actualizar un producto
    const updateProduct = useCallback(async (id, data) => {
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
        }

        try {
            const response = await axios.put(`${API_URL}/${id}`, cleanData, {
                withCredentials: true,
            })
            if (response.status === 200) {
                //actualizar el producto indiuvidual
                setProduct(response.data)
                //actualizar el producto en la lista de productos
                setProducts((prevProducts) =>
                    prevProducts.map((p) => (p._id === id ? response.data : p)),
                )
                return {
                    success: true,
                    message: 'Producto actualizado correctamente',
                }
            }
        } catch (error) {
            setError(error.message || 'Error al actualizar el producto')
            return {
                success: false,
                message: 'Error al actualizar el producto',
            }
        } finally {
            setProductsLoading(false)
            setProductLoading(false)
        }
    }, [])

    //funcion para crear un producto
    const createProduct = useCallback(async (data) => {
        const cleanData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            imageUrl: data.imageUrl,
        }

        try {
            const response = await axios.post(API_URL, cleanData, {
                withCredentials: true,
            })
            if (response.status === 201) {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    response.data.product,
                ])

                return {
                    success: true,
                    message: response.data.message,
                }
            }
        } catch (error) {
            console.log(JSON.stringify(error.response.data, null, 2));

            //setError(error.message || 'Error al crear el producto')
            return {
                success: false,
                message: error.message || 'Error al crear el producto',
            }
        } finally {
            setProductLoading(false)
        }
    }, [])

    const deleteProduct = useCallback(async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`, {
                withCredentials: true,
            })
            if (response.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.filter((p) => p._id !== id),
                )

                return {
                    success: true,
                    message: 'Producto eliminado correctamente',
                }
            }
        } catch (error) {
            setError(error.message || 'Error al eliminar el producto')
            return {
                success: false,
                message: 'Error al eliminar el producto',
            }
        } finally {
            setProductsLoading(false)
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
        updateProduct,
        createProduct,
        deleteProduct,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

//Hook personalizado
