// ==========================================
// Packet Engine
// ==========================================

console.log("Packet Engine Loaded");

// ==========================================
// Create Packet Tasks
// ==========================================

function buildPacketTasks(graph) {

    const root = findRootNode(graph);

    if (!root) {

        return [];

    }

    const tasks = [];

    traverse(root);

    console.table(tasks);

    return tasks;

    function traverse(node) {

        tasks.push({

            componentId: node.component.id,

            componentName: node.component.name,

            level: node.level

        });

        node.children.forEach(childId => {

            traverse(graph[childId]);

        });

    }

}