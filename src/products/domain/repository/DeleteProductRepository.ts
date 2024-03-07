// domain/repository/DeleteProductRepository.ts
import ConnectionSource from "../../../utils/database/connection";
import Producto from "../entity/ProductTypes";

export default class DeleteProductRepository {
    async execute(productId: number): Promise<void> {
        const connection = await ConnectionSource.connect();
        await connection.getRepository(Producto).delete(productId);
    }
}



