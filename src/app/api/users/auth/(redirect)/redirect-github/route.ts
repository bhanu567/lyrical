import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
import axios from "axios";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect("user");

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
    // Exchange the authorization code for tokens
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      qs.stringify({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    //tokenResponse.data = "access_token=gho_16C2e42FZJ9GmzeCoxmshHg5DQV1gJ1wTayz&scope=&token_type=bearer"
    const access_token = new URLSearchParams(tokenResponse.data).get(
      "access_token"
    );

    // Use the access token to fetch user info
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userInfo = userResponse.data;

    const newUser = {
      fullname: userInfo.name,
      email: userInfo.email,
      password: access_token,
      avatar: userInfo.avatar_url,
    };

    const savedUser = await User.findOneAndUpdate(
      { email: newUser.email }, // Filter condition (match existing user by email)
      { $setOnInsert: newUser }, // Insert the new user object if it doesn't exist
      {
        upsert: true, // Perform an insert if no document matches the filter
        new: true, // Return the document after the operation (inserted or existing)
        setDefaultsOnInsert: true, // Apply schema defaults for new documents
      }
    );
    console.log("savedUser", savedUser);

    const tokenData = {
      id: savedUser._id,
    };
    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.redirect(`http://localhost:3000/profile`);

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.mesaaage, success: false },
      { status: 500 }
    );
  }
}
