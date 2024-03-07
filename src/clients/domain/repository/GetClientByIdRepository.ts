import { Connection, Repository } from "typeorm";
import ConnectionSource from "../../../utils/database/connection";
import Cliente from "../entity/Client";

export default class GetClientByIdRepository {
    async execute(clientId: number): Promise<Cliente | undefined> {
        const connection: Connection = await ConnectionSource.connect();
        const clientRepository: Repository<Cliente> = connection.getRepository(Cliente);
        const client: Cliente | null = await clientRepository.findOne({ where: { id: clientId } });

        if (!client) {
            throw new Error('Cliente no encontrado.');
        }

        return client;
    }
}


