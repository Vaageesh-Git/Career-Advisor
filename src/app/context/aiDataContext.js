"use client";

import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";
const DataContext = createContext();
import { useAuth } from "./authContext";

export function DataContextProvider({ children }) {
  const [data, setData] = useState(null);
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (loggedIn === null) return;

    if (loggedIn === false) {
      setData(null);
      return;
    }

    async function load() {
      try {
        const res = await axios.get("/api/recommendations");
        setData(res.data);
      } catch (err) {
        console.log("No recommendations found or user is new.");
        setData(null);
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
