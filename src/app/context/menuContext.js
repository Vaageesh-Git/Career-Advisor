"use client";
import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}