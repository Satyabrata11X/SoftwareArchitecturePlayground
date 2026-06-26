// ===============================================
// Connection Management
// ===============================================

document.addEventListener("DOMContentLoaded", () => {

    loadComponents();
    loadConnections();

    document
        .getElementById("connectionForm")
        .addEventListener("submit", createConnection);

});

// ===============================================
// Load Components into Dropdowns
// ===============================================

async function loadComponents() {

    try {

        const response = await fetch("/components");

        if (!response.ok) {
            throw new Error("Failed to load components.");
        }

        const components = await response.json();

        const source =
            document.getElementById("sourceComponent");

        const target =
            document.getElementById("targetComponent");

        source.innerHTML =
            "<option value=''>Select Source Component</option>";

        target.innerHTML =
            "<option value=''>Select Target Component</option>";

        components.forEach(component => {

            source.innerHTML +=
                `<option value="${component.id}">
                    ${component.name}
                </option>`;

            target.innerHTML +=
                `<option value="${component.id}">
                    ${component.name}
                </option>`;

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================================
// Load Connections
// ===============================================

async function loadConnections() {

    try {

        const response = await fetch("/connections");

        if (!response.ok) {
            throw new Error("Failed to load connections.");
        }

        const connections = await response.json();

        const table =
            document.getElementById("connectionTable");

        table.innerHTML = "";

        connections.forEach(connection => {

            table.innerHTML += `

                <tr>

                    <td>${connection.id}</td>

                    <td>${connection.sourceComponent.name}</td>

                    <td>${connection.targetComponent.name}</td>

                    <td>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteConnection(${connection.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

    }

}

// ===============================================
// Create Connection
// ===============================================

async function createConnection(event) {

    event.preventDefault();

    const sourceId =
        document.getElementById("sourceComponent").value;

    const targetId =
        document.getElementById("targetComponent").value;

    if (sourceId === "" || targetId === "") {

        alert("Please select both components.");

        return;

    }

    if (sourceId === targetId) {

        alert("Source and Target cannot be the same.");

        return;

    }

    const connection = {

        sourceComponent: {
            id: Number(sourceId)
        },

        targetComponent: {
            id: Number(targetId)
        }

    };

    try {

        const response = await fetch("/connections", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(connection)

        });

        if (!response.ok) {

            throw new Error("Unable to create connection.");

        }

        document
            .getElementById("connectionForm")
            .reset();

        loadConnections();

        alert("Connection created successfully.");

    }

    catch (error) {

        console.error(error);

        alert("Failed to create connection.");

    }

}

// ===============================================
// Delete Connection
// ===============================================

async function deleteConnection(id) {

    if (!confirm("Delete this connection?")) {

        return;

    }

    try {

        const response = await fetch(`/connections/${id}`, {

            method: "DELETE"

        });

        if (!response.ok) {

            throw new Error("Delete failed.");

        }

        loadConnections();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete connection.");

    }

}