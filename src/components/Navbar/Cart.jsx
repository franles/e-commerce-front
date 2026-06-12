import { FiShoppingCart } from 'react-icons/fi'

const Cart = () => {
    return (
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
                            2
                        </span>
                    </div>
                </div>
                <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 z-[1000] mt-3 w-52 shadow"
                >
                    <div className="card-body">
                        <span className="text-lg font-bold">2 Item</span>
                        <span className="text-info">Subtotal: $3000</span>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-block">
                                Ver Carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
