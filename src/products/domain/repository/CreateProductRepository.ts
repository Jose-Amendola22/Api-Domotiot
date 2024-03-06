import ConnectionSource from "../../../utils/database/connection";
import repository from "../../../utils/infrastructure/repository";
import Product from "../../../products/domain/entity/ProductTypes";

export default class CreateProductRepository implements repository<Product, Product> {
    async execute(data: Product): Promise<Product> {
        const connection = await ConnectionSource.connect();
        const newProduct = await connection.getRepository(Product).create(data);
        return newProduct;
    }
}
