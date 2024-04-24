import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "Productos",
})
export default class Producto {
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
    name: "description",
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    name: "reference",
    type: "text",
    nullable: true,
  })
  reference: string;

  @Column({
    name: "quantity",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  quantity: number;

  @Column({
    name: "list_price",
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  list_price: number;

}