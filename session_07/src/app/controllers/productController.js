import asyncHandler from 'express-async-handler';
import ProductModel from '../models/Product.js';

const getAllProducts = asyncHandler(async (req, res) => {
    const allProducts = await ProductModel.find({});
    res.status(200).json({
        status: 'ok',
        message: 'get all products successfully!',
        data: allProducts
    })
})

const getProductBySlug = asyncHandler(async (req, res) => {
    const slug = req.params.slug;
    const product = await ProductModel.findOne({slug});
    if(!product) {
        res.statusCode = 404;
        throw new Error('Product not found!');
    }
    res.status(200).json({
        status: 'ok',
        message: 'get product successfully!!',
        data: product
    })
})

const createProduct = asyncHandler(async (req, res) => {
    if(req.role !== 'admin') {
        res.statusCode = 401;
        throw new Error('Unauthorized');
    }
    const newProduct = req.body;
    const foundProduct = await ProductModel.findOne({productName: newProduct.productName});
    if(foundProduct) {
        res.statusCode = 400;
        throw new Error('Product name already exist');
    }
    if(newProduct.productName && newProduct.description) {
        const createdProduct = new ProductModel(newProduct);
        await createdProduct.save();
        res.status(201).json({
            status: 'ok',
            message: 'create product successfully!',
            data: createdProduct
        })
    } else {
        res.statusCode = 400;
        throw new Error('Please fill in the correct information');
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    if(req.role !== 'admin') {
        res.statusCode = 401;
        throw new Error('Unauthorized');
    }
    const newProduct = req.body;
    const slug = req.params.slug;
    const foundProduct = await ProductModel.findOne({slug});
    if(!foundProduct) {
        res.statusCode = 404;
        throw new Error('Cannot find product with slug: ' + slug);
    }
    for(let key in newProduct) {
        foundProduct[key] = newProduct[key];
    }
    await foundProduct.save();
    res.status(200).json({
        status: 'ok',
        message: 'update product successfully!',
        data: foundProduct
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const slug = req.params.slug;
    const deletedProduct = await ProductModel.findOneAndDelete({slug})
    if(!deletedProduct) {
        res.statusCode = 404;
        throw new Error('Cannot find product with slug: ' + slug);
    }
    res.status(200).json({
        status: 'ok',
        message: 'delete product successfully!',
        data: deletedProduct
    })
})

export {
    getAllProducts,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct
}