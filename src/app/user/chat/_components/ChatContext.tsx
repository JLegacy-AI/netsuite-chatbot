import * as React from "react";

interface ChatContextType {
  createChat: boolean;
  createChatOn: () => void;
  createChatOff: () => void;
}

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [createChat, setCreateChat] = React.useState(false);

  const createChatOff = () => {
    setCreateChat(false);
  };

  const createChatOn = () => {
    setCreateChat(true);
  };

  return (
    <ChatContext.Provider value={{ createChat, createChatOff, createChatOn }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
