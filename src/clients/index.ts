import express, { Request, Response } from 'express';
import ClientAdapterCreate from './adapter/ClientCreateAdapter';
import GetAllClientsAdapter from './adapter/ClientGetallAdapter';
import DeleteClientAdapter from './adapter/ClientDeleteAdapter';
import ClientAdapterGetById from './adapter/ClientGetByIdAdapter';
import UpdateClientAdapter from './adapter/ClienteUpdateAdapter';


const router = express.Router();
const clientCreateAdapter = new ClientAdapterCreate();
const getAllClientsAdapter = new GetAllClientsAdapter();
const deleteClientAdapter = new DeleteClientAdapter();
const clientGetByIdAdapter = new ClientAdapterGetById();
const updateClientAdapter = new UpdateClientAdapter();

router.post("/create", async (req: Request, res: Response) => {
    try {
        const clientData = req.body;
        const newClient = await clientCreateAdapter.createClient(clientData);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente.' });
    }
});

router.get("/", async (_req: Request, res: Response) => {
    try {
        const clients = await getAllClientsAdapter.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes.' });
    }
});

// Ruta para obtener un cliente por ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.id);
        const client = await clientGetByIdAdapter.getClientById(clientId);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el cliente por ID.' });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.id);
        await deleteClientAdapter.deleteClient(clientId);
        res.status(200).json({ message: 'Cliente eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente.' });
    }
});

// Ruta para actualizar un cliente
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const clientId = parseInt(req.params.id);
        const updatedData = req.body;
        const updatedClient = await updateClientAdapter.updateClient(clientId, updatedData);
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente.' });
    }
});


export default router;

