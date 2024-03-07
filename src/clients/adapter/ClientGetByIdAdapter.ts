import Cliente from '../domain/entity/Client';
import GetClientByIdUseCase from '../useCase/ClientByIdUseCase';

export default class ClientAdapterGetById {

    protected getClientByIdUseCase: GetClientByIdUseCase;
 
    constructor() {
        this.getClientByIdUseCase = new GetClientByIdUseCase();
    }

    async getClientById(clientId: number): Promise<Cliente> {
        const client = await this.getClientByIdUseCase.execute(clientId);
        return client;
    }
}


