import "dotenv/config";
import express from "express";
import ngrok from "ngrok";
import swaggerUi from "swagger-ui-express";
import { createConnection } from "./External/Infra/Database"; // Ajuste a importação para o banco de dados correto
import swaggerSpecs from "./Adapters/Documentation/swaggerConfig";
import routes from "./Adapters/Routes";
import PaymentService from "./Application/Services/PaymentService";
import cors from "cors"; // Se necessário, ative o CORS

const port = process.env.PORT || 3000;

async function startServer() {
  // Estabelece conexão com o banco de dados
  try {
    await createConnection();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1); // Encerra o processo em caso de erro na conexão com o banco de dados
  }

  // Inicializa o aplicativo Express
  const app = express();

  // Configura middlewares globais
  app.use(express.json());
  app.use(cors()); // Ativa CORS se necessário

  // Configura Swagger para documentação da API
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Rota de verificação do servidor
  app.get("/", (req, res) => res.send("Server is running!"));

  // Registra rotas da aplicação
  routes(app);

  // Inicia o servidor
  app.listen(port, async () => {
    // Configura ngrok para expor localmente a aplicação
    const ngrokUrl = await ngrok.connect(Number(port));
    PaymentService.setWebhookUrl(`${ngrokUrl}/webhook`);

    console.log(`ngrok URL: ${ngrokUrl}`);
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Inicia o servidor
startServer();

export default startServer;
