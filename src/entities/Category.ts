import {Column, OneToMany,CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./Product";


@Entity('categories')

export class Category {

  @PrimaryColumn()
  id:string;

  @Column()
  name: string;
  
  @OneToMany(() => Product, product => product.categoria)
  productos: Product[];

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