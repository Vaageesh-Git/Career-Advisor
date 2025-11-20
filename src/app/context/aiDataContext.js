"use client";

import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
const DataContext = createContext();
import { useAuth } from "./authContext";

export function DataContextProvider({ children }) {
  const [data, setData] = useState(null);
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      return
    }
    async function load() {
      try {
        const res = await axios.get("/api/recommendations");
        setData(res.data);
      } catch (err) {
        console.log("No recommendations yet (new user).");
      }
    }

    load();
  }, [loggedIn]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
