# Tech Challenge - Fase 2
## Plataforma de Blogging Educacional

### Contexto do Problema

Atualmente, a maioria dos professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica.

Esta aplicação visa solucionar esse problema criando uma plataforma de blogging dinâmico, escalável para um panorama nacional, utilizando Node.js como back-end e persistência de dados em banco de dados SQL ou NoSQL.

---

## Requisitos Funcionais

### Endpoints REST da API

#### 1. GET /posts - Lista de Posts
- **Descrição:** Lista todos os posts disponíveis na plataforma
- **Acesso:** Alunos e professores
- **Retorno:** Array de posts com informações resumidas
- **Exemplo de Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Introdução à Matemática",
      "author": "Prof. João Silva",
      "createdAt": "2025-10-12T10:00:00Z",
      "excerpt": "Primeiros 100 caracteres do conteúdo..."
    }
  ]
}
```

#### 2. GET /posts/:id - Leitura de Post Específico
- **Descrição:** Retorna o conteúdo completo de um post específico
- **Acesso:** Alunos e professores
- **Parâmetro:** ID do post na URL
- **Retorno:** Post completo
- **Exemplo de Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Introdução à Matemática",
    "content": "Conteúdo completo do post...",
    "author": "Prof. João Silva",
    "createdAt": "2025-10-12T10:00:00Z",
    "updatedAt": "2025-10-12T10:00:00Z"
  }
}
```

#### 3. POST /posts - Criação de Postagens
- **Descrição:** Permite que docentes criem novas postagens
- **Acesso:** Apenas professores
- **Body Parameters:**
  - `title` (string, obrigatório): Título do post
  - `content` (string, obrigatório): Conteúdo completo do post
  - `author` (string, obrigatório): Nome do autor/professor
- **Exemplo de Request:**
```json
{
  "title": "Introdução à Física",
  "content": "Nesta aula vamos aprender sobre...",
  "author": "Prof. Maria Santos"
}
```
- **Exemplo de Response:**
```json
{
  "success": true,
  "message": "Post criado com sucesso",
  "data": {
    "id": "2",
    "title": "Introdução à Física",
    "content": "Nesta aula vamos aprender sobre...",
    "author": "Prof. Maria Santos",
    "createdAt": "2025-10-12T11:00:00Z"
  }
}
```

#### 4. PUT /posts/:id - Edição de Postagens
- **Descrição:** Edita uma postagem existente
- **Acesso:** Apenas professores (autor da postagem)
- **Parâmetro:** ID do post na URL
- **Body Parameters:**
  - `title` (string, opcional): Novo título
  - `content` (string, opcional): Novo conteúdo
  - `author` (string, opcional): Novo autor
- **Exemplo de Request:**
```json
{
  "title": "Introdução à Física - Atualizado",
  "content": "Conteúdo atualizado..."
}
```
- **Exemplo de Response:**
```json
{
  "success": true,
  "message": "Post atualizado com sucesso",
  "data": {
    "id": "2",
    "title": "Introdução à Física - Atualizado",
    "content": "Conteúdo atualizado...",
    "author": "Prof. Maria Santos",
    "updatedAt": "2025-10-12T12:00:00Z"
  }
}
```

#### 5. DELETE /posts/:id - Exclusão de Postagens
- **Descrição:** Exclui uma postagem específica
- **Acesso:** Apenas professores (autor da postagem)
- **Parâmetro:** ID do post na URL
- **Exemplo de Response:**
```json
{
  "success": true,
  "message": "Post excluído com sucesso"
}
```

#### 6. GET /posts/search - Busca de Posts
- **Descrição:** Busca posts por palavras-chave no título ou conteúdo
- **Acesso:** Alunos e professores
- **Query Parameters:**
  - `q` (string, obrigatório): Termo de busca
- **Exemplo de Request:** `GET /posts/search?q=matemática`
- **Exemplo de Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Introdução à Matemática",
      "author": "Prof. João Silva",
      "createdAt": "2025-10-12T10:00:00Z",
      "excerpt": "Conteúdo com termo matemática..."
    }
  ]
}
```

---

## Requisitos Técnicos

### 1. Back-end em Node.js
- **Tecnologia:** Node.js (versão LTS recomendada)
- **Framework:** Express.js para roteamento e middleware
- **Estrutura:**
  - Arquitetura em camadas (Routes → Controllers → Services → Models)
  - Middleware para validação de dados
  - Middleware para tratamento de erros
  - Middleware para logging

### 2. Persistência de Dados
- **Opções de Banco de Dados:**
  - **MongoDB** (NoSQL): Flexibilidade de schema, fácil escalabilidade
  - **PostgreSQL** (SQL): Integridade referencial, queries complexas
- **Modelo de Dados - Post:**
  - `id`: Identificador único (UUID ou ObjectId)
  - `title`: String (obrigatório, máx. 200 caracteres)
  - `content`: Text (obrigatório)
  - `author`: String (obrigatório, máx. 100 caracteres)
  - `createdAt`: DateTime (automático)
  - `updatedAt`: DateTime (automático)
  - `deletedAt`: DateTime (soft delete, opcional)

### 3. Containerização com Docker
- **Dockerfile:**
  - Imagem base Node.js
  - Instalação de dependências
  - Configuração de ambiente
  - Exposição de porta
- **docker-compose.yml:**
  - Serviço da aplicação Node.js
  - Serviço do banco de dados
  - Network para comunicação entre containers
  - Volumes para persistência de dados
- **Objetivo:** Garantir consistência entre ambientes de desenvolvimento e produção

### 4. Automação com GitHub Actions
- **Workflows de CI/CD:**
  - **CI (Continuous Integration):**
    - Lint do código (ESLint)
    - Execução de testes unitários
    - Análise de cobertura de código
    - Build da aplicação
  - **CD (Continuous Deployment):**
    - Build da imagem Docker
    - Push para registry (Docker Hub ou GitHub Container Registry)
    - Deploy automático (opcional)

### 5. Documentação
- **README.md:**
  - Descrição do projeto
  - Tecnologias utilizadas
  - Setup inicial (pré-requisitos, instalação)
  - Como executar localmente
  - Como executar com Docker
  - Estrutura do projeto
  - Guia de uso da API (endpoints)
- **Documentação Técnica:**
  - Arquitetura da aplicação (diagrama)
  - Modelo de dados (schema)
  - Fluxo de requisições
  - Decisões técnicas tomadas
  - Desafios enfrentados e soluções
- **Documentação da API:**
  - Endpoints disponíveis
  - Exemplos de request/response
  - Códigos de erro
  - (Opcional) Swagger/OpenAPI

### 6. Cobertura de Testes
- **Requisito Mínimo:** 20% do código coberto por testes unitários
- **Prioridades de Teste:**
  - Funções críticas de CRUD (Create, Read, Update, Delete)
  - Validações de dados
  - Tratamento de erros
- **Framework de Testes:**
  - Jest (testes unitários)
  - Supertest (testes de API/integração)
- **Métricas:**
  - Relatório de cobertura (coverage report)
  - Evidências de testes passando no CI

---

## Critérios de Entrega

### 1. Código-Fonte
- ✅ Repositório GitHub com código completo
- ✅ Dockerfile configurado
- ✅ docker-compose.yml funcional
- ✅ Scripts de CI/CD (GitHub Actions)
- ✅ Código organizado e bem estruturado
- ✅ Commits semânticos e descritivos

### 2. Apresentação Gravada
- ✅ Vídeo demonstrando o funcionamento da aplicação
- ✅ Demonstração de todos os endpoints
- ✅ Explicação dos detalhes técnicos de implementação
- ✅ Demonstração do Docker e CI/CD funcionando

### 3. Documentação
- ✅ Arquitetura do sistema
- ✅ Guia de uso da aplicação
- ✅ Instruções de setup e deploy
- ✅ Relato de experiências e desafios enfrentados
- ✅ Formato: README.md ou documento separado

---

## Stack Tecnológica Recomendada

### Core
- **Runtime:** Node.js v18+ (LTS)
- **Framework:** Express.js v4+
- **Linguagem:** JavaScript (ou TypeScript para maior segurança de tipos)

### Banco de Dados (escolher 1)
- **Opção 1:** MongoDB + Mongoose
- **Opção 2:** PostgreSQL + pg/Sequelize/TypeORM

### Testes
- **Framework:** Jest
- **API Testing:** Supertest
- **Coverage:** Jest Coverage

### DevOps
- **Containerização:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Linting:** ESLint + Prettier

### Utilitários
- **Validação:** Joi ou express-validator
- **Variáveis de Ambiente:** dotenv
- **Logging:** Winston ou Morgan
- **Documentação API (opcional):** Swagger/OpenAPI

---

## Estrutura de Pastas Sugerida

```
fiap-api-node/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── environment.js
│   ├── controllers/
│   │   └── postController.js
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── postRoutes.js
│   ├── services/
│   │   └── postService.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── utils/
│   │   └── logger.js
│   └── app.js
├── tests/
│   ├── unit/
│   │   └── postService.test.js
│   └── integration/
│       └── postRoutes.test.js
├── docs/
│   ├── architecture.md
│   └── api-documentation.md
├── .env.example
├── .gitignore
├── .eslintrc.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── REQUIREMENTS.md
```

---

## Checklist de Implementação

### Fase 1: Setup Inicial
- [ ] Inicializar repositório Git
- [ ] Configurar Node.js e npm
- [ ] Criar estrutura de pastas
- [ ] Configurar ESLint e Prettier
- [ ] Criar .gitignore

### Fase 2: Desenvolvimento da API
- [ ] Configurar Express server
- [ ] Definir modelo de dados
- [ ] Implementar rotas e controllers
- [ ] Configurar conexão com banco de dados
- [ ] Implementar validações
- [ ] Implementar tratamento de erros

### Fase 3: Containerização
- [ ] Criar Dockerfile
- [ ] Criar docker-compose.yml
- [ ] Testar containers localmente

### Fase 4: Testes
- [ ] Configurar Jest
- [ ] Escrever testes unitários
- [ ] Escrever testes de integração
- [ ] Verificar cobertura mínima de 20%

### Fase 5: CI/CD
- [ ] Criar workflow do GitHub Actions
- [ ] Configurar jobs de lint e test
- [ ] Configurar build da imagem Docker
- [ ] Testar pipeline completo

### Fase 6: Documentação
- [ ] Escrever README completo
- [ ] Documentar arquitetura
- [ ] Documentar API (endpoints)
- [ ] Documentar desafios e aprendizados

### Fase 7: Apresentação
- [ ] Gravar vídeo de demonstração
- [ ] Demonstrar funcionalidades
- [ ] Explicar implementação técnica

---

## Notas Importantes

1. **Escolha do Banco de Dados:** A decisão entre MongoDB e PostgreSQL deve considerar:
   - MongoDB: Mais flexível, ideal para schemas que podem evoluir
   - PostgreSQL: Mais robusto, ideal para consistência e relacionamentos

2. **Segurança:** Embora não seja requisito explícito, considere:
   - Validação de entrada de dados
   - Proteção contra SQL Injection / NoSQL Injection
   - Rate limiting (opcional)
   - CORS configurado corretamente

3. **Qualidade de Código:**
   - Seguir princípios SOLID
   - Código limpo e legível
   - Comentários quando necessário
   - Nomenclatura consistente

4. **Boas Práticas:**
   - Não commitar arquivos .env
   - Usar variáveis de ambiente
   - Logging adequado
   - Tratamento de erros consistente

---

**Última atualização:** 12/10/2025
