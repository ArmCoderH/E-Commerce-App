import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/user.routes.js';
import categoryRoute from './routes/category.routes.js';
import productRoute from './routes/product.routes.js';
import orderRoute from "./routes/order.routes.js";
import connectDB from './config/connect.js';
import { PORT } from './config/config.js';
import { buildAdminJS } from './config/setup.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routers
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);

const start = async () => {
    try {
        await connectDB();

        await buildAdminJS(app);
        app.listen(PORT, (error) => {
            if (error) {
                console.log("Error starting server: ", error);
            } else {
                console.log(`Server started at http://localhost:${PORT}/admin`);
            }
        });
    } catch (error) {
        console.log("Error: ", error);
    }
};

start();