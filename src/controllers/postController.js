const postService = require('../services/postService');

class PostController {
  // GET /posts - Lista todos os posts
  async getAllPosts(req, res, next) {
    try {
      const posts = await postService.getAllPosts();

      // Formatar resposta com excerpt
      const formattedPosts = posts.map(post => ({
        id: post._id,
        title: post.title,
        author: post.author,
        createdAt: post.createdAt,
        excerpt: post.excerpt,
      }));

      res.status(200).json({
        success: true,
        count: formattedPosts.length,
        data: formattedPosts,
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /posts/:id - Busca post específico
  async getPostById(req, res, next) {
    try {
      const post = await postService.getPostById(req.params.id);

      res.status(200).json({
        success: true,
        data: {
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /posts - Cria novo post
  async createPost(req, res, next) {
    try {
      const { title, content, author } = req.body;
      const post = await postService.createPost({ title, content, author });

      res.status(201).json({
        success: true,
        message: 'Post criado com sucesso',
        data: {
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
          createdAt: post.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /posts/:id - Atualiza post
  async updatePost(req, res, next) {
    try {
      const { title, content, author } = req.body;
      const post = await postService.updatePost(req.params.id, {
        title,
        content,
        author,
      });

      res.status(200).json({
        success: true,
        message: 'Post atualizado com sucesso',
        data: {
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
          updatedAt: post.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /posts/:id - Deleta post
  async deletePost(req, res, next) {
    try {
      await postService.deletePost(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Post excluído com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /posts/search - Busca posts por palavra-chave
  async searchPosts(req, res, next) {
    try {
      const { q } = req.query;
      const posts = await postService.searchPosts(q);

      // Formatar resposta com excerpt
      const formattedPosts = posts.map(post => ({
        id: post._id,
        title: post.title,
        author: post.author,
        createdAt: post.createdAt,
        excerpt: post.excerpt,
      }));

      res.status(200).json({
        success: true,
        count: formattedPosts.length,
        data: formattedPosts,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
