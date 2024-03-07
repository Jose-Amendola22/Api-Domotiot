import Producto from "../entity/ProductTypes";
import ConnectionSource from "../../../utils/database/connection";

export default class UpdateProductRepository {
    async execute(productId: number, updatedData: Producto): Promise<Producto | null> {
        try {
            const connection = await ConnectionSource.connect();
            const productRepository = connection.getRepository(Producto);

            // Busca el producto existente por su ID
            const existingProduct: Producto | null = await productRepository.findOne({ where: { id: productId } });

            if (!existingProduct) {
                throw new Error("Producto no encontrado");
            }

            // Actualiza los campos del producto con los datos actualizados
            Object.assign(existingProduct, updatedData);

            // Guarda el producto actualizado en la base de datos
            const updatedProduct = await productRepository.save(existingProduct);
            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            return null;
        }
    }
}



