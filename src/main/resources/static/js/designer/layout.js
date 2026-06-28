// ==========================================
// Graph Layout Engine
// ==========================================

console.log("Graph Layout Loaded");

// ==========================================
// Get Node Position
// ==========================================

function getNodePosition(component, graph) {

    const canvas =
    document.getElementById("designerCanvas");

const canvasWidth =
    canvas.clientWidth;

    const topMargin = 50;

    const verticalSpacing = 180;

    const horizontalSpacing = 280;

    // Current Node

    const currentNode = graph[component.id];

    const currentLevel = currentNode.level;

    // All nodes in same level

    const levelNodes = Object.values(graph).filter(node => {

        return node.level === currentLevel;

    });

    // Sort nodes for consistent layout

    levelNodes.sort((a, b) => {

        return a.component.id - b.component.id;

    });

    // Index inside level

    const index = levelNodes.findIndex(node => {

        return node.component.id === component.id;

    });

    // Calculate total width occupied

    const totalWidth =
        (levelNodes.length - 1) * horizontalSpacing;

    // Start from center

    const startX =
        (canvasWidth - totalWidth) / 2;

    return {

        left: startX + (index * horizontalSpacing),

        top: topMargin + (currentLevel * verticalSpacing)

    };

}