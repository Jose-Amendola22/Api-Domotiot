import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: "Clientes",
})
export default class Cliente {
    @PrimaryGeneratedColumn({
        name: "cliente_id",
        type: "int",
    })
    id: number;

    @Column({
        name: "nombre",
        type: "varchar",
        length: 255,
    })
    nombre: string;

    @Column({
        name: "apellido",
        type: "varchar",
        length: 255,
    })
    apellido: string;

    @Column({
        name: "correo_electronico",
        type: "varchar",
        length: 255,
    })
    correo_electronico: string;

    @Column({
        name: "telefono",
        type: "varchar",
        length: 15,
    })
    telefono: string;
}