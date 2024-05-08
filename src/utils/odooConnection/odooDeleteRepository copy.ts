import xmlrpc from "xmlrpc";
import Odoo from "../enum/odoo";
import odooDTO from "./dto/odooDTO";

export default class OdooDeleterepository {
    public async execute(params: odooDTO) {
        try {
            const models = xmlrpc.createClient({ url: Odoo.odoourl + '/xmlrpc/2/object' });
            const db = Odoo.odoodb;
            const password = Odoo.odoopassword;

            // Search for the record ID based on the internal reference
            const searchResult = await this.searchRecord(params.data.default_code, db, password, params.endpoint);
            //console.log("---------------------",params.data.default_code);

            if (!searchResult) {
                console.error('Record with internal reference not found.');
                return;
            }

            // Extract the record ID from the search result
            const recordId = searchResult[0]; // Assuming the search returns only one result
            console.log("here",recordId);
            // Perform the update operation using the obtained record ID
            models.methodCall('execute_kw', [
                db,
                params.uid,
                password,
                params.endpoint,
                "unlink", 
                [[recordId]]
            ], (err, result) => {
                if (err) {
                    console.error('Failed to deactivate record', err);
                } else {
                    console.log('Record deactivated successfully:', result);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    private async searchRecord(internalReference: string, db: string, password: string, endpoint: string): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            const models = xmlrpc.createClient({ url: Odoo.odoourl + '/xmlrpc/2/object' });
            models.methodCall('execute_kw', [
                db,
                2, // Assuming admin user ID
                password,
                endpoint,
                "search", 
                [[["default_code", "=", internalReference]]] 
            ], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                    console.log(result);
                }
            });
        });
    }
}