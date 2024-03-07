// En tu caso de uso
import Producto from "../domain/entity/ProductTypes";
import GetProductsRepository from "../domain/repository/GetProductsRepository";

export default class GetAllProductsUseCase {
    protected productRepository: GetProductsRepository;

    constructor() {
        this.productRepository = new GetProductsRepository();
    }

    async execute(): Promise<Producto[]> {
        return await this.productRepository.getAllProducts();
    }
}
