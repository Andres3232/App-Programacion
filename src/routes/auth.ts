import { Router } from "express";

const routerLogin = Router();

routerLogin.get("/",(request, response) => {
    response.render("home");
  });


routerLogin.post('/login')


export { routerLogin };
