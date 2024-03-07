import Client from "../domain/entity/Client";
import GetAllClientsUseCase from "../useCase/ClientsGetAllUseCase";

export default class GetAllClientsAdapter {
    protected getAllClientsUseCase: GetAllClientsUseCase;

    constructor() {
        this.getAllClientsUseCase = new GetAllClientsUseCase();
    }

    async getAllClients(): Promise<Client[]> {
        try {
            console.log("Ejecutando adaptador para obtener todos los clientes.");
            return await this.getAllClientsUseCase.execute();
        } catch (error) {
            console.error("Error en el adaptador para obtener todos los clientes:", error);
            throw error;
        }
    }
}
