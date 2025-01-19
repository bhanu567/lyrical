import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import getIdFromToken from "@/helpers/getIdFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromToken(request);

    const user = await User.findOne({ _id: id }).select("-password -__v");

    return NextResponse.json(
      {
        mesaaage: "User found",
        user,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
