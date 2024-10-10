const Product = require('../model/product.model');
const { Op } = require('sequelize');

async function addProduct(req, res, next) {
  try {
    
    // basic check
    if(!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('category')|| !req.body.hasOwnProperty('description')|| !req.body.hasOwnProperty('price')) {
      return res.status(400).json({error:"Invalid Body"})
    }
    const { name, category, description, price } = req.body;

    const doublePrice = parseFloat(price);

    if (isNaN(doublePrice) || doublePrice < 0) {
      return res.status(400).json({ error: 'Invalid price value' });
    }

    const newProduct = await Product.create({
      name,
      category,
      description,
      price: doublePrice,
    });

    res.status(201).json({ message: 'Product added successfully', data: newProduct });
  } catch (err) {
    next(err);
  }
}


// Update an existing product 
async function updateProduct (req, res, next) {
  try {

    if(!req.params.hasOwnProperty('id')) {
      return res.status(400).json({error:"No Id Provided"})
    }
    const { id } = req.params;

    const { name, category, description, price } = req.body;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({message:'Product not found'});
    }

    product.name = name || product.name;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', data: product });
  } catch (err) {
    next(err); 
  }
};

// Delete a product
async function deleteProduct (req, res, next) {
  try {

    if(!req.params.hasOwnProperty('id')) {
      return res.status(400).json({error:"No Id Provided"})
    }
    const { id } = req.params;

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.status(404).json({message:'Product not found'});
    }

    await product.destroy();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err); 
  }
};

// Get products (Buyers)
async function getProducts (req, res, next) {
  try {

    let offset = 0;
    let limit = 10;
    if(req.query.hasOwnProperty('offset')) {
      offset = req.query.offset;
    }
    if(req.query.hasOwnProperty('limit')) {
      limit = req.query.limit;
    }
    // Find products based on filters (simple)
    const products = await Product.findAll({ offset, limit});;

    res.status(200).json(products);
  } catch (err) {
    next(err); 
  }
};

async function searchProducts (req, res, next) {
  try {

    // here i am adding all these but in frontend only name is used for search
    const { name, category } = req.query;

    const filters = {};
    // could have made a util for these below lines but i guess keeping it like this also works
    if (name) {
      filters.name = { [Op.iLike]: `%${name}%` }; // search for product name
    }
    if (category) {
      filters.category = category; 
    }

    // Fetch products based on the filters
    const products = await Product.findAll({ where: filters });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}



module.exports = {
  addProduct: addProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getProducts: getProducts,
  searchProducts: searchProducts
}