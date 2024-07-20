// types.ts
export interface Message {
  role: string;
  content: string;
  time?: Date;
}

export interface Thread {
  id: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export interface Assistant {
  id: string;
  name: string;
  description: string;
}

export interface Run {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
}
