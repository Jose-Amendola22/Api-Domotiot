import ConnectionSource from "../../../utils/database/connection";
import Cliente from '../entity/Client';

export default class UpdateClientRepository {
    async execute(clientId: number, updatedData: Cliente): Promise<Cliente | null> {
        try {
            const connection = await ConnectionSource.connect();
            const clientRepository = connection.getRepository(Cliente);

            // Busca el cliente existente por su ID
            const existingClient: Cliente | null = await clientRepository.findOne({where:{id:clientId}});

            if (!existingClient) {
                throw new Error("Cliente no encontrado");
            }

            // Actualiza los campos del cliente con los datos actualizados
            Object.assign(existingClient, updatedData);

            // Guarda el cliente actualizado en la base de datos
            const updatedClient = await clientRepository.save(existingClient);
            return updatedClient;
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
            return null;
        }
    }
}
