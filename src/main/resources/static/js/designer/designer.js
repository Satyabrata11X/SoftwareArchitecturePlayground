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

        const response = await fetch("/architectures");

        if (!response.ok) {

            throw new Error("Unable to load architectures.");

        }

        const architectures = await response.json();

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

        const response =
            await fetch(`/components/architecture/${architectureId}`);

        if (!response.ok) {

            throw new Error("Unable to load components.");

        }

        const components =
            await response.json();

        console.log("Components:", components);

       components.forEach(component => {

    createNode(component, components);

});

        await loadConnections(architectureId);

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Create Node
// ==========================================

function createNode(component, components) {

    const canvas =
        document.getElementById("designerCanvas");

    const node =
        document.createElement("div");

    node.className = "node";

    node.id =
        "component-" + component.id;

    node.innerHTML = `

        <i class="${getComponentIcon(component.type)}"></i>

        <span>${component.name}</span>

    `;

    // Layout Module
const position =
    getNodePosition(component, components);

    node.style.left =
        position.left + "px";

    node.style.top =
        position.top + "px";

    canvas.appendChild(node);

    // Drag Module

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