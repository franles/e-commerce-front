import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import { UserContextProvider } from '../src/context/UserContext.tsx'
import { Toaster } from 'react-hot-toast'
import { ProductContextProvider } from './context/ProductContext.jsx'

function App() {
    return (
        <UserContextProvider>
            <ProductContextProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Route>
                </Routes>
            </ProductContextProvider>
            <Toaster />
        </UserContextProvider>
    )
}

export default App
