import Producto from "../domain/entity/ProductTypes";
import UpdateProductUseCase from "../useCase/ProductUpdateUseCase";
import Joi from 'joi';

export default class ProductUpdateAdapter {
    protected updateProductUseCase: UpdateProductUseCase;

    constructor() {
        this.updateProductUseCase = new UpdateProductUseCase();
    }

    async updateProduct(productId: number, updatedData: Producto): Promise<Producto | null> {
        // Definir el esquema de validación con Joi
        const schema = Joi.object({
            nombre: Joi.string().required(),
            descripcion: Joi.string().allow('').optional(),
            precio: Joi.number().required(),
            imagenes: Joi.string().allow('').optional()
        });

        // Validar los datos actualizados del producto
        const { error } = schema.validate(updatedData);
        if (error) {
            console.error('Error de validación:', error.details[0].message);
            return null;
        }

        // Si los datos son válidos, llamar al caso de uso para actualizar el producto
        try {
            const updatedProduct = await this.updateProductUseCase.execute(productId, updatedData);
            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return null;
        }
    }
}


