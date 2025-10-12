# API de Blogging Educacional - FIAP Pós Tech

API REST desenvolvida em Node.js para plataforma de blogging educacional, permitindo que professores da rede pública publiquem e compartilhem conteúdo didático de forma centralizada.

## Sobre o Projeto

Este projeto foi desenvolvido como solução para o Tech Challenge - Fase 2 do curso de Full Stack Development da FIAP. A aplicação consiste em uma API REST completa que gerencia posts educacionais, oferecendo operações de CRUD e busca por conteúdo.

### Contexto

A aplicação visa resolver a falta de plataformas adequadas para que professores da rede pública possam publicar e compartilhar suas aulas de forma prática e tecnológica. Esta API servirá como backend para uma plataforma de blogging escalável em âmbito nacional.

## Tecnologias Utilizadas

### Core
- Node.js v18+ (LTS)
- Express.js v5.1.0
- MongoDB v7.0
- Mongoose v8.19.1

### Testes e Qualidade
- Jest v30.2.0
- Supertest v7.1.4
- ESLint v9.37.0
- Cobertura de código: 62.33%

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)

### Utilitários
- express-validator
- cors
- dotenv

## Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 7.0 (ou Docker)
- Docker & Docker Compose (opcional)
- Git

## Instalação

### Clone o repositório
```bash
git clone https://github.com/MatheusMigliani/fiap-node-postech.git
cd fiap-node-postech
```

### Instale as dependências
```bash
npm install
```

### Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fiap-blog
API_VERSION=v1
```

## Executando a Aplicação

### Localmente (requer MongoDB instalado)

```bash
# Desenvolvimento com hot reload
npm run dev

# Produção
npm start
```

### Com Docker (recomendado)

```bash
# Iniciar todos os serviços
docker-compose up -d

# Verificar logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### Verificar funcionamento

```bash
curl http://localhost:3000/health
```

Resposta esperada:
```json
{
  "success": true,
  "message": "API está funcionando!",
  "timestamp": "2025-10-12T..."
}
```

## Documentação da API

### Endpoints Disponíveis

#### Listar Posts
```http
GET /posts
```

Retorna lista de todos os posts disponíveis.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Introdução à Matemática",
      "author": "Prof. João Silva",
      "createdAt": "2025-10-12T10:00:00.000Z",
      "excerpt": "Primeiros 100 caracteres..."
    }
  ]
}
```

#### Buscar Post Específico
```http
GET /posts/:id
```

Retorna detalhes completos de um post.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Introdução à Matemática",
    "content": "Conteúdo completo...",
    "author": "Prof. João Silva",
    "createdAt": "2025-10-12T10:00:00.000Z",
    "updatedAt": "2025-10-12T10:00:00.000Z"
  }
}
```

#### Criar Post
```http
POST /posts
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Título do Post",
  "content": "Conteúdo completo do post",
  "author": "Nome do Professor"
}
```

**Validações:**
- `title`: obrigatório, máximo 200 caracteres
- `content`: obrigatório
- `author`: obrigatório, máximo 100 caracteres

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Post criado com sucesso",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Título do Post",
    "content": "Conteúdo completo do post",
    "author": "Nome do Professor",
    "createdAt": "2025-10-12T11:00:00.000Z"
  }
}
```

#### Atualizar Post
```http
PUT /posts/:id
Content-Type: application/json
```

**Request Body (campos opcionais):**
```json
{
  "title": "Novo título",
  "content": "Novo conteúdo",
  "author": "Novo autor"
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Post atualizado com sucesso",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "title": "Novo título",
    "content": "Novo conteúdo",
    "author": "Novo autor",
    "updatedAt": "2025-10-12T12:00:00.000Z"
  }
}
```

#### Excluir Post
```http
DELETE /posts/:id
```

Realiza exclusão lógica (soft delete) do post.

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Post excluído com sucesso"
}
```

#### Buscar Posts
```http
GET /posts/search?q=termo
```

Busca posts por palavras-chave no título ou conteúdo.

**Query Parameters:**
- `q`: termo de busca (obrigatório, mínimo 2 caracteres)

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Post encontrado",
      "author": "Prof. João Silva",
      "createdAt": "2025-10-12T10:00:00.000Z",
      "excerpt": "Trecho com termo de busca..."
    }
  ]
}
```

### Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 | Requisição bem-sucedida |
| 201 | Recurso criado com sucesso |
| 400 | Erro de validação ou requisição inválida |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

### Exemplos de Erro

**Validação (400):**
```json
{
  "success": false,
  "message": "Erro de validação",
  "errors": [
    {
      "field": "title",
      "message": "O título é obrigatório"
    }
  ]
}
```

**Não encontrado (404):**
```json
{
  "success": false,
  "message": "Post não encontrado"
}
```

## Testes

### Executar testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Cobertura de Testes

O projeto possui 62.33% de cobertura de código, distribuída em:

- 11 testes unitários (postService)
- 9 testes de integração (rotas e validações)
- Total: 20 testes automatizados

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |   62.33 |    36.66 |   42.85 |      64 |
 routes             |     100 |      100 |     100 |     100 |
 services           |   92.45 |      100 |     100 |   92.45 |
 middleware         |   45.45 |     8.33 |      50 |   47.61 |
--------------------|---------|----------|---------|---------|
```

## Estrutura do Projeto

```
fiap-node-postech/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline de CI/CD
├── src/
│   ├── config/
│   │   ├── database.js        # Configuração do MongoDB
│   │   └── environment.js     # Variáveis de ambiente
│   ├── controllers/
│   │   └── postController.js  # Controladores HTTP
│   ├── middleware/
│   │   ├── errorHandler.js    # Tratamento de erros
│   │   └── validator.js       # Validação de requisições
│   ├── models/
│   │   └── Post.js            # Schema Mongoose
│   ├── routes/
│   │   └── postRoutes.js      # Definição de rotas
│   ├── services/
│   │   └── postService.js     # Lógica de negócio
│   ├── utils/
│   │   └── logger.js          # Sistema de logs
│   └── app.js                 # Aplicação Express
├── tests/
│   ├── unit/
│   │   └── postService.test.js
│   └── integration/
│       └── postRoutes.test.js
├── .dockerignore
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── jest.config.js
├── package.json
└── README.md
```

### Arquitetura

A aplicação segue arquitetura em camadas:

```
Routes (HTTP) → Controllers (Request/Response) → Services (Business Logic) → Models (Data) → Database
```

## Docker

### Serviços Disponíveis

O docker-compose configura dois serviços:

1. **app**: Aplicação Node.js na porta 3000
2. **mongodb**: Banco de dados MongoDB na porta 27017

### Comandos Docker

```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Parar serviços
docker-compose down

# Reconstruir imagens
docker-compose build --no-cache

# Remover volumes
docker-compose down -v
```

### Healthcheck

Os serviços possuem healthcheck configurado:
- **App**: Verifica endpoint `/health` a cada 30 segundos
- **MongoDB**: Verifica conexão via mongosh a cada 10 segundos

## CI/CD

O projeto utiliza GitHub Actions com pipeline automatizado:

### Pipeline de CI/CD

1. **Lint**: Verificação de código com ESLint
2. **Test**: Execução de testes e verificação de cobertura
3. **Build**: Validação de build da aplicação
4. **Docker**: Construção de imagem Docker
5. **Security**: Auditoria de segurança (npm audit)

O pipeline é executado automaticamente em:
- Push para branches `main` ou `develop`
- Pull requests para estas branches

## Decisões Técnicas

### MongoDB vs PostgreSQL

Optamos por MongoDB devido a:
- Flexibilidade do schema (facilita evolução)
- Melhor performance para operações de leitura
- Facilidade de escalabilidade horizontal
- Índices de texto para busca eficiente

### Soft Delete

Implementado exclusão lógica (soft delete) com campo `deletedAt`:
- Permite recuperação de dados
- Mantém histórico completo
- Facilita auditoria

### Validações em Duas Camadas

1. **express-validator**: Validação de entrada HTTP
2. **Mongoose**: Validação de schema no banco

Esta abordagem garante integridade em múltiplos níveis.

## Desafios e Soluções

### Roteamento com Express 5

**Desafio**: Conflito entre rotas `/posts/search` e `/posts/:id`

**Solução**: Definir rotas específicas antes de rotas parametrizadas no arquivo de rotas.

### Testes com Mongoose

**Desafio**: Mockar queries encadeadas do Mongoose (`.find().notDeleted().sort()`)

**Solução**: Criar mocks com `mockReturnThis()` para simular encadeamento de métodos.

### Healthcheck no Docker

**Desafio**: MongoDB demorando para inicializar causava falhas

**Solução**: Configurar healthcheck com retry e usar `depends_on` com condição de serviço saudável.

## Melhorias Futuras

- Implementar autenticação e autorização (JWT)
- Adicionar paginação nos endpoints de listagem
- Implementar rate limiting para proteção contra abuse
- Adicionar suporte a upload de imagens
- Criar sistema de categorias e tags
- Implementar cache com Redis
- Adicionar métricas e monitoramento (Prometheus/Grafana)

## Requisitos Atendidos

Todos os requisitos do Tech Challenge foram implementados:

- [x] 6 endpoints REST funcionais
- [x] Persistência com MongoDB
- [x] Containerização com Docker
- [x] CI/CD com GitHub Actions
- [x] Cobertura de testes > 20% (alcançado 62.33%)
- [x] Documentação técnica completa

## Licença

ISC

## Autores

FIAP - Pós Tech - Full Stack Development
Fase 2 - Tech Challenge
2025

---

Desenvolvido como parte do curso de Full Stack Development da FIAP.
