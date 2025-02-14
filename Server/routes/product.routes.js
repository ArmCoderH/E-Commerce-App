import express from 'express';
import { getProductsByCtegoryId } from '../controller/product.controller.js';

const router = express.Router()

router.get('/:categoryId',getProductsByCtegoryId)
// 'http://localhost:3000/product/2'
export default router