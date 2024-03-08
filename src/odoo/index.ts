import express, { Request, Response } from 'express';
import { OdooAuthAdapter } from './adapters/odooAuthAdapter';
import { OdooClientAdapter } from './adapters/odooCreateClientAdapter';
import { OdooGetAllClientAdapter } from './adapters/odooGetAllClientsAdapter';
import { odooConfig } from './odooConfig';

const router = express.Router();
const odooClientAdapter = new OdooClientAdapter();
const odooAuthAdapter = new OdooAuthAdapter();
const odooGetAllClientsAdapter = new OdooGetAllClientAdapter();

// Ruta para crear un cliente en Odoo
router.post('/create-client', async (req: Request, res: Response) => {
    try {
        // Aquí obtienes los datos del cliente desde el cuerpo de la solicitud
        const clientData = req.body;

        // Aquí autenticas con Odoo para obtener el UID
        const uid = await odooAuthAdapter.authenticate(odooConfig.db, odooConfig.username, odooConfig.password);

        // Aquí creas el cliente en Odoo utilizando el adaptador correspondiente
        const clientId = await odooClientAdapter.createClient(odooConfig.db, uid, odooConfig.password, clientData);

        res.status(201).json({ clientId });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/clients', async (_req: Request, res: Response) => {
    try {
        const clients = await odooGetAllClientsAdapter.getClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error });
    }
});
export default router;
