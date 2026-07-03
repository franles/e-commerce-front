import { useForm } from 'react-hook-form'
import { useProduct } from '../../../context/productContextData'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const UpdateProductForm = ({ product }) => {
    const { updateProduct } = useProduct()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange', defaultValues: product })

    const onSubmit = async (data) => {
        const result = await updateProduct(product._id, data)

        if(result.success){
            toast.success(result.message)
            navigate('/admin/dashboard/products')
        } else {
            toast.error(result.message)
        }
    }

    return (
                <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
        >
            <div>
                <input
                    {...register('name', {
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 3,
                            message: 'Mínimo 3 caracteres',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Máximo 50 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border-2 focus:outline-primary w-full ${errors.name ? 'border-red-400 outline-red-400 focus:outline-red-400' : 'border-gray-300 focus:outline-primary'}`}
                    placeholder="Nombre del producto"
                    type="text"
                    autoComplete="name"
                    name="name"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('description', {
                        required: 'La descripción es requerida',
                        minLength: {
                            value: 20,
                            message: 'Mínimo 20 caracteres',
                        },
                        maxLength: {
                            value: 250,
                            message: 'Máximo 250 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border-2 focus:outline-primary w-full ${errors.description ? 'border-red-400 outline-red-400 focus:outline-red-400' : 'border-gray-300 focus:outline-primary'}`}
                    placeholder="Descripción"
                    type="text"
                    autoComplete="description"
                    name="description"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('price', {
                        required: 'El precio es requerido',
                        minLength: {
                            value: 0,
                            message: 'El precio debe ser mayor a 0',
                        },
                    })}
                    className={`p-2 outline-2 rounded border-2 focus:outline-primary w-full ${errors.price ? 'border-red-400 outline-red-400 focus:outline-red-400' : 'border-gray-300 focus:outline-primary'}`}
                    placeholder="Precio"
                    type="number"
                    min="0"
                    autoComplete="price"
                    name="price"
                />
                {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.price.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('stock', {
                        required: 'El stock es requerido',
                        minLength: {
                            value: 0,
                            message: 'El stock debe ser mayor a 0',
                        },
                    })}
                    className={`p-2 outline-2 rounded border-2 focus:outline-primary w-full ${errors.stock ? 'border-red-400 outline-red-400 focus:outline-red-400' : 'border-gray-300 focus:outline-primary'}`}
                    placeholder="Stock"
                    type="number"
                    min="0"
                    autoComplete="stock"
                    name="stock"
                />
                {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.stock.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('imageUrl', {
                        required: 'La URL de la imagen es requerida',
                        pattern: {
                            value: /^(http|https):\/\/[^ "]+$/,
                            message: 'Ingrese una URL válida',
                        },
                    })}
                    className={`p-2 outline-2 rounded border-2 focus:outline-primary w-full ${errors.imageUrl ? 'border-red-400 outline-red-400 focus:outline-red-400' : 'border-gray-300 focus:outline-primary'}`}
                    placeholder="URL de la imagen"
                    type="text"
                    autoComplete="imageUrl"
                    name="imageUrl"
                />
                {errors.imageUrl && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.imageUrl.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors"
            >
                Actualizar Producto
            </button>
        </form>
    )
}

export default UpdateProductForm
