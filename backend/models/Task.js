const mongoose = require("mongoose")



  
const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priority: { type: String, required: true},
    id:{type:String,required:true},
    status: { type: String, required: true
     },

}, { toJSON: { virtuals: true }, toObject: { virtuals: true } })






const Task = mongoose.model('Task', TaskSchema)

module.exports = Task