const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'fulfilled', 'incomplete'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetTime: { type: Date, required: true }
})

// Middleware to automatically update task status to 'incomplete' if not marked as 'fulfilled' by the target time
taskSchema.pre('save', async function (next) {
    const task = this;
  
    // Check if the status is not 'fulfilled' and the target time has passed
    if (task.status !== 'fulfilled' && task.targetTime <= new Date()) {
      task.status = 'incomplete';
    }
  
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
