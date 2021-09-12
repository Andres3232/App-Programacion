
import { Request, Response } from "express";
import { ProductService } from "../services/productService";


const ProductsService = new ProductService();


class ProductController {
     
    //metodo para listar usuarios
    async listProducts(request: Request, response: Response) {
    
        const products = await ProductsService.list();
    
        return response.render("index", {
          products
        });
      }


      //metodo para agregar usuario
      async createProduct(request: Request, response: Response) {
        const { id, productname, price, type, category_id } = request.body;
    
        try {
          await ProductsService.create({
            id,
            productname,
            price,
            type,
            category_id
          }).then(() => {
            response.render("message", {
              message: "Usuario creado con exito"
            });
            response.redirect("/lista") ;
          });
        } catch (err) {
          response.render("message", {
            message: `Error al crear el usuario: ${err.message}`
          });
        }
    
      }

      //metodo para buscar Product
      async searchProduct(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

    
        try {
          const products = await ProductsService.search(search);
          response.render("search", {
            products,
            search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar el usuario: ${err.message}`
          });
        }
      }

      //traer la data del producto
      async getProductData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const product = await ProductsService.getData(id);
    
        return response.render("edit", {
          product
        });
      }

      //editar el usuario
      async updateUser(request: Request, response: Response) {
        const { id, productname, price, type, category_id } = request.body;

    
        try {
          await ProductsService.update({ id, productname, price, type, category_id }).then(() => {
            response.render("message", {
              message: "producto actualizado"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al actualizar el producto: ${err.message}`
          });
        }
    
      }


      //borrar product
      async deleteProduct(request: Request, response: Response) {
        const { id } = request.body;
        try {
          await ProductsService.delete(id).then(() => {
            response.redirect("/lista") ; // arreglar la ruta producto
            response.render("message", {message: "Producto liminado"}) 
          });
        } catch (err) {
          response.render("message", {
            message: `Error al eliminar el producto: ${err.message}`
          });
        }
      }



    
}
export  { ProductController };
