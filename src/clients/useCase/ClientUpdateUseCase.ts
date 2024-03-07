import Cliente from '../domain/entity/Client';
import UpdateClientRepository from '../domain/repository/UpdateClientRepository';

export default class UpdateClientUseCase {
    protected updateClientRepository: UpdateClientRepository;

    constructor() {
        this.updateClientRepository = new UpdateClientRepository();
    }

    async execute(clientId: number, updatedData: Cliente): Promise<Cliente | null> {
        try {
            const updatedClient = await this.updateClientRepository.execute(clientId, updatedData);
            return updatedClient;
        } catch (error) {
            console.error("Error al ejecutar el caso de uso de actualización de cliente:", error);
            return null;
        }
    }
}


