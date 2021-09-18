import { Request, Response } from "express";

import { CategoryService } from "../services/categoryService"

class CategoryController {

    //controlar al listar categorias
    async listCategories(request: Request, response: Response) {
        const listCategoryService = new CategoryService();
    
        const category = await listCategoryService.listCategory();
    
        return response.render("list-category", {
          product: category
        })
      }

      //controlar la asignación de categoría
      async createCategory(request: Request, response: Response) {
        const { name} = request.body;
    
        const createCategoryService = new CategoryService();
    
        try {
          await createCategoryService .createCategory({
            name
          }).then(() => {
            response.render("message", {
              message: "Categoría Asignada"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al asignar la categoría: ${err.message}`
          });
        }
      }

      //controlar la búsqueda de categoría
      async searchCategory(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();
    
        const searchCategoryService = new CategoryService();
    
        try {
          const categories = await searchCategoryService.searchCategory(search);
          response.render("search", {
            categories: categories,
            search: search
          });
        } catch (err) {
          response.render("message", {
            message: `Error al buscar categoría: ${err.message}`
          });
        }
      }

      //controlar la data de la categoría
      async getCategoryData(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();
    
        const getCategoryDataService = new CategoryService();
    
        const category = await getCategoryDataService.getDataCategory(id);
    
        return response.render("edit-category", {
          category: category,
        });
      }

      //controlar la edición de la categoria
      async updateCategory(request: Request, response: Response) {
        const { name } = request.body;
    
        const updateCategoryService = new CategoryService();
    
        try {
          await updateCategoryService.updateCategory({name}).then(() => {
            response.render("message", {
              message: "Categoría Actualizada"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al actualizar la categoría: ${err.message}`
          });
        }
    
      }

      //controlar la eliminación de categoría
      async deleteCategory(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteCategoryService = new CategoryService();
    
        try {
          await deleteCategoryService.deleteCategory(id).then(() => {
            response.render("message", {
              message: "Categoría Eliminada"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Error al eliminar la categoría: ${err.message}`
          });
        }
      }
};
export {CategoryController}