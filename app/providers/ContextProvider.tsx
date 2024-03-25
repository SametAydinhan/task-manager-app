"use client";
import { useState, useEffect } from "react";
import { GlobalProvider } from "../context/globalProvider";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  }, []);
  if(!isReady) return null;

  return <GlobalProvider>
    <Toaster />
    {children}
    </GlobalProvider>;
};

export default ContextProvider;
