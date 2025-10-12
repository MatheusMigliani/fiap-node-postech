const postService = require('../../src/services/postService');
const Post = require('../../src/models/Post');

// Mock do modelo Post
jest.mock('../../src/models/Post');

describe('PostService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('deve retornar todos os posts não deletados', async () => {
      const mockPosts = [
        {
          _id: '1',
          title: 'Post 1',
          content: 'Conteúdo 1',
          author: 'Autor 1',
          createdAt: new Date(),
        },
        {
          _id: '2',
          title: 'Post 2',
          content: 'Conteúdo 2',
          author: 'Autor 2',
          createdAt: new Date(),
        },
      ];

      const mockQuery = {
        notDeleted: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockPosts),
      };

      Post.find = jest.fn().mockReturnValue(mockQuery);

      const result = await postService.getAllPosts();

      expect(Post.find).toHaveBeenCalled();
      expect(mockQuery.notDeleted).toHaveBeenCalled();
      expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
      expect(result).toEqual(mockPosts);
      expect(result).toHaveLength(2);
    });
  });

  describe('getPostById', () => {
    it('deve retornar um post específico por ID', async () => {
      const mockPost = {
        _id: '123',
        title: 'Post Teste',
        content: 'Conteúdo Teste',
        author: 'Autor Teste',
        createdAt: new Date(),
      };

      Post.findOne = jest.fn().mockResolvedValue(mockPost);

      const result = await postService.getPostById('123');

      expect(Post.findOne).toHaveBeenCalledWith({
        _id: '123',
        deletedAt: null,
      });
      expect(result).toEqual(mockPost);
    });

    it('deve lançar erro quando post não for encontrado', async () => {
      Post.findOne = jest.fn().mockResolvedValue(null);

      await expect(postService.getPostById('999')).rejects.toThrow(
        'Post não encontrado'
      );
    });
  });

  describe('createPost', () => {
    it('deve criar um novo post com sucesso', async () => {
      const newPostData = {
        title: 'Novo Post',
        content: 'Novo Conteúdo',
        author: 'Novo Autor',
      };

      const mockSavedPost = {
        _id: '123',
        ...newPostData,
        createdAt: new Date(),
        save: jest.fn(),
      };

      Post.mockImplementation(() => mockSavedPost);
      mockSavedPost.save.mockResolvedValue(mockSavedPost);

      const result = await postService.createPost(newPostData);

      expect(mockSavedPost.save).toHaveBeenCalled();
      expect(result.title).toBe('Novo Post');
    });
  });

  describe('updatePost', () => {
    it('deve atualizar um post existente', async () => {
      const updateData = {
        title: 'Título Atualizado',
        content: 'Conteúdo Atualizado',
      };

      const mockUpdatedPost = {
        _id: '123',
        ...updateData,
        author: 'Autor Original',
        updatedAt: new Date(),
      };

      Post.findOneAndUpdate = jest.fn().mockResolvedValue(mockUpdatedPost);

      const result = await postService.updatePost('123', updateData);

      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: '123', deletedAt: null },
        updateData,
        { new: true, runValidators: true }
      );
      expect(result).toEqual(mockUpdatedPost);
    });

    it('deve lançar erro quando post não for encontrado', async () => {
      Post.findOneAndUpdate = jest.fn().mockResolvedValue(null);

      await expect(
        postService.updatePost('999', { title: 'Teste' })
      ).rejects.toThrow('Post não encontrado');
    });
  });

  describe('deletePost', () => {
    it('deve deletar um post (soft delete)', async () => {
      const mockDeletedPost = {
        _id: '123',
        title: 'Post Deletado',
        deletedAt: new Date(),
      };

      Post.findOneAndUpdate = jest.fn().mockResolvedValue(mockDeletedPost);

      const result = await postService.deletePost('123');

      expect(Post.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: '123', deletedAt: null },
        { deletedAt: expect.any(Date) },
        { new: true }
      );
      expect(result).toEqual(mockDeletedPost);
    });

    it('deve lançar erro quando post não for encontrado', async () => {
      Post.findOneAndUpdate = jest.fn().mockResolvedValue(null);

      await expect(postService.deletePost('999')).rejects.toThrow(
        'Post não encontrado'
      );
    });
  });

  describe('searchPosts', () => {
    it('deve buscar posts por palavra-chave', async () => {
      const mockSearchResults = [
        {
          _id: '1',
          title: 'Post sobre JavaScript',
          content: 'Conteúdo sobre JavaScript',
          author: 'Autor 1',
        },
      ];

      Post.searchByKeyword = jest.fn().mockResolvedValue(mockSearchResults);

      const result = await postService.searchPosts('JavaScript');

      expect(Post.searchByKeyword).toHaveBeenCalledWith('JavaScript');
      expect(result).toEqual(mockSearchResults);
    });

    it('deve lançar erro quando palavra-chave não for fornecida', async () => {
      await expect(postService.searchPosts('')).rejects.toThrow(
        'Palavra-chave não fornecida'
      );
    });

    it('deve lançar erro quando palavra-chave for apenas espaços', async () => {
      await expect(postService.searchPosts('   ')).rejects.toThrow(
        'Palavra-chave não fornecida'
      );
    });
  });
});
