// ==========================================
// Simulation Module

// ==========================================

// ==========================================
// Global State
// ==========================================

let simulationRunning = false;

// ==========================================
// Initialize
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeSimulation();

});

// ==========================================
// Initialize Simulation
// ==========================================

function initializeSimulation() {

    const simulationBtn =
        document.getElementById("simulationBtn");

    if (simulationBtn) {

        simulationBtn.addEventListener(
            "click",
            openSimulationModal
        );

    }

    const executeBtn =
        document.getElementById("executeSimulationBtn");

    if (executeBtn) {

        executeBtn.addEventListener(
            "click",
            executeSimulationFromModal
        );

    }

}

// ==========================================
// Open Simulation Modal
// ==========================================

function openSimulationModal() {

    if (simulationRunning) {

        stopSimulation();

        return;

    }

    const modal = new bootstrap.Modal(

        document.getElementById("simulationModal")

    );

    modal.show();

}

// ==========================================
// Execute Simulation
// ==========================================

function executeSimulationFromModal() {

    bootstrap.Modal
        .getInstance(
            document.getElementById("simulationModal")
        )
        .hide();

    startSimulation();

}

// ==========================================
// Start Simulation
// ==========================================

async function startSimulation() {

    simulationRunning = true;

    // Lock Designer
    lockDesigner(true);

    // Update Button
    updateSimulationButton(true);

    // Show Overlay
    showSimulationOverlay();

    // --------------------------------------
    // Step 1 - Read Architecture
    // --------------------------------------

    updateSimulationStep(1);

    await sleep(500);

    // --------------------------------------
    // Step 2 - Build Graph
    // --------------------------------------

    updateSimulationStep(2);

    await sleep(500);

    // --------------------------------------
    // Step 3 - Generate Request Plan
    // --------------------------------------

    updateSimulationStep(3);

    await sleep(500);

    // --------------------------------------
    // Step 4 - Backend Simulation
    // --------------------------------------

    await executeSimulation();

    updateSimulationStep(4);

    await sleep(500);

    // --------------------------------------
    // Step 5 - Start Traffic Animation
    // --------------------------------------

    startTrafficAnimation(currentGraph);

    updateSimulationStep(5);

    await sleep(800);

    // Hide Overlay
    hideSimulationOverlay();

}

// ==========================================
// Stop Simulation
// ==========================================

function stopSimulation() {

    simulationRunning = false;

    lockDesigner(false);

    updateSimulationButton(false);

    removeSimulationBadges();

}

// ==========================================
// Update Button
// ==========================================

function updateSimulationButton(running) {

    const button =
        document.getElementById("simulationBtn");

    if (!button) return;

    if (running) {

        button.innerHTML = `

            <i class="fa-solid fa-stop"></i>

            Stop Simulation

        `;

        button.classList.remove("btn-danger");

        button.classList.add("btn-warning");

    }

    else {

        button.innerHTML = `

            <i class="fa-solid fa-play"></i>

            Run Simulation

        `;

        button.classList.remove("btn-warning");

        button.classList.add("btn-danger");

    }

}

// ==========================================
// Lock Designer
// ==========================================

function lockDesigner(lock) {

    const ids = [

        "architectureSelect",

        "addComponentBtn",

        "addConnectionBtn",

        "autoLayoutBtn",

        "exportPngBtn",

        "exportPdfBtn"

    ];

    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.disabled = lock;

        }

    });

}

// ==========================================
// Backend Simulation
// ==========================================

async function executeSimulation() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    const users =
        document.getElementById("simulationUsers").value;

    try {

        const response =
            await fetch(

                `/simulation/traffic?architectureId=${architectureId}&users=${users}`

            );

        if (!response.ok) {

            throw new Error("Simulation Failed");

        }

        const results =
            await response.json();

        console.log(results);

        updateSimulationBadges(results);

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// Update Badges
// ==========================================

function updateSimulationBadges(results) {

    removeSimulationBadges();

    results.forEach(result => {

        const component =

            currentComponents.find(c =>

                c.name === result.componentName

            );

        if (!component) return;

        addSimulationBadge(

            component.id,

            result.status,

            result.loadPercentage

        );

    });

}

// ==========================================
// Add Simulation Badge
// ==========================================

function addSimulationBadge(componentId, status, percentage) {

    const node =
        document.getElementById("component-" + componentId);

    if (!node) return;

    // Remove existing badge

    const oldBadge =
        node.querySelector(".simulation-badge");

    if (oldBadge) {

        oldBadge.remove();

    }

    // Create badge

    const badge =
        document.createElement("div");

    badge.className =
        "simulation-badge simulation-" +
        status.toLowerCase();

    badge.innerHTML =
        `${Math.round(percentage)}%`;

    badge.title =
        `Status : ${status}
Load : ${percentage.toFixed(1)}%`;

    node.appendChild(badge);

}

// ==========================================
// Remove Badges
// ==========================================

function removeSimulationBadges() {

    document
        .querySelectorAll(".simulation-badge")
        .forEach(badge => badge.remove());

}

// ==========================================
// Show Professional Simulation Overlay
// ==========================================

function showSimulationOverlay() {

    const canvas =
        document.getElementById("designerCanvas");

    const overlay =
        document.createElement("div");

    overlay.className = "simulation-overlay";

    overlay.id = "simulationOverlay";

    overlay.innerHTML = `

        <div class="overlay-card">

            <div class="overlay-title">

                🚀 Initializing Simulation

            </div>

            <div class="progress">

                <div
                    id="simulationProgressBar"
                    class="progress-bar">
                </div>

            </div>

            <div
                id="step1"
                class="progress-step">

                <span>

                    📐 Reading Architecture

                </span>

                <span>

                    ⏳

                </span>

            </div>

            <div
                id="step2"
                class="progress-step">

                <span>

                    🕸 Building Graph

                </span>

                <span>

                    ⏳

                </span>

            </div>

            <div
                id="step3"
                class="progress-step">

                <span>

                    📦 Generating Request Plan

                </span>

                <span>

                    ⏳

                </span>

            </div>

            <div
                id="step4"
                class="progress-step">

                <span>

                    🚦 Starting Traffic Engine

                </span>

                <span>

                    ⏳

                </span>

            </div>

            <div
                id="step5"
                class="progress-step">

                <span>

                    ✅ Launching Live Simulation

                </span>

                <span>

                    ⏳

                </span>

            </div>

        </div>

    `;

    canvas.appendChild(overlay);

    animateSimulationOverlay();

}

// ==========================================
// Animate Simulation Overlay
// ==========================================

function animateSimulationOverlay() {

    const steps = [

        "step1",

        "step2",

        "step3",

        "step4",

        "step5"

    ];

    const progress =
        document.getElementById(
            "simulationProgressBar"
        );

    let percentage = 0;

    steps.forEach((stepId, index) => {

        setTimeout(() => {

            percentage += 20;

            progress.style.width =
                percentage + "%";

            const step =
                document.getElementById(stepId);

            step.classList.add("done");

            step.lastElementChild.innerHTML =
                "✅";

        }, (index + 1) * 500);

    });

}

// ==========================================
// Hide Overlay
// ==========================================

function hideSimulationOverlay() {

    const overlay =
        document.getElementById(
            "simulationOverlay"
        );

    if (overlay) {

        overlay.remove();

    }

}

// ==========================================
// Future Hook
// ==========================================

function startPacketAnimation() {

    console.log("Packet Animation Started");

}

// ==========================================
// Future Hook
// ==========================================

function stopPacketAnimation() {

    console.log("Packet Animation Stopped");

}

// ==========================================
// Future Hook
// ==========================================

function updateLiveMetrics() {

    console.log("Live Metrics");

}

// ==========================================
// Future Hook
// ==========================================

function generateSimulationReport() {

    console.log("Generate Report");

}

// ==========================================
// Future Hook
// ==========================================

function startScenarioEngine() {

    console.log("Scenario Engine");

}

// ==========================================
// Future Hook
// ==========================================

function stopScenarioEngine() {

    console.log("Scenario Engine Stopped");

}

// ==========================================
// Update Simulation Step
// ==========================================

function updateSimulationStep(stepNumber) {

    const progress =
        document.getElementById(
            "simulationProgressBar"
        );

    if (!progress) return;

    const percentage =
        stepNumber * 20;

    progress.style.width =
        percentage + "%";

    const step =
        document.getElementById(
            "step" + stepNumber
        );

    if (!step) return;

    step.classList.remove("active");

    step.classList.add("done");

    step.lastElementChild.innerHTML =
        "✅";

}

// ==========================================
// Sleep Helper
// ==========================================

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}