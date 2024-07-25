import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import db from "../src/infrastructure/database/MongoDB";
import swaggerSpecs from "./adapters/documentation/swaggerConfig";
import routes from "./routes/index";

const port = process.env.PORT || 2019;

db.on("error", console.log.bind(console, "Database Error"));
db.once("open", () => console.log("Database is running"));

const app = express();
app.use(express.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// app.use(cors());
app.get("/", (req, res) => res.send("Server is running!"));
app.use(express.json());

app.listen(port, () =>
  console.log(`Server Running at http://localhost:${port}`)
);

routes(app);

export default app;
