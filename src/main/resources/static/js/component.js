// =============================================
// Component Management
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    loadArchitectures();
    loadComponents();

    document
        .getElementById("componentForm")
        .addEventListener("submit", createComponent);

});

// =============================================
// Load Architectures
// =============================================

async function loadArchitectures() {

    try {

        const response = await fetch("/architectures");

        if (!response.ok) {
            throw new Error("Failed to load architectures.");
        }

        const architectures = await response.json();

        const select = document.getElementById("architectureSelect");

        select.innerHTML =
            `<option value="">Select Architecture</option>`;

        architectures.forEach(architecture => {

            select.innerHTML += `

                <option value="${architecture.id}">
                    ${architecture.name}
                </option>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =============================================
// Load Components
// =============================================

async function loadComponents() {

    try {

        const response = await fetch("/components");

        if (!response.ok) {
            throw new Error("Failed to load components.");
        }

        const components = await response.json();

        const table =
            document.getElementById("componentTable");

        table.innerHTML = "";

        components.forEach(component => {

            table.innerHTML += `

                <tr>

                    <td>${component.id}</td>

                    <td>${component.architecture.name}</td>

                    <td>${component.name}</td>

                    <td>

                        <span class="badge bg-primary">

                            ${component.type}

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-danger btn-sm"
                            onclick="deleteComponent(${component.id})">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// =============================================
// Create Component
// =============================================

async function createComponent(event) {

    event.preventDefault();

    const architectureId =
        document.getElementById("architectureSelect").value;

    if (architectureId === "") {

        alert("Please select an Architecture.");

        return;

    }

    const component = {

        name: document.getElementById("componentName").value,

        type: document.getElementById("componentType").value,

        architecture: {

            id: Number(architectureId)

        }

    };

    try {

        const response = await fetch("/components", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(component)

        });

        if (!response.ok) {

            throw new Error("Unable to create component.");

        }

        document.getElementById("componentForm").reset();

        loadComponents();

        alert("Component created successfully.");

    } catch (error) {

        console.error(error);

        alert("Failed to create component.");

    }

}

// =============================================
// Delete Component
// =============================================

async function deleteComponent(id) {

    if (!confirm("Delete this component?")) {

        return;

    }

    try {

        const response = await fetch(`/components/${id}`, {

            method: "DELETE"

        });

        if (!response.ok) {

            throw new Error("Delete failed.");

        }

        loadComponents();

    } catch (error) {

        console.error(error);

        alert("Unable to delete component.");

    }

}