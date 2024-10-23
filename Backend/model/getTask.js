import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    task_name: String
})

const Task = mongoose.model('Task',taskSchema)

export default Task