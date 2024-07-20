import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { IconButton, Typography } from "@mui/material";
import {
  CreateNewFolderOutlined,
  DeleteRounded,
  ViewSidebarRounded,
} from "@mui/icons-material";
import { useDrawer } from "./DrawerContext";
import { useChatContext } from "./ChatContext";

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const { open, handleDrawerClose, handleDrawerOpen } = useDrawer();
  const { createChat, createChatOn, createChatOff } = useChatContext();
  const items = [
    "Creating Advanced ChatGPT",
    "React JS Solutions Discussion",
    "Netsuite Chatbot Requirements",
    "Implementing Follow-Up Messages",
    "NetSuite Chatbot Feature Documentation",
    "Edit Confirm Button Action",
    "Soft Skills Q&A Response",
    "Android XML Table Layout",
    "Deploy Spleeter Model on SageMaker",
    "Record Interview Responses",
    "Flexible Layout Constraints",
    "Create Donation Website",
    "Soft Skills Q&A Response",
    "Android XML Table Layout",
    "Deploy Spleeter Model on SageMaker",
    "Record Interview Responses",
    "Flexible Layout Constraints",
    "Create Donation Website",
    "Android XML Table Layout",
    "Deploy Spleeter Model on SageMaker",
    "Record Interview Responses",
    "Flexible Layout Constraints",
    "Create Donation Website",
    "Soft Skills Q&A Response",
    "Android XML Table Layout",
    "Deploy Spleeter Model on SageMaker",
    "Record Interview Responses",
    "Flexible Layout Constraints",
    "Create Donation Website",
  ];

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        position: "relative",
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      {!open ? (
        <></>
      ) : (
        <Box className="flex justify-between top-0 right-0 left-0 p-5 z-10 bg-white">
          <IconButton size="small" onClick={() => handleDrawerClose()}>
            <ViewSidebarRounded />
          </IconButton>
          <IconButton size="small" onClick={() => createChatOn()}>
            <CreateNewFolderOutlined />
          </IconButton>
        </Box>
      )}
      <Box
        className="flex-grow gap-2 overflow-y-scroll"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {items.map((item, index) => {
          return (
            <Typography
              variant="body2"
              className="relative min-h-[40px] p-2 border mx-2 rounded-md text-nowrap overflow-x-hidden "
              key={index}
              onClick={() => createChatOff()}
            >
              {item}
              <IconButton
                className="absolute right-0 top-0 bottom-0 rounded-none bg-slate-100"
                size="small"
                sx={{
                  "&:hover": {
                    backgroundColor: "skyblue",
                    color: "red",
                  },
                }}
              >
                <DeleteRounded />
              </IconButton>
            </Typography>
          );
        })}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
