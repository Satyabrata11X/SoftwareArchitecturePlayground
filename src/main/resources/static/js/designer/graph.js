// ==========================================
// Graph Engine
// ==========================================

console.log("Graph Engine Loaded");

// ==========================================
// Build Graph
// ==========================================

function buildGraph(components, connections) {

    console.log("Building Graph...");

    const graph = {};

    // Create graph nodes
    components.forEach(component => {

        graph[component.id] = {

            component: component,

            parents: [],

            children: [],

            level: -1

        };

    });

    // Create graph relationships
    connections.forEach(connection => {

        const sourceId = connection.sourceComponent.id;

        const targetId = connection.targetComponent.id;

        if (graph[sourceId] && graph[targetId]) {

            graph[sourceId].children.push(targetId);

            graph[targetId].parents.push(sourceId);

        }

    });

    console.log("Graph :", graph);

    return graph;

}

// ==========================================
// Find Root Node
// ==========================================

function findRootNode(graph) {

    console.log("Finding Root Node...");

    for (const id in graph) {

        if (graph[id].parents.length === 0) {

            console.log("Root Node :", graph[id]);

            return graph[id];

        }

    }

    return null;

}

// ==========================================
// Calculate Levels (Breadth First Search)
// ==========================================

function calculateLevels(graph, root) {

    console.log("Calculating Levels...");

    if (!root) {

        console.warn("Root node not found.");

        return;

    }

    // Reset all levels

    Object.values(graph).forEach(node => {

        node.level = -1;

    });

    const queue = [];

    root.level = 0;

    queue.push(root);

    // BFS Traversal

    while (queue.length > 0) {

        const current = queue.shift();

        current.children.forEach(childId => {

            const child = graph[childId];

            if (child && child.level === -1) {

                child.level = current.level + 1;

                queue.push(child);

            }

        });

    }

    // ---------------------------------------
    // Place disconnected nodes on new level
    // ---------------------------------------

    let maxLevel = 0;

    Object.values(graph).forEach(node => {

        if (node.level > maxLevel) {

            maxLevel = node.level;

        }

    });

    Object.values(graph).forEach(node => {

        if (node.level === -1) {

            node.level = maxLevel + 1;

        }

    });

    console.log("Levels Assigned:");

    Object.values(graph).forEach(node => {

        console.log(

            node.component.name,

            "=> Level",

            node.level

        );

    });

}

// ==========================================
// Group Nodes By Level
// ==========================================

function getNodesByLevel(graph) {

    console.log("Grouping Nodes By Level...");

    const levels = {};

    Object.values(graph).forEach(node => {

        const level = node.level;

        if (!levels[level]) {

            levels[level] = [];

        }

        levels[level].push(node);

    });

    console.log("Nodes By Level :", levels);

    return levels;

}

// ==========================================
// Get All Root Nodes
// ==========================================

function getRootNodes(graph) {

    return Object.values(graph).filter(node => node.parents.length === 0);

}

// ==========================================
// Get Leaf Nodes
// ==========================================

function getLeafNodes(graph) {

    return Object.values(graph).filter(node => node.children.length === 0);

}