const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth.middleware');

// Product CRUD (can add middleware check for sellers)
// a basic auth middle ware check should be made (but this currently open)
router.post('/', authMiddleware, productController.addProduct);
router.put('/:id', authMiddleware, productController.updateProduct); 
router.delete('/:id', authMiddleware, productController.deleteProduct); 

// Product Search (this is open for all)
router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);

module.exports = router;
