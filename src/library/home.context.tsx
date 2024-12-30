"use client";

import { createContext, useContext, useState } from "react";

interface IHomeContext {
  collapseMenu: boolean;
  setCollapseMenu: (v: boolean) => void;
}

export const HomeContext = createContext<IHomeContext | null>(null);

export const HomeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapseMenu, setCollapseMenu] = useState(false);

  return (
    <HomeContext.Provider value={{ collapseMenu, setCollapseMenu }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
