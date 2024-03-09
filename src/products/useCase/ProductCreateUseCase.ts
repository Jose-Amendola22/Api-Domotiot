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
        const createdProduct = await this.createProductRepository.execute(productData);
        const odooUid =  await this.odooClient.execute();
            this.odooCreateRepository.execute({
                uid: odooUid,
                endpoint: "product.product",
                data: productData
            })
        return createdProduct;
    }
}

