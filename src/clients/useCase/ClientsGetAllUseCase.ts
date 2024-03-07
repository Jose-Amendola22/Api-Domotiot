import Cliente from "../domain/entity/Client";
import GetClientsRepository from "../domain/repository/GetClientsRepository";

export default class GetAllClientsUseCase {
    protected clientRepository: GetClientsRepository;

    constructor() {
        this.clientRepository = new GetClientsRepository();
    }

    async execute(): Promise<Cliente[]> {
        return await this.clientRepository.getAllClients();
    }
}
