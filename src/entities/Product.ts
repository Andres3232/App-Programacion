import { Column, CreateDateColumn, Double, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("products")
class Product {

  @PrimaryColumn()
  id: number;

  @Column()
  productname: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  Categoria_id: number;

 

  constructor() {
    if (!this.id) {
      this.id = parseInt(uuid());
    }
  }

}

export { Product };