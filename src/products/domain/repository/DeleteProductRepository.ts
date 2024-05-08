// domain/repository/DeleteProductRepository.ts
import ConnectionSource from "../../../utils/database/connection";
import Producto from "../entity/ProductTypes";

export default class DeleteProductRepository {
    async execute(productId: string): Promise<void> {
        const connection = await ConnectionSource.connect();
        await connection.getRepository(Producto).update({ reference: productId }, { is_Active: 0 });
    }
}



