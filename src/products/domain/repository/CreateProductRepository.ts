import Producto from "../entity/ProductTypes";
import ConnectionSource from "../../../utils/database/connection";

export default class CreateProductRepository {
    async execute(productData: Producto): Promise<Producto> {
        try {
            const connection = await ConnectionSource.connect();
            const newProduct = await connection.getRepository(Producto).create(productData);
            await connection.manager.save(newProduct); // Guardamos el nuevo producto en la base de datos
            return newProduct;
        } catch (error) {
            throw new Error('Error al crear el producto en la base de datos');
        }
    }
}

