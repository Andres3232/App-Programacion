import { Column, CreateDateColumn,Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
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
  category_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = parseInt(uuid());
    }
  }

}

export { Product };