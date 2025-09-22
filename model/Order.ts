import mongoose, { model, models, Schema } from "mongoose";

type newOrder= {
    _id: string;
    userId: string;
    items: {
        productId: string;
        productName: string;
        quantity: number;
        price: number;
        subtotal: number;
    }[];
    address: {
        fullName: string;
        phoneNumber: string;
        pincode: number;
        area: string;
        city: string;
        state: string;
        __v: number;
    };
    totalWithTax: number;
    status: string;
    createdAt: string;
}

const OrderSchema= new Schema(
{
    _id: {type: String, required: true},
    userId: { type: String, required: true },

    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        subtotal: { type: Number, required: true },
      },
    ],

    address: {
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      pincode: { type: Number, required: true },
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },

    totalWithTax: { type: Number, required: true },
    status: { type: String, required: true },
  },
{ timestamps: true }
)

export const Order= models.Order || mongoose.model('Order', OrderSchema)