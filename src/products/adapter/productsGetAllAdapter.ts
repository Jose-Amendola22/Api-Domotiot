
import Producto from "../domain/entity/ProductTypes";
import GetAllProductsUseCase from "../useCase/ProductGetAllUseCase";

export default class ProductsGetAllAdapter {
    protected getAllProductsUseCase: GetAllProductsUseCase;

    constructor() {
        this.getAllProductsUseCase = new GetAllProductsUseCase();
    }

    async getAllProducts(): Promise<Producto[]> {
        return await this.getAllProductsUseCase.execute();
    }
}
