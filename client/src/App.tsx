import  React,{useState} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TaskList from "./components/TasksList"
import AddAndEditTask from './components/AddAndEditTask';
export default function App() {
  const [open,setOpen]=useState(false)
  return (
    <div style={{width:'100%',height:'100vh',background:'#e0e0e0',display:'flex',justifyContent:'center'}}>
      <div style={{width:'650px',margin:'80px 0px'}}>
      <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',marginBottom:'40px'}}>
      <Typography variant="h4" fontWeight="bold">
      Task List 
       </Typography>
       <Button onClick={()=>setOpen(true)} style={{background:'#452498',color:'white',borderRadius:'20px',padding:'0px 20px',height:'40px',verticalAlign:'center'}} variant="contained" startIcon={<AddIcon/>}>
   Add Task
       </Button>
      </div>  
      <TaskList/>
      
      </div>
      <AddAndEditTask type='create' isOpen={open} onClose={()=>setOpen(false)} />
    </div>
  );
}