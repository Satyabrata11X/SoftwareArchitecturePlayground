// ==========================================
// Simulation Dashboard
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadArchitectures();

    document
        .getElementById("architectureSelect")
        .addEventListener("change", loadComponents);

    document
        .getElementById("trafficBtn")
        .addEventListener("click", runTrafficSimulation);

    document
        .getElementById("failureBtn")
        .addEventListener("click", runFailureSimulation);

    document
        .getElementById("bottleneckBtn")
        .addEventListener("click", runBottleneckSimulation);

});

// ==========================================
// Load Architectures
// ==========================================

async function loadArchitectures() {

    try {

        const response = await fetch("/architectures");

        if (!response.ok)
            throw new Error("Unable to load architectures");

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

        alert("Failed to load architectures.");

    }

}

// ==========================================
// Load Components
// ==========================================

async function loadComponents() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    if (architectureId === "") {

        document.getElementById("componentSelect").innerHTML =
            "<option value=''>Select Component</option>";

        document.getElementById("architecturePreview").innerHTML = "";

        return;

    }

    try {

        const response =
            await fetch(`/components/architecture/${architectureId}`);

        if (!response.ok)
            throw new Error("Unable to load components");

        const components = await response.json();

        const select =
            document.getElementById("componentSelect");

        select.innerHTML =
            "<option value=''>Select Component</option>";

        components.forEach(component => {

            select.innerHTML += `

                <option value="${component.id}">
                    ${component.name}
                </option>

            `;

        });

        displayArchitecturePreview(components);

    }

    catch (error) {

        console.error(error);

        alert("Failed to load components.");

    }

}

// ==========================================
// Traffic Simulation
// ==========================================

async function runTrafficSimulation() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    const users =
        document.getElementById("users").value;

    if (architectureId === "") {

        alert("Please select an architecture.");

        return;

    }

    try {

        const response =
            await fetch(`/simulation/traffic?architectureId=${architectureId}&users=${users}`);

        if (!response.ok)
            throw new Error("Traffic Simulation Failed");

        const results = await response.json();

        displayTrafficResults(results);

    }

    catch (error) {

        console.error(error);

        alert("Traffic simulation failed.");

    }

}

// ==========================================
// Failure Simulation
// ==========================================

async function runFailureSimulation() {

    const componentId =
        document.getElementById("componentSelect").value;

    if (componentId === "") {

        alert("Please select a component.");

        return;

    }

    try {

        const response =
            await fetch(`/failure?componentId=${componentId}`);

        if (!response.ok)
            throw new Error("Failure Simulation Failed");

        const results = await response.json();

        displayFailureResults(results);

    }

    catch (error) {

        console.error(error);

        alert("Failure simulation failed.");

    }

}

// ==========================================
// Bottleneck Detection
// ==========================================

async function runBottleneckSimulation() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    const users =
        document.getElementById("users").value;

    if (architectureId === "") {

        alert("Please select an architecture.");

        return;

    }

    try {

        const response =
            await fetch(`/bottleneck?architectureId=${architectureId}&users=${users}`);

        if (!response.ok)
            throw new Error("Bottleneck Detection Failed");

        const result = await response.json();

        displayBottleneck(result);

    }

    catch (error) {

        console.error(error);

        alert("Bottleneck detection failed.");

    }

}

// ==========================================
// Display Traffic Results
// ==========================================

function displayTrafficResults(results) {

    const container = document.getElementById("simulationResult");

    container.innerHTML = "";

    if (results.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-info"></i>
                <h4>No Results</h4>
            </div>
        `;

        return;
    }

    results.forEach(result => {

        let cssClass = "status-success";

        if (result.status.toUpperCase().includes("HIGH"))
            cssClass = "status-warning";

        if (result.status.toUpperCase().includes("FAIL"))
            cssClass = "status-danger";

        container.innerHTML += `

            <div class="result-card ${cssClass}">

                <h5>
                    <i class="fa-solid fa-microchip"></i>
                    ${result.componentName}
                </h5>

                <p>
                    <strong>Load :</strong>
                    ${result.loadPercentage.toFixed(2)}%
                </p>

                <p>
                    <strong>Status :</strong>
                    ${result.status}
                </p>

            </div>

        `;

    });

}

// ==========================================
// Display Failure Results
// ==========================================

function displayFailureResults(results) {

    const container = document.getElementById("simulationResult");

    container.innerHTML = "";

    if(results.length===0){

        container.innerHTML=`
            <div class="empty-state">
                <h4>No Components Affected</h4>
            </div>
        `;

        return;
    }

    results.forEach(result => {

        container.innerHTML += `

            <div class="result-card status-danger">

                <h5>

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    ${result.componentName}

                </h5>

                <p>

                    ${result.status}

                </p>

            </div>

        `;

    });

}

// ==========================================
// Display Bottleneck
// ==========================================

function displayBottleneck(result) {

    const container =
        document.getElementById("simulationResult");

    container.innerHTML = `

        <div class="result-card status-warning">

            <h5>

                <i class="fa-solid fa-fire"></i>

                ${result.componentName}

            </h5>

            <p>

                <strong>Load :</strong>

                ${result.loadPercentage.toFixed(2)}%

            </p>

            <p>

                <strong>Status :</strong>

                ${result.status}

            </p>

        </div>

    `;

}

// ==========================================
// Architecture Preview
// ==========================================

function displayArchitecturePreview(components) {

    const preview =
        document.getElementById("architecturePreview");

    preview.innerHTML = "";

    if (components.length === 0) {

        preview.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-sitemap"></i>

                <h4>No Components Found</h4>

            </div>

        `;

        return;

    }

    components.forEach(component => {

        let icon = "fa-microchip";

        switch(component.type){

            case "CLIENT":
                icon="fa-user";
                break;

            case "API_GATEWAY":
                icon="fa-globe";
                break;

            case "SERVICE":
                icon="fa-server";
                break;

            case "DATABASE":
                icon="fa-database";
                break;

            case "CACHE":
                icon="fa-bolt";
                break;

            case "QUEUE":
                icon="fa-list";
                break;

            case "LOAD_BALANCER":
                icon="fa-scale-balanced";
                break;

            default:
                icon="fa-microchip";

        }

        preview.innerHTML += `

            <div class="architecture-card">

                <i class="fa-solid ${icon} architecture-icon"></i>

                <h5>${component.name}</h5>

                <span>${component.type.replaceAll("_"," ")}</span>

            </div>

        `;

    });

}