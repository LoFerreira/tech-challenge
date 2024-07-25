
# Fast-Food tech challenge

Projeto em desenvolvimento conforme progresso da pós-graduação da FIAP - Software Architecture

## Membros: 
    
- Leonardo de Almeida Ferreira [rm353533]
- Robert Alves do Anjos [rm353529]

## Architecture: Hexagonal

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



# Configuração do Ambiente de Desenvolvimento com Minikube

Este guia descreve como configurar e rodar o ambiente Kubernetes localmente usando Minikube.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:
- Docker
- Minikube
- kubectl



### Instalação e Configuração do Minikube

#### Windows

1. **Instalar o Minikube usando Chocolatey**:
   Execute o comando abaixo em um terminal (cmd ou PowerShell) para instalar o Minikube:
   ```bash
   choco install minikube

#### MacOs

1. **Instalar o Minikube usando Homebrew**:
   Execute o comando abaixo em um terminal para instalar o Minikube:
   ```bash
   brew install minikube


2. **Comandos para rodar o minikube**

    **Rodar no terminal fora do projeto**

   - minikube start
   - kubectl config use-context minikube

    **Rodar no terminal do projeto (raiz)**
   - kubectl apply -f deployments/deployment.yaml
   - kubectl apply -f deployments/service.yaml

     (opcionais)
   - kubectl get pods
   - minikube service tech-challenge-service --url