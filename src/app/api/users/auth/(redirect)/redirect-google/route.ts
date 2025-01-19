// // /pages/api/oauth2/redirect/google.ts

// import { NextApiRequest, NextApiResponse } from "next";
// import { nextConnect } from "next-connect";
// import passport from "@/lib/passport-google-auth";

// export default nextConnect().get(
//   passport.authenticate("google"),
//   (req: NextApiRequest & { user: any }, res: NextApiResponse) => {
//     // you can save the user session here. to get access to authenticated user through req.user
//     console.log("User", req.user);

//     res.redirect("/");
//   }
// );

import { NextRequest, NextResponse } from "next/server";
import qs from "qs";
import axios from "axios";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

connect();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
    // Exchange the authorization code for tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.DOMAIN!}/api/users/auth/redirect-google`,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token } = tokenResponse.data;

    // Use the access token to fetch user info
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const newUser = {
      fullname: userResponse.data.name,
      email: userResponse.data.email,
      password: access_token,
      avatar: userResponse.data.picture,
    };

    const savedUser = await User.findOneAndUpdate(
      { email: newUser.email },
      { $setOnInsert: newUser },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    console.log("savedUser", savedUser);
    const tokenData = {
      id: savedUser._id,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.redirect(`${process.env.DOMAIN!}/profile`);

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error: any) {
    const response = NextResponse.json(
      { message: error.mesaaage, success: false },
      { status: 500 }
    );
    return response;
  }
}
