// =============================================
// Software Architecture Playground
// Architecture Management
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    loadArchitectures();

    document
        .getElementById("architectureForm")
        .addEventListener("submit", createArchitecture);

});

// =============================================
// Load All Architectures
// =============================================

async function loadArchitectures() {

    try {

        const response = await fetch("/architectures");

        if (!response.ok) {
            throw new Error("Failed to fetch architectures.");
        }

        const architectures = await response.json();

        const tableBody =
            document.getElementById("architectureTable");

        tableBody.innerHTML = "";

        architectures.forEach(architecture => {

            tableBody.innerHTML += `

                <tr>

                    <td>${architecture.id}</td>

                    <td>${architecture.name}</td>

                    <td>${architecture.description ?? ""}</td>

                    <td>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteArchitecture(${architecture.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("Unable to load architectures.");

    }

}

// =============================================
// Create Architecture
// =============================================

async function createArchitecture(event) {

    event.preventDefault();

    const architecture = {

        name: document.getElementById("architectureName").value.trim(),

        description: document.getElementById("architectureDescription").value.trim()

    };

    if (architecture.name === "") {

        alert("Architecture name is required.");

        return;

    }

    try {

        const response = await fetch("/architectures", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(architecture)

        });

        if (!response.ok) {

            throw new Error("Failed to create architecture.");

        }

        document.getElementById("architectureForm").reset();

        loadArchitectures();

        alert("Architecture created successfully.");

    }

    catch (error) {

        console.error(error);

        alert("Something went wrong while creating the architecture.");

    }

}

// =============================================
// Delete Architecture
// =============================================

async function deleteArchitecture(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this architecture?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(`/architectures/${id}`, {

            method: "DELETE"

        });

        if (!response.ok) {

            throw new Error("Delete failed.");

        }

        loadArchitectures();

        alert("Architecture deleted successfully.");

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete architecture.");

    }

}