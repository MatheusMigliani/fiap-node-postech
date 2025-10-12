const express = require('express');
const { body, query } = require('express-validator');
const postController = require('../controllers/postController');
const validateRequest = require('../middleware/validator');

const router = express.Router();

// Validações para criação de post
const createPostValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('O título é obrigatório')
    .isLength({ max: 200 })
    .withMessage('O título não pode ter mais de 200 caracteres'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('O conteúdo é obrigatório'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('O autor é obrigatório')
    .isLength({ max: 100 })
    .withMessage('O nome do autor não pode ter mais de 100 caracteres'),
];

// Validações para atualização de post (campos opcionais)
const updatePostValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('O título não pode estar vazio')
    .isLength({ max: 200 })
    .withMessage('O título não pode ter mais de 200 caracteres'),
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('O conteúdo não pode estar vazio'),
  body('author')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('O autor não pode estar vazio')
    .isLength({ max: 100 })
    .withMessage('O nome do autor não pode ter mais de 100 caracteres'),
];

// Validação para busca
const searchValidation = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('O parâmetro de busca (q) é obrigatório')
    .isLength({ min: 2 })
    .withMessage('O termo de busca deve ter pelo menos 2 caracteres'),
];

// Rotas
// IMPORTANTE: A rota /search deve vir ANTES de /:id para evitar conflito
router.get('/search', searchValidation, validateRequest, postController.searchPosts);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', createPostValidation, validateRequest, postController.createPost);
router.put('/:id', updatePostValidation, validateRequest, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
