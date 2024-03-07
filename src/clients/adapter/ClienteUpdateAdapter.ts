import Cliente from '../domain/entity/Client';
import UpdateClientUseCase from '../useCase/ClientUpdateUseCase';
import Joi from 'joi';

export default class UpdateClientAdapter {
    protected updateClientUseCase: UpdateClientUseCase;

    constructor() {
        this.updateClientUseCase = new UpdateClientUseCase();
    }

    async updateClient(clientId: number, updatedData: Cliente): Promise<Cliente | null> {
        // Definir el esquema de validación con Joi
        const schema = Joi.object({
            nombre: Joi.string().required(),
            apellido: Joi.string().required(),
            correo_electronico: Joi.string().email().required(),
            telefono: Joi.string().required()
        });

        // Validar los datos actualizados del cliente
        const { error } = schema.validate(updatedData);
        if (error) {
            console.error('Error de validación:', error.details[0].message);
            return null;
        }

        // Si los datos son válidos, llamar al caso de uso para actualizar el cliente
        try {
            const updatedClient = await this.updateClientUseCase.execute(clientId, updatedData);
            return updatedClient;
        } catch (error) {
            console.error("Error al actualizar el cliente:", error);
            return null;
        }
    }
}



