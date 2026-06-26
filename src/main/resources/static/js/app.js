// ================================
// Software Architecture Playground
// Dashboard JavaScript
// ================================

document.addEventListener("DOMContentLoaded", function () {

    loadArchitectureCount();
    loadComponentCount();
    loadConnectionCount();

});

// ================================
// Architecture Count
// ================================

async function loadArchitectureCount() {

    try {

        const response = await fetch("/architectures");

        if (!response.ok) {
            throw new Error("Failed to load architectures");
        }

        const architectures = await response.json();

        document.getElementById("architectureCount").innerText =
            architectures.length;

    } catch (error) {

        console.error(error);

        document.getElementById("architectureCount").innerText = "--";

    }

}

// ================================
// Component Count
// ================================

async function loadComponentCount() {

    try {

        const response = await fetch("/components");

        if (!response.ok) {
            throw new Error("Failed to load components");
        }

        const components = await response.json();

        document.getElementById("componentCount").innerText =
            components.length;

    } catch (error) {

        console.error(error);

        document.getElementById("componentCount").innerText = "--";

    }

}

// ================================
// Connection Count
// ================================

async function loadConnectionCount() {

    try {

        const response = await fetch("/connections");

        if (!response.ok) {
            throw new Error("Failed to load connections");
        }

        const connections = await response.json();

        document.getElementById("connectionCount").innerText =
            connections.length;

    } catch (error) {

        console.error(error);

        document.getElementById("connectionCount").innerText = "--";

    }

}