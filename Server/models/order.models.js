import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref  :'Product',
        required: true
    },
    quantity : {
        type: Number,
        required: true
    }
})

const OrderSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref  :'User',
        required: true
    },
    deliveryDate  :{
        type : Date,
        required: true
    },
    address : {
        type : String,
    },
    items: {
        type : [ItemSchema],
        required: true,
        status : {
            type: String,
            enum: ['Order Placed','Shipping','Out for Delivery','Delivered','Cancelled'],
            default: 'Order Placed',
            required: true
        }
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    updateAt : {
        type: Date,
        default: Date.now
    }

})

const Order = mongoose.model('Order',OrderSchema)

export default Order;