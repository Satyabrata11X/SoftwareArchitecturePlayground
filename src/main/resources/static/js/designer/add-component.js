// ==========================================
// Add Component Module
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const createButton =
        document.getElementById("createComponentBtn");

    createButton.addEventListener("click", createComponent);

});

// ==========================================
// Create Component
// ==========================================

async function createComponent() {

    const architectureId =
        document.getElementById("architectureSelect").value;

    const name =
        document.getElementById("componentName").value.trim();

    const type =
        document.getElementById("componentType").value;

    // ==========================================
    // Validation
    // ==========================================

    if (architectureId === "") {

        Swal.fire({

            icon: "warning",

            title: "Architecture Required",

            text: "Please select an architecture."

        });

        return;

    }

    if (name === "") {

        Swal.fire({

            icon: "warning",

            title: "Component Name Required",

            text: "Please enter a component name."

        });

        return;

    }

    const component = {

        name: name,

        type: type,

        architecture: {

            id: architectureId

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

        // ==========================================
        // Duplicate Component
        // ==========================================

        if (response.status === 409) {

            const message = await response.text();

            Swal.fire({

                icon: "error",

                title: "Duplicate Component",

                text: message

            });

            return;

        }

        // ==========================================
        // Other Errors
        // ==========================================

        if (!response.ok) {

            throw new Error("Unable to create component.");

        }

        // ==========================================
        // Success
        // ==========================================

        bootstrap.Modal
            .getInstance(document.getElementById("addComponentModal"))
            .hide();

        document.getElementById("componentName").value = "";

        document.getElementById("componentType").value = "SERVICE";

        await loadComponents(architectureId);

        Swal.fire({

            icon: "success",

            title: "Component Created",

            text: "Component has been added successfully.",

            timer: 1800,

            showConfirmButton: false

        });

        console.log("Component Created Successfully");

    }

    catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Creation Failed",

            text: "Unable to create component."

        });

    }

}