import dbConnect from "@/lib/mongodb";
import { Order } from "@/model/Order";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    await dbConnect();
    const order= await Order.find();

    return NextResponse.json({ success: true, orders: order }, { status: 200 });
  }catch(err){
   return NextResponse.json({error: err, message: "Failed to fetch order"}, {status: 500})
  }
}