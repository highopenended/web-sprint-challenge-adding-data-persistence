const db = require("../../data/dbConfig");

async function getResources() {
    const resources = await db("resources").select("resource_id", "resource_name", "resource_description");
    return resources;
}

async function addResource(resource) {
    const resource_id = await db("resources")
        .insert(resource)
        .then(() => db("resources").max("resource_id as id").first());
    const newResource = await db("resources").where("resource_id", resource_id.id).first();
    return {
        resource_id: newResource.resource_id,
        resource_name: newResource.resource_name,
        resource_description: newResource.resource_description || null,
    };
}

module.exports = {
    getResources,
    addResource,
};
