// useCases/CreateProductUseCase.ts
import Producto from "../domain/entity/ProductTypes";
import CreateProductRepository from "../domain/repository/CreateProductRepository";

export default class CreateProductUseCase {
    protected createProductRepository: CreateProductRepository;

    constructor() {
        this.createProductRepository = new CreateProductRepository();
    }

    async execute(productData: Producto): Promise<Producto> {
        const createdProduct = await this.createProductRepository.execute(productData);
        return createdProduct;
    }
}

