import { OdooAuthAdapter } from '../adapters/odooAuthAdapter';
import { OdooClientAdapter } from '../adapters/odooCreateClientAdapter';
import { ClientData } from '../../clients/domain/dto/ClientData';

export class OdooUseCase {
    constructor(
        private authAdapter: OdooAuthAdapter,
        private clientAdapter: OdooClientAdapter
    ) {}

    async authenticate(db: string, username: string, password: string): Promise<number> {
        try {
            const uid = await this.authAdapter.authenticate(db, username, password);
            return uid;
        } catch (error: any) {
            throw new Error('Authentication failed: ' + (error.message || error.toString()));
        }
    }

    async createClient(db: string, uid: number, password: string, clientData: ClientData): Promise<number> {
        try {
            const clientId = await this.clientAdapter.createClient(db, uid, password, clientData);
            return clientId;
        } catch (error: any) {
            throw new Error('Authentication failed: ' + (error.message || error.toString()));
        }
    }
}
