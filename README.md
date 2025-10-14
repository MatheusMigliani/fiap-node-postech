# API de Blogging Educacional - FIAP Pós Tech

API REST desenvolvida em Node.js para plataforma de blogging educacional, permitindo que professores da rede pública publiquem e compartilhem conteúdo didático de forma centralizada.

## Sobre o Projeto

Este projeto foi desenvolvido como solução para o Tech Challenge - Fase 2 do curso de Full Stack Development da FIAP. A aplicação consiste em uma API REST completa que gerencia posts educacionais, oferecendo operações de CRUD e busca por conteúdo.

## Documentação Interativa (Swagger)

A API possui documentação interativa completa via Swagger UI onde você pode testar todos os endpoints diretamente pelo navegador.

**Acesse:** http://localhost:3000/swagger

- Interface visual e intuitiva
- Testa endpoints sem precisar de Postman ou cURL
- Documentação sempre atualizada com exemplos de request/response
- Validações em tempo real

## Tecnologias Utilizadas

- Node.js v18+ (LTS)
- Express.js v5.1.0
- MongoDB v7.0 + Mongoose v8.19.1
- Jest v30.2.0 + Supertest v7.1.4
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Swagger UI Express
- Cobertura de testes: 62.33%

## Pré-requisitos

- Node.js >= 18.0.0
- Docker & Docker Compose (recomendado)
- MongoDB >= 7.0 (se rodar localmente)

## Instalação e Execução

### Com Docker (recomendado)

```bash
# Clone o repositório
git clone https://github.com/MatheusMigliani/fiap-node-postech.git
cd fiap-node-postech

# Inicie os containers
docker-compose up -d

# Verifique os logs
docker-compose logs -f

# Acesse a API
curl http://localhost:3000/health
```

### Localmente

```bash
# Clone e instale dependências
git clone https://github.com/MatheusMigliani/fiap-node-postech.git
cd fiap-node-postech
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Execute
npm run dev  # desenvolvimento
npm start    # produção
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/posts` | Lista todos os posts |
| GET | `/posts/:id` | Busca post específico |
| POST | `/posts` | Cria novo post |
| PUT | `/posts/:id` | Atualiza post existente |
| DELETE | `/posts/:id` | Exclui post (soft delete) |
| GET | `/posts/search?q=termo` | Busca posts por palavra-chave |

**Para detalhes completos, exemplos e testes:** Acesse http://localhost:3000/swagger

## Testes

```bash
# Executar testes
npm test

# Testes em modo watch
npm run test:watch
```

Cobertura atual: **62.33%** (20 testes: 11 unitários + 9 integração)

## Estrutura do Projeto

```
fiap-node-postech/
├── src/
│   ├── config/         # Configurações (DB, environment)
│   ├── controllers/    # Controladores HTTP
│   ├── middleware/     # Validações e tratamento de erros
│   ├── models/         # Schemas Mongoose
│   ├── routes/         # Definição de rotas
│   ├── services/       # Lógica de negócio
│   └── app.js          # Aplicação Express
├── tests/              # Testes unitários e integração
├── .github/workflows/  # CI/CD com GitHub Actions
├── docker-compose.yml
├── Dockerfile
└── swagger.js          # Geração de documentação
```

Arquitetura em camadas:
```
Routes → Controllers → Services → Models → Database
```

## CI/CD

Pipeline automatizado com GitHub Actions executado em push/PR para `main` ou `develop`:

1. **Lint** - Verificação de código (ESLint)
2. **Test** - Execução de testes e cobertura
3. **Build** - Validação de build
4. **Docker** - Construção de imagem
5. **Security** - Auditoria de segurança (npm audit)

## Decisões Técnicas

**MongoDB**: Escolhido pela flexibilidade do schema, performance em leitura e índices de texto para busca eficiente.

**Soft Delete**: Exclusão lógica com campo `deletedAt` para permitir recuperação de dados e auditoria.

**Validações em Duas Camadas**: express-validator (HTTP) + Mongoose (schema) garantem integridade em múltiplos níveis.

## Comandos Docker

```bash
# Iniciar
docker-compose up -d

# Parar
docker-compose down

# Logs
docker-compose logs -f app

# Rebuild
docker-compose build --no-cache
```

## Requisitos Atendidos

- [x] 6 endpoints REST funcionais
- [x] Persistência com MongoDB
- [x] Containerização com Docker
- [x] CI/CD com GitHub Actions
- [x] Cobertura de testes > 20% (alcançado 62.33%)
- [x] Documentação técnica completa

---

**FIAP - Pós Tech - Full Stack Development**
Fase 2 - Tech Challenge - 2025
