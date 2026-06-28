// ==========================================
// Add Connection Module
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const addConnectionButton =
        document.getElementById("addConnectionBtn");

    const createConnectionButton =
        document.getElementById("createConnectionBtn");

    // Load components when modal opens

    addConnectionButton.addEventListener("click", () => {

        loadComponentDropdowns();

    });

    // Create connection

    createConnectionButton.addEventListener("click", () => {

        createConnection();

    });

});

// ==========================================
// Load Components into Dropdowns
// ==========================================

async function loadComponentDropdowns() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    if (!architectureId) {

        Swal.fire({

            icon: "warning",

            title: "Select Architecture",

            text: "Please select an architecture first."

        });

        return;

    }

    try {

        const response =
            await fetch(`/components/architecture/${architectureId}`);

        if (!response.ok) {

            throw new Error("Unable to load components.");

        }

        const components =
            await response.json();

        const sourceSelect =
            document.getElementById("sourceComponent");

        const targetSelect =
            document.getElementById("targetComponent");

        sourceSelect.innerHTML =
            "<option value=''>Select Source Component</option>";

        targetSelect.innerHTML =
            "<option value=''>Select Target Component</option>";

        components.forEach(component => {

            sourceSelect.innerHTML += `

                <option value="${component.id}">
                    ${component.name}
                </option>

            `;

            targetSelect.innerHTML += `

                <option value="${component.id}">
                    ${component.name}
                </option>

            `;

        });

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Unable to Load Components"

        });

    }

}

// ==========================================
// Create Connection
// ==========================================

async function createConnection() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    const sourceId =
        document.getElementById("sourceComponent").value;

    const targetId =
        document.getElementById("targetComponent").value;

    // Validation

    if (!sourceId || !targetId) {

        Swal.fire({

            icon: "warning",

            title: "Select Components",

            text: "Please select both Source and Target."

        });

        return;

    }

    if (sourceId === targetId) {

        Swal.fire({

            icon: "warning",

            title: "Invalid Connection",

            text: "Source and Target cannot be the same."

        });

        return;

    }

    try {

        const response =
            await fetch("/connections", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    sourceComponent: {

                        id: sourceId

                    },

                    targetComponent: {

                        id: targetId

                    }

                })

            });

        if (response.status === 409) {

            const message =
                await response.text();

            Swal.fire({

                icon: "warning",

                title: "Connection Already Exists",

                text: message

            });

            return;

        }

        if (!response.ok) {

            throw new Error("Unable to create connection.");

        }

        // Close Modal

        bootstrap.Modal
            .getInstance(document.getElementById("addConnectionModal"))
            .hide();

        // Reset Dropdowns

        document.getElementById("sourceComponent").value = "";

        document.getElementById("targetComponent").value = "";

        // Reload Graph

        loadComponents(architectureId);

        Swal.fire({

            icon: "success",

            title: "Connection Created",

            timer: 1200,

            showConfirmButton: false

        });

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Connection Failed",

            text: "Unable to create connection."

        });

    }

}