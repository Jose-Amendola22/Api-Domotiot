import UseCase from "../../utils/infrastructure/useCase";
import Product from "../domain/entity/ProductTypes";
import GetProductByIdRepository from "../domain/repository/GetProductByIdRepository";

export default class GetProductByIdUseCase implements UseCase<string, Product> {
    protected getProductByIdRepository: GetProductByIdRepository;

    constructor() {
        this.getProductByIdRepository = new GetProductByIdRepository();
    }

    async execute(id: string): Promise<Product> {
        // Aquí podrías realizar lógica adicional si es necesario antes de llamar al repositorio.
        // En este caso, simplemente pasamos el ID al repositorio para obtener el producto.
        const product = await this.getProductByIdRepository.execute(id);
        
        // Manejar el caso en el que el producto no se encuentre
        if (!product) {
            throw new Error('Producto no encontrado.');
        }
        
        return product;
    }
}
