import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Feedback from "@/models/feedbackModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqData = await req.json();

    const newFeedack = new Feedback({
      email: reqData.email,
      message: reqData.message,
    });
    await newFeedack.save();
    return NextResponse.json(
      {
        message: "Thank you for your opinion!!!",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
