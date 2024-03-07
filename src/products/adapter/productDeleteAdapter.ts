import DeleteProductUseCase from "../useCase/ProductoDeleteUseCase";

export default class ProductDeleteAdapter {
    protected deleteProductUseCase: DeleteProductUseCase;

    constructor() {
        this.deleteProductUseCase = new DeleteProductUseCase();
    }

    async deleteProduct(productId: number): Promise<void> {
        await this.deleteProductUseCase.execute(productId);
    }
}
