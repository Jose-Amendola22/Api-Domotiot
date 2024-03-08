import { OdooGetAllClientAdapter } from "../adapters/odooGetAllClientsAdapter";

export class OdooGetClientsUseCase {
    constructor(private odooClientAdapter: OdooGetAllClientAdapter) {}

    async getClients(): Promise<any[]> {
        try {
            const clients = await this.odooClientAdapter.getClients();
            return clients;
        } catch (error) {
            throw new Error('Failed to get clients: ' + error);
        }
    }
}
