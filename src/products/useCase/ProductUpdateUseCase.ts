import Producto from "../domain/entity/ProductTypes";
import UpdateProductRepository from "../domain/repository/UpdateProductRepository";

export default class UpdateProductUseCase {
    protected updateProductRepository: UpdateProductRepository;

    constructor() {
        this.updateProductRepository = new UpdateProductRepository();
    }

    async execute(productId: number, updatedData: Producto): Promise<Producto | null> {
        try {
            const updatedProduct = await this.updateProductRepository.execute(productId, updatedData);
            return updatedProduct;
        } catch (error) {
            console.error("Error al ejecutar el caso de uso de actualización de producto:", error);
            return null;
        }
    }
}

