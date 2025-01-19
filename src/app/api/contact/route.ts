import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Feedback from "@/models/feedbackModel";

connect("user");

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();

    const newFeedack = new Feedback({
      email: reqData.email,
      message: reqData.message,
    });
    await newFeedack.save();
    return NextResponse.json({
      message: "Thank you for your opinion!!!",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
