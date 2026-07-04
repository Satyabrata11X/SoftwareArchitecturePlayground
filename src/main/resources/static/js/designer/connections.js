// ==========================================
// Connections Module
// ==========================================

// ==========================================
// Load Connections
// ==========================================

async function loadConnections(architectureId) {

    try {

        const response =
            await fetch(`/connections/architecture/${architectureId}`);

        if (!response.ok) {

            throw new Error("Unable to load connections.");

        }

        const connections =
            await response.json();

        console.log("Connections:", connections);

        return connections;

    }

    catch (error) {

        console.error(error);

        return [];

    }

}

// ==========================================
// Draw Connection
// ==========================================

function drawConnection(connection) {

    const sourceId =
        "component-" + connection.sourceComponent.id;

    const targetId =
        "component-" + connection.targetComponent.id;

    // --------------------------------------
    // Ensure both nodes exist
    // --------------------------------------

    if (
        !document.getElementById(sourceId) ||
        !document.getElementById(targetId)
    ) {

        console.warn(
            "Connection skipped:",
            sourceId,
            "->",
            targetId
        );

        return;

    }

    // --------------------------------------
    // Draw Connection
    // --------------------------------------

    const jsConnection = jsPlumb.connect({

        source: sourceId,

        target: targetId,

        anchors: ["Bottom", "Top"],

        connector: [

            "Flowchart",

            {

                cornerRadius: 10,

                stub: 30

            }

        ],

        paintStyle: {

            stroke: "#3b82f6",

            strokeWidth: 3

        },

        hoverPaintStyle: {

            stroke: "#ef4444",

            strokeWidth: 4

        },

        endpoint: "Blank"

    });

    // --------------------------------------
    // Store Connection Data
    // --------------------------------------

    jsConnection.data = {

        id: connection.id,

        sourceName: connection.sourceComponent.name,

        targetName: connection.targetComponent.name

    };

    // --------------------------------------
    // Delete Connection
    // --------------------------------------

    jsConnection.bind("click", async function () {

        const result = await Swal.fire({

            icon: "warning",

            title: "Delete Connection?",

            html: `
                <b>${jsConnection.data.sourceName}</b>
                <br>
                <i class="fa-solid fa-arrow-down"></i>
                <br>
                <b>${jsConnection.data.targetName}</b>
                <br><br>
                This connection will be deleted.
            `,

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            const response =
                await fetch(`/connections/${jsConnection.data.id}`, {

                    method: "DELETE"

                });

            if (!response.ok) {

                throw new Error();

            }

            jsPlumb.deleteConnection(jsConnection);

            Swal.fire({

                icon: "success",

                title: "Connection Deleted",

                timer: 1500,

                showConfirmButton: false

            });

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Unable to delete connection."

            });

        }

    });

}