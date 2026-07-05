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
                            onclick="deleteArchitecture(${architecture.id}, '${architecture.name}')">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Loading Failed",

            text: "Unable to load architectures."

        });

    }

}

// =============================================
// Create Architecture
// =============================================

async function createArchitecture(event) {

    event.preventDefault();

    const architecture = {

        name:
            document.getElementById("architectureName")
                .value.trim(),

        description:
            document.getElementById("architectureDescription")
                .value.trim()

    };

    if (architecture.name === "") {

        Swal.fire({

            icon: "warning",

            title: "Architecture Name Required",

            text: "Please enter an architecture name."

        });

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

            throw new Error();

        }

        document
            .getElementById("architectureForm")
            .reset();

        await loadArchitectures();

        Swal.fire({

            icon: "success",

            title: "Architecture Created",

            text: "Architecture has been created successfully.",

            timer: 1800,

            showConfirmButton: false

        });

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Creation Failed",

            text: "Unable to create architecture."

        });

    }

}

// =============================================
// Delete Architecture
// =============================================

async function deleteArchitecture(id, name) {

    const result = await Swal.fire({

        icon: "warning",

        title: "Delete Architecture?",

        html: `

            <b>${name}</b>

            <br><br>

            This will permanently delete:

            <br>

            • Architecture

            <br>

            • Components

            <br>

            • Connections

            <br>

            • Saved Layout

        `,

        showCancelButton: true,

        confirmButtonColor: "#dc3545",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Delete",

        cancelButtonText: "Cancel"

    });

    if (!result.isConfirmed) {

        return;

    }

    try {

        const response = await fetch(`/architectures/${id}`, {

            method: "DELETE"

        });

        if (!response.ok) {

            throw new Error();

        }

        await loadArchitectures();

        Swal.fire({

            icon: "success",

            title: "Architecture Deleted",

            timer: 1500,

            showConfirmButton: false

        });

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Deletion Failed",

            text: "Unable to delete architecture."

        });

    }

}