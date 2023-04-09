import handleErrorMiddleware from '../middlewares/handleErrorMiddleware.js';
import authRouter from './auth.js';
import productRouter from './product.js';

const route = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/products', productRouter);
    
    app.use(handleErrorMiddleware);
}

export default route;