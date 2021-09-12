import { getCustomRepository } from "typeorm";

import { Product } from "../entities/Product";


import {ProductsRepository} from "../repositories/ProductsRepository";


interface IProduct{
  
    id?: number;
    productname: string;
    price: number;
    type: string;
    category_id: number;
    
}


class ProductService {

  //listar productos
    async list() {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const products = await productsRepository.find();
    
        return products;
      }

  //crear producto
      async create({ productname, price, type }: IProduct) {
        if (!productname || !price || !type ) {
          throw new Error("Por favor escribe todo los campos");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const productnameAlreadyExists = await productsRepository.findOne({ productname });
    
        if (productnameAlreadyExists) {
          throw new Error("Producto ya esta registrado");
        }
    
        const product = productsRepository.create({ productname, price, type});
    
        await productsRepository.save(product);
    
        return product;
      }

  //buscar producto
      async search(search: string) {
        if (!search) {
          throw new Error("Por favor complete el campo de busca");
        }
    
        const productsRepository = getCustomRepository(ProductsRepository);
    
        
        const product = await productsRepository
          .createQueryBuilder()
          .where("productname like :search", { search: `%${search}%` })
          .orWhere("price like :search", { search: `%${search}%` })
          .orWhere(" type :search", { search: `%${search}%` })
          .getMany();
    
        return product;
    
      }


  //traer data del producto
      async getData(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository.findOne(id);
    
        return product;
      }

      async update({ productname, price, type }: IProduct) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .update(Product)
          .set({ productname, price, type })
          .where("id = :id", { id:Number})
          .execute();
    
        return product;
    
      }


      //delete
      async delete(id: string) {
        const productsRepository = getCustomRepository(ProductsRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .delete()
          .from(Product)
          .where("id = :id", { id })
          .execute();
    
        return product;
    
      }

}


export { ProductService };
