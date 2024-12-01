const db = require("../../data/dbConfig");


async function getProjects() {

    const projects = await db('projects');

    const projectsWithDetails = await Promise.all(
      projects.map(async (project) => {

        const tasks = await db('tasks')
          .where('project_id', project.project_id)
          .select('task_id', 'task_description', 'task_notes', 'task_completed');

        const resources = await db('project_resources')
          .join('resources', 'project_resources.resource_id', 'resources.resource_id')
          .where('project_resources.project_id', project.project_id)
          .select('resources.resource_id', 'resources.resource_name', 'resources.resource_description');
        return {
          ...project,
          project_completed: !!project.project_completed,
          tasks,
          resources,
        };
      })
    );
    return projectsWithDetails;
}

async function addProject(project) {
    const project_id = await db('projects')
      .insert(project)
      .then(() => db('projects').max('project_id as id').first());
    const newProject = await db('projects')
      .where('project_id', project_id.id)
      .first();  
    return newProject;
  }

module.exports = { 
    getProjects,
    addProject   
};