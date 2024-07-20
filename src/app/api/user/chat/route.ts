import { NextRequest, NextResponse } from "next/server";
import Chat from "@/libs/model/chat.model";
import { createNewThread, sendMessage } from "@/libs/services/open-ai";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const chats = await Chat.find({ userId: userId }).select("-messages");
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
    const { userId, title, initialQuery } = await req.json();

    if (!userId || !title || !initialQuery) {
      return NextResponse.json(
        { message: "User ID, Title, and Initial Query are required" },
        { status: 400 }
      );
    }

    const thread = await createNewThread();

    const newChat = new Chat({
      userId: userId,
      title,
      threadId: thread.id,
      messages: [{ role: "user", content: initialQuery }],
    });

    await newChat.save();

    const assistantResponse = await sendMessage(thread.id, initialQuery);

    if (assistantResponse === undefined) {
      return NextResponse.json(
        { error: "Error getting Response" },
        { status: 403 }
      );
    }

    newChat.messages.push({
      role: "assistant",
      content: assistantResponse.content,
    });

    await newChat.save();

    return NextResponse.json(newChat, { status: 201 });
  } catch (error) {
    console.error("Error creating new chat and getting response:", error);
    return NextResponse.json(
      { message: "Error creating new chat" },
      { status: 500 }
    );
  }
};

export const PUT = async () => {};
export const DELETE = async () => {};
