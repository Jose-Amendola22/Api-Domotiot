import Cliente from "../entity/Client";
import ConnectionSource from "../../../utils/database/connection";

export default class GetClientsRepository {
    async getAllClients(): Promise<Cliente[]> {
        const connection = await ConnectionSource.connect();
        return await connection.getRepository(Cliente).find();
    }
}
