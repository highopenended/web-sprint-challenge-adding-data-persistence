exports.seed = async function (knex) {
    // Deletes ALL existing entries in reverse order to handle dependencies
    //   await knex('project_resources').del();
    //   await knex('tasks').del();
    //   await knex('resources').del();
    //   await knex('projects').del();

    // Insert Projects
    const projects = [
        { project_name: "Build a Website", project_description: "A portfolio website", project_completed: false },
        { project_name: "Create a Mobile App", project_description: "A task management app", project_completed: true },
    ];
    await knex("projects").insert(projects);

    // Insert Resources
    const resources = [
        { resource_name: "HTML Templates", resource_description: "Pre-built HTML components" },
        { resource_name: "React", resource_description: "React library for frontend" },
        { resource_name: "Node.js", resource_description: "Backend runtime environment" },
    ];
    await knex("resources").insert(resources);

    // Insert Tasks
    const tasks = [
        {
            task_description: "Design homepage",
            task_notes: "Focus on responsiveness",
            task_completed: false,
            project_id: 1,
        },
        { task_description: "Implement backend", task_notes: "Use Express.js", task_completed: true, project_id: 2 },
        { task_description: "Set up database", task_notes: "Use PostgreSQL", task_completed: false, project_id: 2 },
    ];
    await knex("tasks").insert(tasks);

    // Insert Project Resources
    const projectResources = [
        { project_id: 1, resource_id: 1 },
        { project_id: 1, resource_id: 2 },
        { project_id: 2, resource_id: 2 },
        { project_id: 2, resource_id: 3 },
    ];
    await knex("project_resources").insert(projectResources);
};
