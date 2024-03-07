import Producto from "../entity/ProductTypes";
import ConnectionSource from "../../../utils/database/connection";

export default class GetProductsRepository {
    async getAllProducts(): Promise<Producto[]> {
        const connection = await ConnectionSource.connect();
        return await connection.getRepository(Producto).find();
    }
}