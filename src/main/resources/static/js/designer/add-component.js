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

    if (architectureId === "") {

        alert("Please select an architecture.");

        return;

    }

    if (name === "") {

        alert("Component name is required.");

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

        const response =
            await fetch("/components", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(component)

            });

        if (!response.ok) {

            throw new Error("Unable to create component.");

        }

        // Close modal

        bootstrap.Modal
            .getInstance(document.getElementById("addComponentModal"))
            .hide();

        // Clear fields

        document.getElementById("componentName").value = "";

        document.getElementById("componentType").value = "SERVICE";

        // Reload canvas

        loadComponents(architectureId);

        console.log("Component Created Successfully");

    }

    catch (error) {

        console.error(error);

        alert("Failed to create component.");

    }

}