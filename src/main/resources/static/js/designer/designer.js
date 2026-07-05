// ==========================================
// Software Architecture Designer
// Main Controller
// ==========================================

// ==========================================
// Current Designer State
// ==========================================

let currentComponents = [];

let currentConnections = [];

let currentGraph = null;

// ==========================================
// Initialize
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

        const architectureId =
            this.value;

        if (!architectureId) {

            clearCanvas();

            return;

        }

        loadComponents(architectureId);

    });

    // --------------------------------------
    // Auto Layout
    // --------------------------------------

    document
        .getElementById("autoLayoutBtn")
        .addEventListener("click", autoLayout);

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

        // --------------------------------------
        // Load Components
        // --------------------------------------

        const componentResponse =
            await fetch(`/components/architecture/${architectureId}`);

        if (!componentResponse.ok) {

            throw new Error("Unable to load components.");

        }

        currentComponents =
            await componentResponse.json();

        console.log("Components:", currentComponents);

        // --------------------------------------
        // Load Connections
        // --------------------------------------

        currentConnections =
            await loadConnections(architectureId);

        console.log("Connections:", currentConnections);

        // --------------------------------------
        // Build Graph
        // --------------------------------------

        currentGraph =
            buildGraph(currentComponents, currentConnections);

        console.log("Architecture Graph:", currentGraph);

        const root =
            findRootNode(currentGraph);

        calculateLevels(currentGraph, root);

        getNodesByLevel(currentGraph);

        // --------------------------------------
        // Create Nodes
        // --------------------------------------

        currentComponents.forEach(component => {

            createNode(component, currentGraph);

        });

        // --------------------------------------
        // Draw Connections
        // --------------------------------------

        currentConnections.forEach(connection => {

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

    <div
        class="node-badge"
        style="background:${getBadgeColor(component.type)}">

        ${formatComponentType(component.type)}

    </div>

   <div class="node-name">

    ${component.name}

</div>

`;

    // --------------------------------------
    // Initial Position
    // --------------------------------------

    const position =
        getNodePosition(component, graph);

    node.style.left =
        position.left + "px";

    node.style.top =
        position.top + "px";

    canvas.appendChild(node);

    // --------------------------------------
    // Delete Component
    // --------------------------------------

    const deleteButton =
        node.querySelector(".delete-btn");

    deleteButton.addEventListener("click", async (event) => {

        event.stopPropagation();

        const result =
            await Swal.fire({

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

    // --------------------------------------
    // Enable Dragging
    // --------------------------------------

    enableDragging(node);

}

// ==========================================
// Format Component Type
// ==========================================

function formatComponentType(type) {

    return type.replaceAll("_", " ");

}

// ==========================================
// Badge Color
// ==========================================

function getBadgeColor(type) {

    switch (type) {

        case "CLIENT":
            return "#2563eb";

        case "LOAD_BALANCER":
            return "#7c3aed";

        case "API_GATEWAY":
            return "#ea580c";

        case "SERVICE":
            return "#16a34a";

        case "DATABASE":
            return "#dc2626";

        case "CACHE":
            return "#ca8a04";

        case "QUEUE":
            return "#6b7280";

        default:
            return "#2563eb";

    }

}

// ==========================================
// Auto Layout
// ==========================================

async function autoLayout() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    if (!architectureId) {

        Swal.fire({

            icon: "warning",

            title: "No Architecture Selected",

            text: "Please select an architecture first."

        });

        return;

    }

    await loadComponents(architectureId);

    Swal.fire({

        icon: "success",

        title: "Layout Updated",

        timer: 1200,

        showConfirmButton: false

    });

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