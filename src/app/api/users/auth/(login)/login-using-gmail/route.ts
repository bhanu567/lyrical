//for google authentication using passport visit "https://dev.to/ayo_tech/how-to-implement-google-authentication-with-nextjs-and-passport-2gji"
import { NextResponse } from "next/server";

import QueryString from "qs";
export async function GET() {
  const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${QueryString.stringify(
    {
      client_id: process.env.GOOGLE_CLIENT_ID!, // It must correspond to what we declared earlier in the backend
      redirect_uri: "http://localhost:3000/api/users/auth/redirect-google", // This is the uri that will be redirected to if the user signs into his google account successfully
      response_type: "code", // This tells Google to append code to the response which will be sent to the backend which exchange the code for a token
      scope: "profile email", // This is the user data you have access to, in our case its just the mail.
      access_type: "offline",
      display: "popup", //It pops up the consent screen when the anchor tag is clicked
      auth_type: "rerequest", // This tells the consent screen to reappear if the user initially entered wrong credentials into the google modal
    }
  )}`;

  return NextResponse.redirect(googleOAuthURL);
}
