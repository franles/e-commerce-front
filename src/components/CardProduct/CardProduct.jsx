import { Link } from 'react-router'
//import { useUser } from '../../context/userContextData.ts'
import { FaShoppingCart } from 'react-icons/fa'

const CardProduct = ({
    product: { _id, name, price, imageUrl, description, stock },
}) => {
    //const { isAuthenticated } = useUser()

    return (
        <div className="card bg-base-100 w-80 lg:w-[30%] shadow-lg">
            <figure>
                <img
                    className="aspect-[9/9] objet-cover"
                    src={imageUrl}
                    alt="Producto"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <div className="badge badge-warning">${price}</div>
                <p>{description}</p>
                <div className="card-actions justify-between mt-4">
                    <Link
                        to={`/detailProduct/${_id}`}
                        className="btn btn-info btn-sm md:btn-md"
                    >
                        Ver Detalles
                    </Link>
                    <button
                        disabled={stock === 0}
                        className="btn btn-success btn-sm md:btn-md"
                    >
                        <FaShoppingCart size={16} />
                        {stock === 0 ? 'Sin Stock' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardProduct
