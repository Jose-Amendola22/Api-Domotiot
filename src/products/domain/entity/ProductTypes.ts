import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "Productos",
})
export default class Producto {
  @PrimaryGeneratedColumn({
    name: "producto_id",
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
    name: "descripcion",
    type: "text",
    nullable: true,
  })
  descripcion: string;

  @Column({
    name: "Precio",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  precio: number;

  @Column({
    name: "imagenes",
    type: "text",
    nullable: true,
  })
  imagenes: string;
}