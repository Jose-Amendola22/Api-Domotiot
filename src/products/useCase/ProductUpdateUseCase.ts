import axios from "axios";
import Producto from "../domain/entity/ProductTypes";
import UpdateProductRepository from "../domain/repository/UpdateProductRepository";

export default class UpdateProductUseCase {
    protected updateProductRepository: UpdateProductRepository;
    protected secureKey: string;

    constructor() {
        this.updateProductRepository = new UpdateProductRepository();

        // Cargar las variables de entorno desde el archivo .env
        
        // Obtener la clave de seguridad desde las variables de entorno
        this.secureKey = process.env.SECURE_KEY || '';
    }

    async execute(productId: number, updatedData: Producto): Promise<Producto | null> {
        try {
            const updatedProduct = await this.updateProductRepository.execute(productId, updatedData);
            const secureKey = 'ed3fa1ce558e1c2528cfbaa3f9940';
            
            const transformedData = {
                price: updatedData.list_price, // Precio
                status: 1, // Estado del producto (1 para activo)
                reference: updatedData.reference, // Referencia del producto
                quantity: updatedData.quantity, // Cantidad disponible
                name: updatedData.name, // Nombre del producto
                description: updatedData.description // Descripción del producto
            };
            
            // Llamada a la API de PrestaShop utilizando Axios
            await axios.put(`http://localhost:8082/backend/update-product.php?secure_key=${secureKey}`, transformedData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return updatedProduct;
        } catch (error) {
            console.error("Error al ejecutar el caso de uso de actualización de producto:", error);
            return null;
        }
    }
}
