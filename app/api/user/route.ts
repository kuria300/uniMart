import dbConnect from "@/lib/mongodb";
import { Order } from "@/model/Order";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try {
    const body = await req.json();

    console.log("📦 Incoming order body:", body); // Debug
     if (!body || !body.items || !body.totalWithTax || !body.address) {
      return NextResponse.json(
        { error: "Missing required order data" },
        { status: 400 }
      );
    }
    // Optional: validate the body before saving
    await dbConnect();
    const newOrder = await Order.create(body);

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("❌ Order save error:", error); // Add this
    return NextResponse.json({error:"Failed to save Order"}, {status: 500 })
  }
}
//API ROUTE