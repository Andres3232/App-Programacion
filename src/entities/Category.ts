import {Column, OneToMany,CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";


@Entity('categories')

class Category {
  
  @PrimaryColumn()
  id:string;

  @Column()
  name: string;

  @ManyToOne(() => Product, product => product.categorias)
  producto: Product;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}
export{Category};