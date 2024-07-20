// DrawerContext.tsx
import * as React from "react";

interface DrawerContextType {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const DrawerContext = React.createContext<DrawerContextType | undefined>(
  undefined
);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    console.log("Openning Drawer");

    setOpen(true);
  };

  const handleDrawerClose = () => {
    console.log("Closing Drawer");

    setOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{ open, handleDrawerOpen, handleDrawerClose }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = React.useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
