import React,{useState} from "react";
import Typography from '@mui/material/Typography';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Task, TaskStatus } from "../types";
import { styled } from '@mui/system';
import ProgressCircle from "./ProgressCircle";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { deleteTask,updateTask } from '../store/taskSlice';
import { useDispatch } from 'react-redux';
import AddAndEditTask from "./AddAndEditTask"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {ThunkDispatch} from "@reduxjs/toolkit";
interface TaskItemProps {
  task: Task;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius:5,
  padding:'30px 60px'

};
const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-root': {
    appearance: 'none',
    '&:focus': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [showDeleteConfirmation,setShowDeleteConfirmation]=useState(false);
  const [showUpdateModal,setShowUpdateModal]=useState(false);
  const handleDeletion=()=>{
    dispatch(deleteTask(task.id))
    setShowDeleteConfirmation(false)
  }
  const handleStatusChange = (event:any) => {
    const selectedStatus = event.target.value as TaskStatus;
    dispatch(updateTask({...task,status:selectedStatus}));
  };
  return (
    <>

    <Modal
  open={showDeleteConfirmation}
  onClose={()=>setShowDeleteConfirmation(false)}

>
  <Box sx={style}>
    <Typography style={{textAlign:'center'}}  variant="h6" component="h2">
     Are you sure you want to delete this task?
    </Typography>
    <br/>
    <br/>
    <br/>
    <div style={{textAlign:'center'}}>
      <Button style={{background:'#452498',marginRight:'20px'}} variant="contained" onClick={()=>handleDeletion()}>
Delete
      </Button>
      <Button variant="outlined" onClick={()=>setShowDeleteConfirmation(false)}>
Cancel
      </Button>
    </div>
 
  </Box>
</Modal>
    <div
      style={{ background: "white", borderRadius: "20px", padding: "10px 20px" }}
    >
      <div style={{display:'flex',alignItems:'center'}}>
        <div style={{flexBasis:'45%',display:'flex',flexDirection:'column'}}>
        <Typography style={{fontSize:'12px'}}  color='grey' fontWeight="bold">Task</Typography>
        <Typography style={{fontSize:'14px'}}   fontWeight="500">{task.name}</Typography>
        </div>
        <div  style={{flexBasis:'15%',display:'flex',flexDirection:'column'}} >
        <Typography style={{fontSize:'12px'}}  color='grey' fontWeight="bold">Priority</Typography>
        <Typography style={{fontSize:'14px',color:`${task.priority==='High'?'red':task.priority==='Medium'?'#FEBF21':'#4CEDCC'}`}}   fontWeight="bold">{task.priority}</Typography>
          </div>
          <div style={{flexBasis:'15%',display:'flex',justifyContent:'center'}}>
            <div style={{display:'inline-block'}}> 
            <CustomSelect  style={{background:'#e0e0e0',textAlign:'center',height:'20px',outline:"none",fontSize:'10px'}} value={task.status} onChange={handleStatusChange} IconComponent={()=>null} >
      <MenuItem value={TaskStatus.Todo}>{TaskStatus.Todo}</MenuItem>
      <MenuItem value={TaskStatus.InProgress}>{TaskStatus.InProgress}</MenuItem>
      <MenuItem value={TaskStatus.Done}>{TaskStatus.Done}</MenuItem>
    </CustomSelect>
               </div>
        
          </div>
          <div style={{flexBasis:'15%',display:'flex',justifyContent:'center'}}>{<ProgressCircle progress={task.status===TaskStatus.Todo?0:task.status===TaskStatus.InProgress?50:100} size={20} />}</div>
  
          <div onClick={()=>setShowUpdateModal(true)} style={{flexBasis:'5%',cursor:'pointer'}}><EditNoteIcon/></div>
          <div onClick={()=>setShowDeleteConfirmation(true)} style={{flexBasis:'5%', color:'red',cursor:'pointer'}}><DeleteOutlineIcon/></div>
     
      </div>
    </div>
    <AddAndEditTask isOpen={showUpdateModal}  onClose={()=>setShowUpdateModal(false)} type='update' taskItem={task}/>
    </>
  );
};

export default TaskItem;
