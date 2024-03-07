// clients/domain/repository/DeleteClientRepository.ts
import ConnectionSource from "../../../utils/database/connection";
import Cliente from "../entity/Client";

export default class DeleteClientRepository {
    async execute(clientId: number): Promise<void> {
        const connection = await ConnectionSource.connect();
        await connection.getRepository(Cliente).delete(clientId);
    }
}




