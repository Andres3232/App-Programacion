import { Router } from "express";
import { login, signup } from "../controllers/login";



const routerLogin = Router();

routerLogin.get("/",(request, response) => {
    response.render("home");
  });

routerLogin.post('/login',login)
routerLogin.get("/signup", (request, response) => {
  response.render("signup");
});


routerLogin.post("/signup", signup);




export { routerLogin };