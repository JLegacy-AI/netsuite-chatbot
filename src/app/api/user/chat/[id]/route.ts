import Chat from "@/libs/model/chat.model";
import { NextRequest, NextResponse } from "next/server";
import { sendMessage } from "@/libs/services/open-ai";
import axios from "axios";

export const GET = async (req: NextRequest, context: any) => {
  const { params } = context;
  const chatId = params.id;

  try {
    const chat = await Chat.findById(chatId).populate("messages");

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json({ messages: chat.messages }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving chat messages:", error);
    return NextResponse.json(
      { message: "Error retrieving chat messages" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest, context: any) => {
  const { params } = context;
  const chatId = params.id;

  try {
    const { userQuery } = await req.json();

    if (!userQuery) {
      return NextResponse.json(
        { message: "User query is required" },
        { status: 400 }
      );
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    chat.messages.push({ role: "user", content: userQuery });

    const res = await axios.post(
      `http://localhost:3000/api/v1/prediction/${process.env.FLOWISE_AI_CHATID}`,
      {
        question: userQuery,
        chatId: chatId,
      }
    );

    console.log(res.data);

    if (res.data.text === undefined) {
      return NextResponse.json(
        { error: "Error getting response" },
        { status: 403 }
      );
    }

    chat.messages.push({
      role: "assistant",
      content: res.data.text,
    });

    await chat.save();

    return NextResponse.json({ response: res.data.text }, { status: 200 });
  } catch (error) {
    console.error("Error sending user query and getting response:", error);
    return NextResponse.json(
      { message: "Error sending user query" },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, context: any) => {
  const { params } = context;
  const chatId = params.id;

  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    chat.title = title;

    await chat.save();

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error("Error updating chat title:", error);
    return NextResponse.json(
      { message: "Error updating chat title" },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, context: any) => {
  const { params } = context;
  const chatId = params.id;

  try {
    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Chat deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json(
      { message: "Error deleting chat" },
      { status: 500 }
    );
  }
};
