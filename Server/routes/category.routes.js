import express from 'express';
import { getAllCategories } from '../controller/category.controller.js';

const router = express.Router()

router.get('/',getAllCategories)

export default router