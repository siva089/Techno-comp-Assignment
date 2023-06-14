const express = require("express")
const { getAllTasks, createTask,deleteTask,updateTask}=require("../controllers/TaskController")


const router = express.Router({mergeParams:true})

router.route(`/`).get(getAllTasks).post( createTask)
router.route(`/:id`).put(updateTask).delete(deleteTask)



module.exports = router