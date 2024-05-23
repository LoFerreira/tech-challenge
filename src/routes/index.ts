import express from "express";
import products from "../adapters/controllers/ProductController";
import users from "../adapters/controllers/UserController";

const routes = (app: any) => {
  // Definição da rota raiz com método GET
  app.route("/")
    .get((req: any, res: any) => {
      res.status(200).send({ title: "Node Course" });
    });

  // Definição das rotas de produtos e usuários
  app.use(express.json(), products, users);
};

export default routes;
