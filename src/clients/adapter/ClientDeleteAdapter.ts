// clients/adapter/DeleteClientAdapter.ts
import DeleteClientUseCase from "../useCase/ClienteDeleteUseCase";

export default class DeleteClientAdapter {
    protected deleteClientUseCase: DeleteClientUseCase;

    constructor() {
        this.deleteClientUseCase = new DeleteClientUseCase();
    }

    async deleteClient(clientId: number): Promise<void> {
        await this.deleteClientUseCase.execute(clientId);
    }
}

