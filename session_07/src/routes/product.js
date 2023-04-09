import express from'express';
import * as productCtrl from '../app/controllers/productController.js';
import verifyToken from '../middlewares/verifyToken.js';
import checkRole from '../middlewares/checkRole.js';

const productRouter = express.Router();

productRouter.get('/', productCtrl.getAllProducts);
productRouter.get('/:slug', productCtrl.getProductBySlug);
productRouter.use(verifyToken);
productRouter.use(checkRole);
productRouter.post('/', productCtrl.createProduct);
productRouter.put('/:slug/edit', productCtrl.updateProduct);
productRouter.delete('/:slug', productCtrl.deleteProduct);

export default productRouter;