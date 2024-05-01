// adapters/ProductAdapter.ts
import Producto from "../domain/entity/ProductTypes";
import CreateProductUseCase from "../useCase/ProductCreateUseCase";
import Joi from 'joi';

export default class ProductAdapterCreate {
    protected createProductUseCase: CreateProductUseCase;

    constructor() {
        this.createProductUseCase = new CreateProductUseCase();
    }

    async createProduct(productData: Producto): Promise<Producto> {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                description: Joi.string().allow('').required(),
                quantity: Joi.number().required(),
                list_price: Joi.number().required(),
                reference: Joi.number().required(),
            });

            const { error } = schema.validate({
                name: productData.name,
                description: productData.description,
                list_price: productData.list_price,
                quantity: productData.quantity,
                reference: productData.reference
            });
            if (error) {
                throw new Error(`Error de validación: ${error.message}`);
            }

            const createdProduct = await this.createProductUseCase.execute(productData);

            return createdProduct;
        } catch (error) {
            // Manejar el error
            console.error("Error al crear el producto", error);
            throw error; // Re-lanzar el error para que el controlador lo maneje
        }
    }
}
