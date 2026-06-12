import { Link } from 'react-router-dom'
import AuthButtons from './AuthButtons.jsx'
import Cart from './Cart.jsx'
import UserDropDown from './UserDropDown.jsx'
import { useUser } from '../../context/userContextData.ts'

const Navbar = () => {
    const { loading, userInfo } = useUser()

    return (
        <header>
            <AuthButtons />
            <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full">
                <div className="navbar-start">
                    <Link className="btn btn-ghost" to="/">
                        E-Comerce
                    </Link>
                </div>
                <div className="navbar-end gap-3">
                    {userInfo.isAdmin && (
                        <a className="btn btn-primary">Dashboard</a>
                    )}
                    <Cart />
                    {!loading && userInfo?.username && <UserDropDown />}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
