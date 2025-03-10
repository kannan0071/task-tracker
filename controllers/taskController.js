let tasks = [];
let currentId = 1;

const createTask = (req, res) => {
    const { name, completed = false } = req.body;
    const newTask = { id: currentId++, name, completed };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

const getAllTasks = (req, res) => {
    res.json(tasks);
};

const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const updateTask = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        const { name, completed } = req.body;
        task.name = name !== undefined ? name : task.name;
        task.completed = completed !== undefined ? completed : task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

const deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};