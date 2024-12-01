exports.up = async function (knex) {
    console.log('making it')
    await knex.schema

        // Projects Table
        .createTable("projects", (table) => {
            table.increments("project_id"); // Primary key
            table.string("project_name").notNullable(); // Required
            table.string("project_description"); // Optional
            table.boolean("project_completed").defaultTo(false); // Defaults to false (0)
        })

        // Resources Table
        .createTable("resources", (table) => {
            table.increments("resource_id"); // Primary key
            table.string("resource_name").notNullable().unique(); // Required and unique
            table.string("resource_description"); // Optional
        })

        // Tasks Table
        .createTable("tasks", (table) => {
            table.increments("task_id"); // Primary key
            table.string("task_description").notNullable(); // Required
            table.string("task_notes"); // Optional
            table.boolean("task_completed").defaultTo(false); // Defaults to false (0)
            table
                .integer("project_id") // Foreign key to projects
                .unsigned()
                .notNullable()
                .references("project_id")
                .inTable("projects")
                .onDelete("CASCADE"); // Ensures related tasks are deleted if project is deleted
        })
        
        // Project Resources Table
        .createTable("project_resources", (table) => {
            table.increments("id"); // Primary key
            table
                .integer("project_id") // Foreign key to projects
                .unsigned()
                .notNullable()
                .references("project_id")
                .inTable("projects")
                .onDelete("CASCADE"); // Ensures resources are removed with the project
            table
                .integer("resource_id") // Foreign key to resources
                .unsigned()
                .notNullable()
                .references("resource_id")
                .inTable("resources")
                .onDelete("CASCADE"); // Ensures references are removed if resource is deleted
        });
};

exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists("project_resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects");
};
