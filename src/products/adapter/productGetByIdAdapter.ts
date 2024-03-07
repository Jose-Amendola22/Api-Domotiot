import Producto from '../domain/entity/ProductTypes';
import GetProductByIdUseCase from '../useCase/ProductTypeByIdUseCase';

export default class ProductAdapterGetById {

    protected getProductByIdUseCase: GetProductByIdUseCase;
 
    constructor() {
        this.getProductByIdUseCase = new GetProductByIdUseCase();
    }

    async getProductById(productId: number): Promise<Producto> {
        const product = await this.getProductByIdUseCase.execute(productId);
        return product;
    }
}

