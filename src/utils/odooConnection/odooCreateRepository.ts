import xmlrpc from "xmlrpc";
import Odoo from "../enum/odoo";
import odooDTO from "./dto/odooDTO";

export default class OdooCreateRepository {
    public execute(params:odooDTO) {
        const models = xmlrpc.createClient({ url: Odoo.odoourl + '/xmlrpc/2/object' });
        
        const db = Odoo.odoodb;
        const password = Odoo.odoopassword;

             models.methodCall('execute_kw', [
                db,
                params.uid,
                password,
                params.endpoint,
                "create",
                [params.data]
                ], 
                
                (err, orderId) => {
                if (err) {
                    console.error('Failed to create order:', err);
                } else {
                    console.log('Order created successfully. Order ID:', orderId);
                }
                });
    }
}