// clients/useCase/DeleteClientUseCase.ts
import DeleteClientRepository from "../domain/repository/DeleteClientRepository";

export default class DeleteClientUseCase {
    protected deleteClientRepository: DeleteClientRepository;

    constructor() {
        this.deleteClientRepository = new DeleteClientRepository();
    }

    async execute(clientId: number): Promise<void> {
        await this.deleteClientRepository.execute(clientId);
    }
}

