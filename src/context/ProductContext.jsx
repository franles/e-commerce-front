// TODO:
// Resolver advertencias de ESLint:
// - react-refresh/only-export-components
// - variables sin uso
// - revisar set-state-in-effect

import {
    useState,
    useEffect,
    useCallback,
    useContext,
    createContext,
} from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true
const API_URL = import.meta.env.VITE_BACKEND_URL + '/products'

export const ProductContext = createContext({})

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [productsLoading, setProductsLoading] = useState(false)
    const [productLoading, setProductLoading] = useState(false)
    const [error, setError] = useState(null)

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

    useEffect(() => {
        getProducts()
    }, [getProducts])

    const value = {
        products,
        product,
        productsLoading,
        productLoading,
        error,
        getProducts,
    }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

//Hook personalizado
export const useProduct = () => useContext(ProductContext)
