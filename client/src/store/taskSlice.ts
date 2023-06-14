// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from './store';
// import {TaskStatus,TaskPriority,Task} from "../types"

//   interface TaskState {
//     tasks: Task[];
//   }

// const initialState: TaskState = {
//   tasks: [{
//     id: '1',
//     name: 'Work on Kanban board design',
//     priority: TaskPriority.High,
//     status: TaskStatus.InProgress

//   },
//   {
//     id: '2',
//     name: 'Work on Sprints implementation',
//     priority: TaskPriority.Medium,
//     status: TaskStatus.Todo
//   },
//   ],
// };

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {
//     addTask: (state, action: PayloadAction<Task>) => {
//       state.tasks.unshift(action.payload);
//     },
//     updateTask: (state, action: PayloadAction<Task>) => {
//       const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
//       if (taskIndex !== -1) {
//         state.tasks[taskIndex] = action.payload;
//       }
//     },
//     deleteTask: (state, action: PayloadAction<string>) => {
//       state.tasks = state.tasks.filter((task) => task.id !== action.payload);
//     },
//   },
// });

// export const { addTask, updateTask, deleteTask } = taskSlice.actions;

// export const selectTasks = (state: RootState) => state.tasks.tasks;

// export default taskSlice.reducer;


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../types';
import { RootState } from './store';
import axios from "axios";
 const BASE_URL = 'http://localhost:8000';

export const fetchTasksApi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/tasks`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tasks');
  }
};

// Create a new task through the backend API
export const createTaskApi = async (task: Task) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/tasks`, task);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create task');
  }
};

// Update an existing task through the backend API
export const updateTaskApi = async (task: Task) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/v1/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

// Delete a task through the backend API
export const deleteTaskApi = async (taskId: string) => {
  try {
    await axios.delete(`${BASE_URL}/api/v1/tasks/${taskId}`);
  } catch (error) {
    throw new Error('Failed to delete task');
  }
};








export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  try{
    const response = await fetchTasksApi();
    return response.tasks;
  }
  catch(error){
console.log(error)
  }
  
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Task) => {
  const response = await createTaskApi(task);
  return response.task;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
  const response = await updateTaskApi(task);
  return response.task;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId:string) => {
  await deleteTaskApi(taskId);
  return taskId;
});


const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log(action,"hellooo")
        return action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
         state.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const existingTaskIndex = state.findIndex((task) => task.id === updatedTask.id);
        if (existingTaskIndex !== -1) {
          state[existingTaskIndex] = updatedTask;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const deletedTaskId = action.payload;
        const taskIndex = state.findIndex((task) => task.id === deletedTaskId);
        if (taskIndex !== -1) {
          state.splice(taskIndex, 1);
        }
      });
  },
});

export const selectTasks = (state: RootState) => {
  console.log(state)
 return  state.tasks
};

export default tasksSlice.reducer;
