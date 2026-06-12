import { createContext, useContext } from 'react'

export const ProductContext = createContext({})

export const useProduct = () => {
    const ctx = useContext(ProductContext)

    if (!ctx)
        throw new Error('useProduct must be used inside ProductContextProvider')
    return ctx
}
