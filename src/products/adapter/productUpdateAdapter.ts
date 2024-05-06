import Producto from "../domain/entity/ProductTypes";
import UpdateProductUseCase from "../useCase/ProductUpdateUseCase";
import Joi from 'joi';

export default class ProductUpdateAdapter {
    protected updateProductUseCase: UpdateProductUseCase;

    constructor() {
        this.updateProductUseCase = new UpdateProductUseCase();
    }

    async updateProduct(productReference: string, updatedData: Producto): Promise<Producto | null> {
        // Definir el esquema de validación con Joi
        const schema = Joi.object({
            name: Joi.string().required(),
            reference: Joi.string().required(),
            quantity: Joi.number().required(),
            description: Joi.string().allow('').required(),
            list_price: Joi.number().required(),
        });

        // Validar los datos actualizados del producto
        const { error } = schema.validate(updatedData);
        if (error) {
            console.error('Error de validación:', error.details[0].message);
            return null;
        }

        // Si los datos son válidos, llamar al caso de uso para actualizar el producto
        try {
            const updatedProduct = await this.updateProductUseCase.execute(productReference, updatedData);
            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return null;
        }
    }
}


