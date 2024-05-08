// useCases/DeleteProductUseCase.ts
import axios from "axios";
import DeleteProductRepository from "../domain/repository/DeleteProductRepository";
import OdooDeleterepository from "../../utils/odooConnection/odooDeleteRepository copy";
import OdooClient from "../../utils/odooConnection/createOdooClient";

export default class DeleteProductUseCase {
    protected deleteProductRepository: DeleteProductRepository;
    protected secureKey: string;
    protected odooDeleterepository: OdooDeleterepository;
    protected odooClient: OdooClient;

    constructor() {
        this.deleteProductRepository = new DeleteProductRepository();
        this.secureKey = process.env.SECURE_KEY || '';
        this.odooClient = new OdooClient();
        this.odooDeleterepository = new OdooDeleterepository();
    }

    async execute(productId: string): Promise<void> {
        try {
            // Update is_active column in your database
            console.log("adasdas", productId);
            await this.deleteProductRepository.execute(productId);

            // Update is_active parameter in PrestaShop
            const secureKey = 'ed3fa1ce558e1c2528cfbaa3f9940';
            const transformedData = {
                reference: productId // Provide the product reference
            };
            
            // Make a DELETE request to update the product status in PrestaShop
            await axios.delete(`http://localhost:8082/backend/delete-product.php?secure_key=${secureKey}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: transformedData
            });

            const odooData = {
                default_code: productId, // Update field name to internalReference
            };
            console.log(odooData.default_code);
            const odooUid = await this.odooClient.execute();
            await this.odooDeleterepository.execute({
                uid: odooUid,
                endpoint: "product.product",
                data: odooData,
            });


        } catch (error) {
            console.error("Error executing the DeleteProductUseCase:", error);
            throw error; // You might want to handle this error appropriately
        }
    }
}