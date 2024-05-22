import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import db from "../src/config/dbConnect";
import swaggerSpecs from "../swaggerConfig";
import routes from "./presentation/http/routes/index";

const port = process.env.PORT || 3000;

db.on("error", console.log.bind(console, "Database Error"));
db.once("open", () => console.log("Database is running"));

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// app.use(cors());
app.get("/", (req, res) => res.send("Server is running!"));
app.use(express.json());

app.listen(port, () =>
  console.log(`Server Running at http://localhost:${port}`)
);

routes(app);

export default app;
