import Producto from "../entity/ProductTypes";
import ConnectionSource from "../../../utils/database/connection";
import axios from "axios";

export default class CreateProductRepository {

    async findByReference(reference: string): Promise<Producto | null> {
        try {
            const response = await axios.get(`http://localhost:3000/api/products`);
            
            // Check if the response status is 200 and data exists
            if (response.status === 200 && response.data) {
                const products: Producto[] = response.data;
    
                // Iterate over products to find the one with the matching reference
                for (const product of products) {
                    if (product.reference === reference) {
                        return product;
                    }
                }
            }
            
            // If no product with the matching reference is found, return null
            return null;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

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
