import OdooClient from "../../utils/odooConnection/createOdooClient";
import OdooCreateRepository from "../../utils/odooConnection/odooCreateRepository";
import Cliente from "../domain/entity/Client";
import CreateClientRepository from "../domain/repository/CreateClientRepository";

export default class CreateClientUseCase {
    protected createClientRepository: CreateClientRepository;
    protected odooClient: OdooClient;
    protected odooCreateRepository: OdooCreateRepository;

    constructor() {
        this.createClientRepository = new CreateClientRepository();
        this.odooClient = new OdooClient();
        this.odooCreateRepository = new OdooCreateRepository();
    }

    async execute(clientData: Cliente): Promise<Cliente> {
        const createdClient = await this.createClientRepository.execute(clientData);
        const odooUid =  await this.odooClient.execute();
            this.odooCreateRepository.execute({
                uid: odooUid,
                endpoint: "res.partner",
                data: clientData
            })
        return createdClient;

    }
}


