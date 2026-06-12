import axios from 'axios'

//configuracion de base de axios para autenticacion
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
// http://localhost:3000/api/auth/register
// http://localhost:3000/api/auth/profile
// http://localhost:3000/api/auth/login

//para incluir la cookies en las peticiones
axios.defaults.withCredentials = true

// http://localhost:3000/api/auth/register
export const getProfileService = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`)
        console.log('RESPONSE A /profile ', response)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el perfil del usuario', {
            cause: error,
        })
    }
}

export const loginService = async (data, reset, setRedirect, setUserInfo) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        //comprobar si la respuesta es exitosa

        if (response.status === 200) {
            setUserInfo(response.data)
            reset()
            setRedirect(true)
            return {
                success: true,
                message: 'Inicio de sesión exitoso',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error al loguearse',
            error: error.message,
        }
    }
}

export const registerService = async (data, reset, checkSession) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        if (response.status === 201 || response.status === 200) {
            //verificar la sesion real del servidor despues del registro
            await checkSession()
            reset()

            return {
                success: true,
                message: 'Registro exitoso',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Error al registrarse',
            error: error.message,
        }
    }
}

export const logoutService = async () => {}
