const Task = require('../models/Task');
const User = require('../models/User');

exports.getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const authorId = req.user_id;
        const user = await User.findOne({ _id: authorId });
        const title = req.body.title;
        const author = user.name;
        const notes = req.body.notes;
        const checklist = req.body.checklist;
        const difficulty = req.body.difficulty;
        const dueDate = req.body.dueDate;
        const status = req.body.status;
    
        if(!authorId){
            return res.status(400).json({ message: 'Error with authorId' });
        }

        if(!user){
            return res.status(400).json({ message: 'Error with user' });
        }

        if (!title || !notes || !checklist || !difficulty || !dueDate || !status) {
            return res.status(400).json({ message: 'Please, fill in all fields' });
        }

        const newTask = new Task({ title, author, authorId, notes, checklist, difficulty, dueDate, status});
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, notes, checklist, difficulty, dueDate, status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { title, notes, checklist, difficulty, dueDate, status }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
