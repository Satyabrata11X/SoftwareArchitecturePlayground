// ==========================================
// Software Architecture Designer
// Main Controller
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Designer Module Started");

    jsPlumb.ready(() => {

        console.log("jsPlumb Initialized");

        initializeDesigner();

    });

});

// ==========================================
// Initialize Designer
// ==========================================

function initializeDesigner() {

    loadArchitectures();

    registerEvents();

}

// ==========================================
// Register Events
// ==========================================

function registerEvents() {

    const architectureSelect =
        document.getElementById("architectureSelect");

    architectureSelect.addEventListener("change", function () {

        const architectureId = this.value;

        if (!architectureId) {

            clearCanvas();

            return;

        }

        loadComponents(architectureId);

    });

}

// ==========================================
// Load Architectures
// ==========================================

async function loadArchitectures() {

    try {

        const response =
            await fetch("/architectures");

        if (!response.ok) {

            throw new Error("Unable to load architectures.");

        }

        const architectures =
            await response.json();

        const select =
            document.getElementById("architectureSelect");

        select.innerHTML =
            "<option value=''>Select Architecture</option>";

        architectures.forEach(architecture => {

            select.innerHTML += `

                <option value="${architecture.id}">

                    ${architecture.name}

                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Load Components
// ==========================================

async function loadComponents(architectureId) {

    try {

        clearCanvas();

        // Load Components

        const componentResponse =
            await fetch(`/components/architecture/${architectureId}`);

        if (!componentResponse.ok) {

            throw new Error("Unable to load components.");

        }

        const components =
            await componentResponse.json();

        console.log("Components:", components);

        // Load Connections

        const connections =
            await loadConnections(architectureId);

        console.log("Connections:", connections);

        // Build Graph

        const graph =
            buildGraph(components, connections);

        console.log("Architecture Graph:", graph);

        // Find Root

        const root =
            findRootNode(graph);

        console.log("Root:", root);

        // Calculate Levels

        calculateLevels(graph, root);

        // Group Nodes

        const levels =
            getNodesByLevel(graph);

        console.log("Levels:", levels);

        // Create Nodes

        components.forEach(component => {

            createNode(component, graph);

        });

        // Draw Connections

        connections.forEach(connection => {

            drawConnection(connection);

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Create Node
// ==========================================

function createNode(component, graph) {

    const canvas =
        document.getElementById("designerCanvas");

    const node =
        document.createElement("div");

    node.className = "node";

    node.id =
        "component-" + component.id;

   node.innerHTML = `

    <button class="delete-btn">

        <i class="fa-solid fa-trash"></i>

    </button>

    <i class="${getComponentIcon(component.type)}"></i>

    <span>${component.name}</span>

`;

    // Layout

    const position =
        getNodePosition(component, graph);

    node.style.left =
        position.left + "px";

    node.style.top =
        position.top + "px";

    canvas.appendChild(node);

 const deleteButton =
    node.querySelector(".delete-btn");

deleteButton.addEventListener("click", async (event) => {

    event.stopPropagation();

    const result = await Swal.fire({

        title: "Delete Component?",

        text: `Delete "${component.name}"?`,

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#dc3545",

        confirmButtonText: "Delete",

        cancelButtonText: "Cancel"

    });

    if (!result.isConfirmed) {

        return;

    }

    try {

        const response =
            await fetch(`/components/${component.id}`, {

                method: "DELETE"

            });

        if (!response.ok) {

            throw new Error();

        }

        Swal.fire({

            icon: "success",

            title: "Component Deleted",

            timer: 1200,

            showConfirmButton: false

        });

        const architectureId =
            document.getElementById("architectureSelect").value;

        loadComponents(architectureId);

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Unable to delete component."

        });

    }

});
    // Enable Dragging

    enableDragging(node);

}

// ==========================================
// Clear Canvas
// ==========================================

function clearCanvas() {

    const canvas =
        document.getElementById("designerCanvas");

    jsPlumb.reset();

    canvas.innerHTML = "";

}