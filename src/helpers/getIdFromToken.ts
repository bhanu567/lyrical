import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export default function getIdFromToken(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: string;
    };

    req.headers.set("user-id", JSON.stringify(id));
    // response.headers.set("X-Custom-Header", "MyValue");
    return id;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        {
          success: false,
          message: "Your token has Expired, Please Log in Again!!!",
        },
        { status: 401 }
      );
    } else if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        {
          success: false,
          message: "Your token has been Modified, Please Log in Again!!!",
        },
        { status: 401 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: error.mesaaage },
        { status: 401 }
      );
    }
  }
}
