const Task = require('../models/Task')



exports.getAllTasks = async(req,res)=> {
    try {
       const tasks=await Task.find({}).sort({_id:-1})
        res.json({success:true,tasks})
    } catch (error) {
        res.json({success:false,message:error})
        console.error(error)
    }
}

exports.createTask =async (req,res) => {
    try {
        if (!req.body.name ||!req.body.priority){
            return res.status(400).json({success:false,message:'Task name and priority required'})
        }

        const taskData={
            name:req.body.name,
            priority:req.body.priority,
            id:req.body.id,
            status:'To Do'
        }
        const task = await Task.create(taskData)
        res.json({
            success: true, task
        })
    }
    catch(e){
        console.log(e)
        res.json({success:false,message:e})
    }
}


exports.updateTask = async(req,res)=> {
    try {
        const data=req.body;
       const updateTask=await Task.findOneAndUpdate({id:req.params.id},data,{new:true})
        res.json({success:true,task:updateTask})
    } catch (error) {
        res.json({success:false,message:error})
        console.error(error)
    }
}


exports.deleteTask = async(req,res)=> {
    try {
      await Task.findOneAndDelete({id:req.params.id})
        res.json({success:true})
    } catch (error) {
        res.json({success:false,message:error})
        console.error(error)
    }
}

