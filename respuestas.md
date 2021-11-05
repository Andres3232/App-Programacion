# **CRUD TypeScript**.
## *Andrés Murgo, Emanuel Cortinez, Felipe Banco .*
## *Desarrollo de Software - IES 9023.*
- - -
## **Introducción**

***¿En qué consiste el proyecto?***

Nuestra aplicación realiza un CRUD(Create,Read,Update,Delete) de un grupo de Entidades (User, Product, Category) por medio de tecnologías como TypeORM SQLite, TypeScript, Nodejs, EJS y el gestor de paquetes Yarn.

***¿Cuál es la estructura del proyecto?***
 
* Entities: Script que determina los atributos, llave rimaria y cardinalidad de usuarios, productos y categorías.
* Repository: .
* Services: Script que busca los recursos solicitados.
* Controllers: Parte fundamental del sistema que manipula y controla la lógica del negocio.
* Middlewares: Carpeta que sirve de intermediario entre el router y el controllers, permitiendo o denegando el acceso, es aquí donde actúa JSON Web Token.
* Router: Delega las peticiones del browser.
* Views: Y por último la carpeta encargada del frontend de la aplicación, por medio del motor de plantillas EJS.

- - -

***Descripción y Funcionalidades de las Entities***

**User:**

Cuenta con atributos tales como: id, username, email, telefono, ciudad y estado. A diferencia del resto de las entities, ésta tiene la singularidad de un rol y un password asignados que permiten realizar diferentes acciones, siendo el admin el que dispone de todas las funciones y user/cliente tan solo de unas pocas.

***Product:***

Dispone de aributos como (id, nombre del producto, precio y tipo), además de tener una cardinalidad (de muchos a 1) con la entity categories, ya que muchos productos pertenecen a una categoría. 

***Category:*** 

Contiene los atributos de id y nombre junto con la relación de la entit anterior (de 1 a muchos) ya que 1 categroría tiene muchos productos asignados.
