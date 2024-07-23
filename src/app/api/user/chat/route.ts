import { NextRequest, NextResponse } from "next/server";
import Chat from "@/libs/model/chat.model";
import { createNewThread, sendMessage } from "@/libs/services/open-ai";
import { dbConnect } from "@/libs/services/mongoose";
import axios from "axios";
import User from "@/libs/model/user.model";

export const GET = async (req: NextRequest) => {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const chats = await Chat.find({ userId: userId });
    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error("Error fetching chat details:", error);
    return NextResponse.json(
      { message: "Error fetching chat details" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { userId, title, initialQuery } = await req.json();

    console.log(userId, title, initialQuery);

    if (!userId || !title || !initialQuery) {
      return NextResponse.json(
        { message: "User ID, Title, and Initial Query are required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    const newChat = new Chat({
      userId: userId,
      title,
      messages: [{ role: "user", content: initialQuery }],
    });

    await newChat.save();

    const _ = await axios.post(
      `http://localhost:3000/api/v1/prediction/${process.env.FLOWISE_AI_CHATID}`,
      {
        question: `My name is ${user.name} & userId is ${user._id}`,
        chatId: newChat._id,
      }
    );

    const res = await axios.post(`/api/v1/prediction/${newChat._id}`, {
      question: initialQuery,
      chatId: newChat._id,
    });

    if (res.data.text === undefined) {
      return NextResponse.json(
        { error: "Error getting Response" },
        { status: 403 }
      );
    }

    newChat.messages.push({
      role: "assistant",
      content: res.data.text,
    });

    await newChat.save();

    return NextResponse.json({ response: res.data.text }, { status: 201 });
  } catch (error) {
    console.error("Error creating new chat and getting response:", error);
    return NextResponse.json(
      { error: "Error creating new chat" },
      { status: 500 }
    );
  }
};

export const PUT = async () => {};
export const DELETE = async () => {};
