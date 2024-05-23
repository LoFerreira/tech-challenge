import express from "express";
import products from "./product/routes";
import users from "./user/routes";

const routes = (app: any) => {
  app.route("/").get((req: any, res: any) => {
    res.status(200).send({ title: "Node Course" });
  }),
    app.use(express.json(), products, users);
};

export default routes;
