import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { connect } from "@/dbConfig/dbConfig";

connect("user");

export async function POST(req: NextRequest) {
  try {
    const reqJson = await req.json();

    const { email } = reqJson;

    // const bhgv = await User.findOne(reqJson); This is also Correct

    const { _id } = await User.findOne({ email });
    if (!_id) {
      return NextResponse.json(
        {
          message: "User Not Found. Please try Again",
          success: false,
        },
        { status: 404 }
      );
    }
    await sendEmail({ email, emailType: "RESET", userId: _id });
    return NextResponse.json(
      {
        message: "Reset Password Link has been sent to your Email",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 402 }
    );
  }
}
