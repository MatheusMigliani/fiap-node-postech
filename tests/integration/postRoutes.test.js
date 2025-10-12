const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Post = require('../../src/models/Post');

// Mock da conexão com o banco de dados
jest.mock('../../src/config/database', () => jest.fn());

describe('POST /posts', () => {
  describe('Validações', () => {
    it('deve retornar 400 se título não for fornecido', async () => {
      const response = await request(app).post('/posts').send({
        content: 'Conteúdo teste',
        author: 'Autor teste',
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Erro de validação');
    });

    it('deve retornar 400 se conteúdo não for fornecido', async () => {
      const response = await request(app).post('/posts').send({
        title: 'Título teste',
        author: 'Autor teste',
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('deve retornar 400 se autor não for fornecido', async () => {
      const response = await request(app).post('/posts').send({
        title: 'Título teste',
        content: 'Conteúdo teste',
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('deve retornar 400 se título exceder 200 caracteres', async () => {
      const longTitle = 'a'.repeat(201);

      const response = await request(app).post('/posts').send({
        title: longTitle,
        content: 'Conteúdo teste',
        author: 'Autor teste',
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});

describe('GET /posts/search', () => {
  it('deve retornar 400 se parâmetro q não for fornecido', async () => {
    const response = await request(app).get('/posts/search');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Erro de validação');
  });

  it('deve retornar 400 se parâmetro q for muito curto', async () => {
    const response = await request(app).get('/posts/search?q=a');

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe('GET /health', () => {
  it('deve retornar status 200 e mensagem de sucesso', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('API está funcionando!');
  });
});

describe('GET /', () => {
  it('deve retornar informações da API', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('Bem-vindo');
    expect(response.body.endpoints).toBeDefined();
  });
});

describe('404 Handler', () => {
  it('deve retornar 404 para rotas não encontradas', async () => {
    const response = await request(app).get('/rota-inexistente');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Rota não encontrada');
  });
});
