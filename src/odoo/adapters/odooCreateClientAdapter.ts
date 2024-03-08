import * as xmlrpc from 'xmlrpc';
import { odooConfig } from '../odooConfig';

export class OdooClientAdapter {
    private client: xmlrpc.Client;

    constructor() {
        this.client = xmlrpc.createClient({ url: odooConfig.url + '/xmlrpc/2/object' });
    }

    async createClient(db: string, uid: number, password: string, clientData: any): Promise<number> {
        return new Promise((resolve, reject) => {
            this.client.methodCall('execute_kw', [db, uid, password, 'res.partner', 'create', [clientData]], (error, clientId) => {
                if (error) {
                    reject(new Error('Failed to create client: ' + error));
                } else {
                    resolve(clientId);
                }
            });
        });
    }
}

