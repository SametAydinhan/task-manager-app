"use client";
import React, { createContext, use, useContext, useState } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedtheme, setSelectedTheme] = useState(0);
  const [isloading, setIsLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedtheme];

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted successfully");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompletedTasks = tasks.filter((task) => task.isCompleted === false);
  return (
    <GlobalContext.Provider
      value={{ theme, tasks, deleteTask, isloading, completedTasks,importantTasks,incompletedTasks }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
