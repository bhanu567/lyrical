import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect("user");

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const { newPassword } = await request.json();

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    const updatedUser = await User.findOneAndUpdate(
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gte: new Date() },
      },
      {
        $set: {
          password: hashedPassword, // Update the password field
        },
        $unset: {
          forgotPasswordToken: "", // Remove the forgotPasswordToken field
          forgotPasswordTokenExpiry: "", // Remove the forgotPasswordTokenExpiry field
        },
      },
      { new: true, runValidators: true }
    ).select("fullname email _id");

    if (!updatedUser) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    return NextResponse.json(
      {
        message:
          "Password has been Changed Successfully, please Login Again!!!",
        success: true,
        updatedUser,
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
