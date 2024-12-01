const db = require("../../data/dbConfig");

async function getTasks() {
    const tasks = await db('tasks')
      .join('projects', 'tasks.project_id', 'projects.project_id')
      .select(
        'tasks.task_id',
        'tasks.task_description',
        'tasks.task_notes',
        'tasks.task_completed',
        'projects.project_name',
        'tasks.project_id'
      );
    return tasks.map(task => ({
      ...task,
      task_completed: !!task.task_completed,
    }));
  }

  async function addTask(task) {
    const task_id = await db('tasks')
      .insert(task)
      .then(() => db('tasks').max('task_id as id').first());
    const newTask = await db('tasks')
      .where('task_id', task_id.id)
      .first();
    return {
      task_id: newTask.task_id,
      task_description: newTask.task_description,
      task_notes: newTask.task_notes || null,
      task_completed: !!newTask.task_completed,
      project_id: newTask.project_id,
    };
  }

module.exports = { 
    getTasks,
    addTask
};