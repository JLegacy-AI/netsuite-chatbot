import User from "@/libs/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        error: "Missing fields, please enter Password & Email.",
      },
      {
        status: 400,
      }
    );
  }

  const user = await User.findOne({ email: email });

  if (!user || user.password !== password) {
    return NextResponse.json(
      {
        error: "Incorrect password or email.",
      },
      {
        status: 403,
      }
    );
  }

  if (user.password === password) {
    return NextResponse.json(
      {
        message: "Sign In Successfull.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      error: "Incorrect password or email.",
    },
    {
      status: 403,
    }
  );
};
