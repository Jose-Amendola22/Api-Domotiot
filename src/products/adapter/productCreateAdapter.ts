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
        // Definir el esquema de validación con Joi
        const schema = Joi.object({
            nombre: Joi.string().required(),
            descripcion: Joi.string().allow('').optional(),
            precio: Joi.number().required(),
            imagenes: Joi.string().allow('').optional()
        });

        // Validar los datos del producto
        const { error } = schema.validate(productData);
        if (error) {
            throw new Error(`Error de validación: ${error.message}`);
        }

        // Si los datos son válidos, pasamos al caso de uso para crear el producto
        const createdProduct = await this.createProductUseCase.execute(productData);
        return createdProduct;
    }
}
