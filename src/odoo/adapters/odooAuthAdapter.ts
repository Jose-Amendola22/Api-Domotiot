import * as xmlrpc from 'xmlrpc';
import { odooConfig } from '../odooConfig';

export class OdooAuthAdapter {
    private client: xmlrpc.Client;

    constructor() {
        this.client = xmlrpc.createClient({ url: odooConfig.url + '/xmlrpc/2/common' });
    }

    async authenticate(db: string, username: string, password: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.client.methodCall('authenticate', [db, username, password, {}], (error, uid) => {
                if (error) {
                    reject(new Error('Authentication failed: ' + error));
                } else {
                    resolve(uid);
                }
            });
        });
    }
}
