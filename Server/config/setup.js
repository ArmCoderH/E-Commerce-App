//all models
import Product from "../models/product.models.js";
import Category from "../models/category.models.js";
import User from "../models/user.models.js";
import Transaction from "../models/transaction.models.js";
import Order from "../models/order.models.js";

//admin
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import ConnectMongoDBSession from "connect-mongodb-session";
import session from "express-session";
import * as AdminJSMongoose from '@adminjs/mongoose'
import { COOKIE_PASSWORD } from "./config.js";
import {dark,light,noSidebar} from '@adminjs/themes'
import dotenv from 'dotenv'

dotenv.config()

AdminJS.registerAdapter(AdminJSMongoose)

const DEFAULT_ADMIN = {
    email: 'arman@gmail.com',
    password: '12345678',
}

const authentication = async(email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
}


export const buildAdminJS = async(app) => {
    const admin = new AdminJS({
        resources: [
            {resource:Product},
            {resource:Category},
            {resource:Order},
            {resource:User},
            {resource:Transaction},
        ],
        branding : {
            companyName:'Kart',
            withMadeWithLove:false,
            favicon: 'https://www.zilliondesigns.com/images/portfolio/ecommerce/image13.png',
            logo:'https://www.zilliondesigns.com/images/portfolio/ecommerce/image13.png'
        },
        defaultTheme:dark.id,
        availableThemes:[dark,light,noSidebar],
        rootPath: "/admin"
    })

    const MongoDBStore = ConnectMongoDBSession(session)

    const sessionStore = new MongoDBStore({
        uri: process.env.MONGO_URI,
        collection:'sessions'
    })

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate: authentication,
            cookieName: 'adminjs',
            cookiePassword:COOKIE_PASSWORD,
        },
        null,
        {
           store:sessionStore,
           resave: true,
           saveUninitialized: true,
           secret: COOKIE_PASSWORD,
           cookie:{
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
           },
           name : 'adminjs',
        }
    )

    app.use(admin.options.rootPath,adminRouter)
}