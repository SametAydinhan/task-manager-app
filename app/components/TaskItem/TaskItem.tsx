"use client"
import React from 'react'

interface Props {
    task: any;
}

const TaskItem = ({task}:Props) => {
    const {title, description, date, isCompleted, isImportant} = task;
  return (
    <div>
        <h1> {title}</h1>
        <p>{description}</p>
        <p className='date'>{date}</p>
    </div>
  )
}

export default TaskItem;