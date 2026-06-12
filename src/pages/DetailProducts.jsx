import { useProduct } from '../context/productContextData.js'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()

    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    return (
        <>
            {productLoading ? (
                <div className="loading loading-spinner"></div>
            ) : (
                <div className="mt-6 md:flex">
                    <div className="md:w-1/2">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <section className="flex flex-col gap-5 pt-2 md:pt-0 md:pl-0 md:w-1/2">
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <p className="mt-2 text-lg font-normal">
                            {product.description}
                        </p>
                        <br />
                        <br />
                        <p className="mt-2 text-3xl font-bold badge badge-warning p-4">
                            ${product.price}
                        </p>
                        <p className="mt-2">
                            Unidades en stock: {product.stock}
                        </p>
                        <button className="btn btn-success mt-2 md:mt-auto md:btn-lg">
                            <FaShoppingCart size={16} />
                            Agregar al carrito
                        </button>
                    </section>
                </div>
            )}
        </>
    )
}

export default DetailProduct
