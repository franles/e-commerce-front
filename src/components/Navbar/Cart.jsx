import { FiShoppingCart } from 'react-icons/fi'
import ModalCart from './ModalCart.jsx'
import { useCart } from '../../context/cartContextData.js'

const Cart = () => {
    const { total, itemsQuantity, openModal, isModalOpen } = useCart()

    const handleViewCartClick = () => {
        //cerrar el dropdown quitandi el focus
        document.activeElement.blur()
        //abrir el modal
        openModal()
    }

    return (
        <>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-success btn-circle"
                    >
                        <div className="indicator">
                            <FiShoppingCart size={24} />
                            <span className="badge badge-sm indicator-item rounded-full bg-red-500 text-white">
                                {itemsQuantity}
                            </span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1000] mt-3 w-52 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">
                                {itemsQuantity} items
                            </span>
                            <span className="text-info">
                                Subtotal: ${total}
                            </span>
                            <div className="card-actions">
                                <button
                                    onClick={handleViewCartClick}
                                    className="btn btn-primary btn-block"
                                >
                                    Ver Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <ModalCart />}
        </>
    )
}

export default Cart
