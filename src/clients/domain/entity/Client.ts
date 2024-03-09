import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
    name: "Clientes",
})
export default class Cliente {
    @PrimaryGeneratedColumn({
        name: "id",
        type: "int",
    })
    id: number;

    @Column({
        name: "name",
        type: "varchar",
        length: 255,
    })
    name: string;

    @Column({
        name: "email",
        type: "varchar",
        length: 255,
    })
    email: string;

    @Column({
        name: "phone",
        type: "varchar",
        length: 15,
    })
    phone: string;
}