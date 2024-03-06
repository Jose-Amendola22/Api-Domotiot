import { Connection, Repository } from "typeorm";
import ConnectionSource from "../../../utils/database/connection";
import Producto from "../entity/ProductTypes";

export default class GetProductByIdRepository {
    async execute(productId: number): Promise<Producto | undefined> {
        const connection: Connection = await ConnectionSource.connect();
        const productRepository: Repository<Producto> = connection.getRepository(Producto);
        const producto: Producto | null = await productRepository.findOne({ where: { id: productId } });

        if (!producto) {
            throw new Error('Producto no encontrado.');
        }

        return producto;
    }
}

