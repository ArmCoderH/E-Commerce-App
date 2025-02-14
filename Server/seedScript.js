// Load environment variables from .env file
import dotenv from 'dotenv';
import mongoose, { Types } from 'mongoose';
import Product from './models/product.models.js';
import Category from './models/category.models.js';
import { categoriesData, productData } from './seedData.js';

// Load .env configuration
dotenv.config();

async function seedDatabase() {
    try {
        // Connect to MongoDB database
        await mongoose.connect(process.env.MONGO_URI);

        // Clear existing data in Category and Product collections
        await Category.deleteMany({});
        await Product.deleteMany({});

        // Insert new categories into the database
        const categoryDocs = await Category.insertMany(categoriesData);

        // Create a mapping of category names to their MongoDB _id
        const categoryMap = categoryDocs.reduce((map, category) => {
            map[category.name] = category._id;
            return map;
        });

        // Assign correct category IDs to each product before inserting them
        const productWithCategoryIds = productData.map((product) => ({
            ...product,
            category: categoryMap[product.category], // Replace category name with its ID
        }));

        // Insert the updated product data into the database
        await Product.insertMany(productWithCategoryIds);

        console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
    } catch (error) {
        console.log("❌ Error seeding data:", error);
    } finally {
        // Close the database connection after seeding is complete
        mongoose.connection.close();
    }
}

// Run the database seeding function
seedDatabase();
