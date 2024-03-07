import Cliente from "../domain/entity/Client";
import CreateClientRepository from "../domain/repository/CreateClientRepository";

export default class CreateClientUseCase {
    protected createClientRepository: CreateClientRepository;

    constructor() {
        this.createClientRepository = new CreateClientRepository();
    }

    async execute(clientData: Cliente): Promise<Cliente> {
        const createdClient = await this.createClientRepository.execute(clientData);
        return createdClient;
    }
}


