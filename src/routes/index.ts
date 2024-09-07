import express from "express";
import orderRoutes from "../xxxxinfrastructure/frameworks/http/routes/OrderRoute";
//import paymentRoutes from "../routes/PaymentRoute";
//import productRoutes from "../routes/ProductRoute";
//import userRoutes from "../routes/UserRoute";

const routes = (app: any) => {
  app.route("/").get((req: any, res: any) => {
    res.status(200).send({ title: "Tech Challenge" });
  });

  app.use(express.json());
  //app.use('/api/v1/products', productRoutes);
  //app.use('/api/v1/users', userRoutes);
  app.use('/orders', orderRoutes);
  //app.use('/api/v1/payments', paymentRoutes);
};

export default routes;
