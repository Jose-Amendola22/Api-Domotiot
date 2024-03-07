// useCases/DeleteProductUseCase.ts
import DeleteProductRepository from "../domain/repository/DeleteProductRepository";

export default class DeleteProductUseCase {
    protected deleteProductRepository: DeleteProductRepository;

    constructor() {
        this.deleteProductRepository = new DeleteProductRepository();
    }

    async execute(productId: number): Promise<void> {
        await this.deleteProductRepository.execute(productId);
    }
}
