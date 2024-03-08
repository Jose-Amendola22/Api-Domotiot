import * as xmlrpc from 'xmlrpc';
import { odooConfig } from '../odooConfig';

export class OdooGetAllClientAdapter {
    private client: xmlrpc.Client;

    constructor() {
        this.client = xmlrpc.createClient({ url: odooConfig.url + '/xmlrpc/2/object' });
    }

    async getClients(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.client.methodCall('execute_kw', [odooConfig.db, odooConfig.username, odooConfig.password, 'res.partner', 'search_read', [[]], { fields: ['id', 'name', 'email', 'phone'] }], (error, clients) => {
                if (error) {
                    reject(new Error('Failed to get clients: ' + error));
                } else {
                    resolve(clients);
                }
            });
        });
    }
}
