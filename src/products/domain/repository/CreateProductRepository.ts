// domain/repository/CreateProductRepository.ts
import Producto from "../entity/ProductTypes";
import ConnectionSource from "../../../utils/database/connection";

export default class CreateProductRepository {
    async execute(productData: Producto): Promise<Producto> {
        // Aquí tendrías la lógica para insertar el nuevo producto en la base de datos.
        const connection = await ConnectionSource.connect();
        const newProduct = await connection.getRepository(Producto).create(productData);
        return newProduct;
    }
}

