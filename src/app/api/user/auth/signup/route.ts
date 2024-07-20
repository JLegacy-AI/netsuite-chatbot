import { dbConnect } from "@/libs/services/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/libs/model/user.model";

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
};
