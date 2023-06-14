
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectTasks } from  '../store/taskSlice';
import Task from "./Task"
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../store/taskSlice';

const TasksList = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const tasks = useSelector(selectTasks);
  console.log(tasks,'sadas')
  useEffect(()=>{
dispatch(fetchTasks())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px',overflowY:'scroll'}}>{tasks.map((task) => (
      <Task key={task.id} task={task} />
    ))}</div>
  )
}

export default TasksList