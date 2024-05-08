import axios from "axios";
import Producto from "../domain/entity/ProductTypes";
import UpdateProductRepository from "../domain/repository/UpdateProductRepository";
import OdooClient from "../../utils/odooConnection/createOdooClient";
import OdooUpdateRepository from "../../utils/odooConnection/odooUpdateRepository";

export default class UpdateProductUseCase {
    protected updateProductRepository: UpdateProductRepository;
    protected secureKey: string;
    protected odooClient: OdooClient;
    protected odooUpdateRepository: OdooUpdateRepository;
    
    constructor() {
        this.updateProductRepository = new UpdateProductRepository();
        this.secureKey = process.env.SECURE_KEY || '';
        this.odooClient = new OdooClient();
        this.odooUpdateRepository = new OdooUpdateRepository();
    }

    async execute(productReference: string, updatedData: Producto): Promise<Producto | null> {
        try {
            console.log("ref2", productReference);
            const updatedProduct = await this.updateProductRepository.execute(productReference, updatedData);
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

            const odooData = {
                name: updatedData.name,
                description: updatedData.description,
                list_price: updatedData.list_price,
                qty_available: updatedData.quantity,
                default_code: updatedData.reference, // Update field name to internalReference
                //image: updatedData.image_url
            };
            console.log(odooData.default_code);
            const odooUid = await this.odooClient.execute();
            await this.odooUpdateRepository.execute({
                uid: odooUid,
                endpoint: "product.product",
                data: odooData,
            });

            return updatedProduct;
        } catch (error) {
            console.error("Error al ejecutar el caso de uso de actualización de producto:", error);
            return null;
        }
    }
}
