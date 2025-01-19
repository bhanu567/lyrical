import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import jwt from "jsonwebtoken";
import uploadToCloudinary from "@/helpers/fileUploadCloudinary";

connect();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("profileImg") as File;
    const userValue = formData.get("user") as string;
    const { firstName, lastName, email, password } = JSON.parse(userValue) as {
      firstName: String;
      lastName: string;
      email: string;
      password: string;
    };

    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const avatarUrl = await uploadToCloudinary(file);

    const newUser = new User({
      fullname: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    const savedUser = await newUser.save();

    //send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    //create token data
    const tokenData = {
      id: savedUser._id,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser: savedUser.select("-password -__v"),
      },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
