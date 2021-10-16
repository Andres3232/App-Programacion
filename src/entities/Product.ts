import { Column, CreateDateColumn,Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";

@Entity("products")
export class Product {

  @PrimaryColumn()
  id: string;

  @Column()
  productname: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column()
  categoriaId: string;


  @ManyToOne(() => Category, category => category.productos)
  @JoinColumn({ name: 'categoriaId'})
  
  categoria: Category;



  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}
