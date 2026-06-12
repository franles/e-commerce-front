import axios from 'axios'

//configuracion de base de axios para autenticacion
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
// http://localhost:3000/api/auth/register
// http://localhost:3000/api/auth/profile

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

export const loginService = async () => {}

export const registerService = async (
    data,
    reset,
    setRedirect,
    checkSession 
) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        console.log('RESPUESTA', response)

        if (response.status === 201 || response.status === 200) {
            //verificar la sesion real del servidor despues del registro
            await checkSession()
            reset()
            setRedirect(true)
        }
    } catch (error) {
        console.log(error)
        alert('ERROR AL REGISTRAR EL USUARIO')
    }
}

export const logoutService = async () => {}
