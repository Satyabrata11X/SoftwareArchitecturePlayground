// ==========================================
// Connections Module
// ==========================================

async function loadConnections(architectureId) {

    // Prevent connection-builder from firing
    loadingConnections = true;

    try {

        const response =
            await fetch(`/connections/architecture/${architectureId}`);

        if (!response.ok) {

            throw new Error("Unable to load connections.");

        }

        const connections =
            await response.json();

        console.log("Connections:", connections);

        // ONLY return the connections.
        // Do NOT draw them here.

        return connections;

    }

    catch (error) {

        console.error(error);

        return [];

    }

    finally {

        loadingConnections = false;

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

    // Ensure both nodes exist

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

        endpoint: "Blank"

    });

    // Mark as loaded from database
    jsConnection.data = {

        loaded: true

    };

}