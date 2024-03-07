import Cliente from "../domain/entity/Client";
import CreateClientUseCase from "../useCase/ClientCreateUseCase";
import Joi from 'joi';

export default class ClientAdapterCreate {
    protected createClientUseCase: CreateClientUseCase;

    constructor() {
        this.createClientUseCase = new CreateClientUseCase();
    }

    async createClient(clientData: Cliente): Promise<Cliente> {
        // Definir el esquema de validación con Joi
        const schema = Joi.object({
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            correo_electronico: Joi.string().email().required(),
            telefono: Joi.string().required()
        });

        // Validar los datos del cliente
        const { error } = schema.validate(clientData);
        if (error) {
            throw new Error(`Error de validación: ${error.message}`);
        }

        // Si los datos son válidos, pasamos al caso de uso para crear el cliente
        const createdClient = await this.createClientUseCase.execute(clientData);
        return createdClient;
    }
}
