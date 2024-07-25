
# Fast-Food tech challenge

Projeto em desenvolvimento conforme progresso da pós-graduação da FIAP - Software Architecture

## Membros: 
    
- Leonardo de Almeida Ferreira [rm353533]
- Robert Alves do Anjos [rm353529]


## Links

- [SWAGGER] : http://localhost:2019/swagger/
- [NOTION] : https://www.notion.so/FAST-FOOD-SYSTEM-f96fe451104340b29864b4611d3e348c
- [MIRO] : https://miro.com/welcomeonboard/bmxDZjE3SGdwYXVHTGpRT0MxMVgyU1gwNUZjNUliODluM1BIRnkxUjhKMXp0SzNNY3dhWkI2WnhCWmxoNnBHUnwzNDU4NzY0NTg1NDEwMDQzNjMyfDI=?share_link_id=781584269137
- [DOCKER IMAGE] : https://hub.docker.com/r/leonardo10sp/tech-challenge


## Kubernetes Deployment

### Pré-requisitos

- Kubernetes instalado e configurado
- `kubectl` configurado para se conectar ao seu cluster Kubernetes
- Docker Desktop (se estiver usando um ambiente local)

### Passos para Configuração

1. **Configuração do Deployment:**
   - Caminho: `deployments/deployment.yaml`
   - Defina o deployment para a aplicação conforme o exemplo no arquivo `deployment.yaml`.

2. **Configuração do Serviço:**
   - Caminho: `deployments/service.yaml`
   - Defina o serviço para expor a aplicação conforme o exemplo no arquivo `service.yaml`.

3. **Aplicar Configurações:**
   - Execute os seguintes comandos para aplicar as configurações no Kubernetes:
   ```bash
   kubectl apply -f deployments/deployment.yaml
   kubectl apply -f deployments/service.yaml


## Architecture - Hexagonal

root-project/
├── src/
│   │
│   ├── adapters/
│   │   ├── controllers/
│   │   ├── documentation/
│   │   └── middleware
│   │
│   ├── domain/
│   │   ├── model/
│   │   └── middleware   
│   │
│   ├── infrastructure/
│   │   ├── cloud_services/
│   │   │   └── aws/
│   │   │
│   │   ├── database/
│   │   │   └── MongoDB.ts
│   │   │
│   │   └── docker
│   │
│   ├── routes/
│   │   └── index.ts
│   │
│   ├── tests/
│   │
│   └── server.ts
│   
├── node_modules/
│   └── ...
│   
├── deployments/
│   ├── deployment.yaml
│   └── service.yaml
│
├── uploads/
│
├── .env
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json
├── README.MD
├── tsconfig.json
└── tsoa.json