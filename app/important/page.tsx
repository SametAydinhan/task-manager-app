"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

const page = () => {
  const {importantTasks} = useGlobalState();
  return (
    <Tasks title='Important Tasks' tasks={importantTasks}/>
  )
}

export default page