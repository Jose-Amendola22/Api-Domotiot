import axios from 'axios';
import OdooClient from "../../utils/odooConnection/createOdooClient";
import OdooCreateRepository from "../../utils/odooConnection/odooCreateRepository";
import Producto from "../domain/entity/ProductTypes";
import CreateProductRepository from "../domain/repository/CreateProductRepository";

export default class CreateProductUseCase {
    protected createProductRepository: CreateProductRepository;
    protected odooClient: OdooClient;
    protected odooCreateRepository: OdooCreateRepository;

    constructor() {
        this.createProductRepository = new CreateProductRepository();
        this.odooClient = new OdooClient();
        this.odooCreateRepository = new OdooCreateRepository();
    }


    async execute(productData: Producto): Promise<Producto> {

        const existingProduct = await this.createProductRepository.findByReference(productData.reference);
        if (existingProduct) {
            throw new Error(`Product with reference ${productData.reference} already exists.`);
        }

        const url = 'http://3.145.164.218:8080/admin692j4sgyho7hi91tnaw/create-products.php';
        const secureKey = 'ed3fa1ce558e1c2528cfbaa3f9940';

        const data = {
            name: productData.name,
            description: productData.description,
            list_price: productData.list_price,
            quantity: productData.quantity,
            reference: productData.reference,
            image_url: productData.image_url
        };

        const headers = {
            'Content-Type': 'application/json',
        };

        try {
            // Make the POST request to create the product
            const createdProduct = await this.createProductRepository.execute(productData);
            console.log('Product created in local database:', createdProduct);
            const response = await axios.post(`${url}?secure_key=${secureKey}`, data, { headers });
            console.log('Product created successfully:', response.data);

            const odooData = {
                name: productData.name,
                description: productData.description,
                list_price: productData.list_price,
                qty_available: productData.quantity, // Set quantity
                default_code: productData.reference, // Set reference 
                //image: productData.image_url
            };

            // Assuming this is where you want to execute the Odoo related logic
            const odooUid = await this.odooClient.execute();
            await this.odooCreateRepository.execute({
                uid: odooUid,
                endpoint: "product.product",
                data: odooData,
            });

            return response.data; // Return the created product data
        } catch (error) {
            console.error('Failed to create product:', error);
            throw error; // Rethrow the error to handle it in the caller
        }
    }
}

