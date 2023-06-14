import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { createTask,updateTask } from '../store/taskSlice';
import {TaskStatus,TaskPriority,Task} from "../types"
import { v4 as uuidv4 } from 'uuid';
import {ThunkDispatch} from "@reduxjs/toolkit";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  type:string;
  taskItem?:Task
}

const buttonsList=[{
  name:TaskPriority.High,
  color:'red'
},
{
  name:TaskPriority.Medium,
  color:'#FEBF21'
},
{
  name:TaskPriority.Low,
  color:'#4CEDCC'
}
]

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose,type,taskItem }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [taskName, setTaskName] = useState(taskItem?.name||'');
  const [priority, setPriority] = useState<TaskPriority>(taskItem?.priority||TaskPriority.Medium);

 




  const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(type==='create'){
      dispatch(createTask({ id:uuidv4() , name: taskName, priority: priority, status: TaskStatus.Todo }));
    }
    else if(type==='update'){
      if(taskItem){
        const updatedTask={...taskItem}
        updatedTask.name=taskName;
        updatedTask.priority=priority
        dispatch(updateTask(updatedTask));
      }
 
    }
  
    setTaskName('');
    setPriority(TaskPriority.Medium);
    onClose()
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius:5,
    padding:'30px 40px'

  };

  return (
    <Modal
        open={isOpen}
        onClose={onClose}
      >
        <Box sx={style}>
        <h2>{type==='create'?'Add Task':'Edit Task'}</h2>
       <form onSubmit={handleSubmit}>
         <div>
          <div> <label htmlFor="task"> <Typography style={{fontSize:'14px'}}  color='grey' fontWeight="bold">Task</Typography></label>
          </div>
          <TextField
          id="outlined-multiline-flexible"
          multiline
          placeholder='Send article to editor'
          maxRows={2}
          style={{width:'100%'}}
          value={taskName}
          onChange={(event)=>setTaskName(event.target.value)}
        />
        </div>
        <br/>
        <div>
        <div> <label htmlFor="task"> <Typography style={{fontSize:'14px'}}  color='grey' fontWeight="bold">Priority</Typography></label>
          </div>
         <div style={{display:'flex',gap:'10px'}}>
          {
            buttonsList.map((item,index)=>{
              const stylesObject={borderColor:item.color,color:item.color,background:'inherit'}
              if(priority===item.name){
                stylesObject.background=item.color;
                stylesObject.color='#fff'
              }
              return  <Button key={index} onClick={()=>setPriority(item.name)} style={stylesObject}   variant="outlined">{item.name}</Button>
            })

          }
         

         </div>
        </div>
        <br/>
        <br/>
        <div style={{display:'flex',justifyContent:'flex-end'}}>  <Button disabled={taskName.trim().length===0?true:false}  type='submit' variant="contained">{type==='create'?'Create':'Update'}</Button></div>
      
      </form>
        </Box>
      </Modal>
  
  );
};

export default AddTaskModal;
