
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
│   │   └── service   
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

- [SWAGGER] : http://localhost:3000/swagger/
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


### Instalação e Configuração do AWS


## Instalando
- msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# configurando o aws na sua máquina (terminal da máquina)

- aws configure
#### Você preencherá nessa sequência

SUA_KEY
SUA_SECRET_KEY
Default region name: us-east-1
Default output format: json

- Mostrar usuário AWS: aws iam get-user

### Instalação e Configuração do EKSCTL

## Instalando eksctl (terminal da máquina)
 - curl -o eksctl.zip https://github.com/weaveworks/eksctl/releases/download/latest_release/eksctl_Windows_amd64.zip
 - Expand-Archive -Path ~\Downloads\eksctl_Windows_amd64.zip -DestinationPath ~\Downloads\eksctl  

 - mkdir "C:\Program Files\eksctl"
 - Move-Item -Path ~\Downloads\eksctl\eksctl.exe -Destination "C:\Program Files\eksctl\eksctl.exe"

## Configurando variável de ambiente eksctl (terminal da máquina)

- $env:PATH += ";C:\Program Files\eksctl"
- eksctl version
- eksctl help


## Criando clusters

eksctl create cluster --name tech-challenge-cluster --region us-east-1 --nodes 3

## Atualizando clusters
aws eks --region us-east-1 update-kubeconfig --name tech-challenge-cluster


## Por fim, na raiz do projeto

kubectl apply -f deployments/deployment.yaml
kubectl apply -f deployments/service.yaml

## Visualizar nodes ou pods

kubectl get nodes
kubectl get pods

