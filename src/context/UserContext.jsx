import { useState, useEffect } from 'react'
import { getProfileService } from '../services/authServices'
import { UserContext } from './userContextData'

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)

    //funcion para verificar la sesion del usuario(verifica access token)
    const checkSession = async () => {
        try {
            setLoading(true)
            const userData = await getProfileService()
            setUserInfo(userData)
        } catch (error) {
            console.log('No hay session activa: ', error)
            setUserInfo({})
        } finally {
            setLoading(false)
        }
    }

    //funcion para obtener el id del usuario autenticado
    const getUserId = () => {
        return userInfo?.id || null
    }

    //verificar si el usuario esta autenticado o no
    const isAuthenticated = () => {
        return !!userInfo?.id
    }

    useEffect(() => {
        Promise.resolve().then(checkSession)
    }, [])

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                loading,
                checkSession,
                getUserId,
                isAuthenticated,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
