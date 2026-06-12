import { createContext, useContext } from 'react'
import type { UserContextValue } from '../types/user'

export const UserContext = createContext<UserContextValue | null>(null)

export const useUser = () => {
    const ctx = useContext(UserContext)

    if (!ctx) throw new Error('useUser must be used inside UserContextProvider')
    return ctx
}
