import axios from 'axios'

//configuracion base de axios
// http://localhost:3000/api/cart
const API_URL = import.meta.env.VITE_BACKEND_URL + '/cart'

axios.defaults.withCredentials = true

//servicio para agregar productos al carrito
export const addToCartService = async (userId, productId, quantity = 1) => {
    try {
        const response = await axios.post(`${API_URL}/add`, {
            userId,
            productId,
            quantity,
        })

        return response.data
    } catch (error) {
        throw new Error('Error al agregar el producto al carrito', {
            cause: error,
        })
    }
}

//serivicio para obtener el carrito del usuario
export const getCartService = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/get/${userId}`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener el carrito del usuario', {
            cause: error,
        })
    }
}

//servicio para actualizar la cantidad de un producto en el carrito
export const updateCartService = async (userId, productId, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/update/${userId}`, {
            productId,
            quantity,
        })
        return response.data
    } catch (error) {
        throw new Error('Error al actualizar el carrito', {
            cause: error,
        })
    }
}

//servicio para eliminar un producto del carrito
export const deleteCartService = async (userId, productId) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${userId}`, {
            data: { productId },
        })
        return response.data
    } catch (error) {
        throw new Error('Error al eliminar el producto del carrito', {
            cause: error,
        })
    }
}

//servicio para limpiar todo el carrito
export const clearCartService = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/clear/${userId}`)
        return response.data
    } catch (error) {
        throw new Error("Error al limpiar el carrito", {
            cause: error
        });
    }
}

//servicio para obtener precio total del carrito
export const getCartTotalService = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/total/${userId}`)
        return response.data
    } catch (error) {
        throw new Error('Error al obtener el precio total del carrito', {
            cause: error,
        })
    }
}