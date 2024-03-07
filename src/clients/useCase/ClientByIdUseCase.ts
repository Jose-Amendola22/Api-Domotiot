import UseCase from "../../utils/infrastructure/useCase";
import Cliente from "../domain/entity/Client";
import GetClientByIdRepository from "../domain/repository/GetClientByIdRepository";

export default class GetClientByIdUseCase implements UseCase<number, Cliente> {
    protected getClientByIdRepository: GetClientByIdRepository;

    constructor() {
        this.getClientByIdRepository = new GetClientByIdRepository();
    }

    async execute(id: number): Promise<Cliente> {
        const client = await this.getClientByIdRepository.execute(id);
        
        if (!client) {
            throw new Error('Cliente no encontrado.');
        }
        
        return client;
    }
}

