import Cliente from "../entity/Client";
import ConnectionSource from "../../../utils/database/connection";

export default class CreateClientRepository {
    async execute(clientData: Cliente): Promise<Cliente> {
        try {
            const connection = await ConnectionSource.connect();
            const newClient = await connection.getRepository(Cliente).create(clientData);
            await connection.manager.save(newClient); 
            return newClient;
        } catch (error) {
            throw new Error('Error al crear el cliente en la base de datos');
        }
    }
}

