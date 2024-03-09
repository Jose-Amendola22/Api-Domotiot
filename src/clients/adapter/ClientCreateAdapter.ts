import Cliente from "../domain/entity/Client";
import CreateClientUseCase from "../useCase/ClientCreateUseCase";
import Joi from 'joi';

export default class ClientAdapterCreate {
    protected createClientUseCase: CreateClientUseCase;

    constructor() {
        this.createClientUseCase = new CreateClientUseCase();
    }

    async createClient(clientData: Cliente): Promise<Cliente> {
        try {
            // Definir el esquema de validación con Joi
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                phone: Joi.string().required()
            });

            // Validar los datos del cliente
            const { error } = schema.validate({
                name: clientData.name,
                email: clientData.email,
                phone: clientData.phone
            });
            if (error) {
                throw new Error(`Error de validación: ${error.message}`);
            }

            // Si los datos son válidos, pasamos al caso de uso para crear el cliente
            const createdClient = await this.createClientUseCase.execute(clientData);
            return createdClient;
        } catch (error) {
            // Manejar el error
            console.error("Error al crear el cliente:", error);
            throw error; // Re-lanzar el error para que el controlador lo maneje
        }
    }
}
