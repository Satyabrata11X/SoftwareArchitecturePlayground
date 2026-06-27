// ==========================================
// Connections Module
// ==========================================

async function loadConnections(architectureId) {

    try {

        const response =
            await fetch(`/connections/architecture/${architectureId}`);

        if (!response.ok) {

            throw new Error("Unable to load connections.");

        }

        const connections = await response.json();

        console.log("Connections :", connections);

        connections.forEach(connection => {

            drawConnection(connection);

        });

    }

    catch (error) {

        console.error(error);

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

    if (
        document.getElementById(sourceId) &&
        document.getElementById(targetId)
    ) {

        jsPlumb.connect({

            source: sourceId,

            target: targetId,

            anchors: ["Bottom", "Top"],

            connector: [

                "Flowchart",

                {

                    cornerRadius: 10

                }

            ],

            paintStyle: {

                stroke: "#3b82f6",

                strokeWidth: 3

            },

            endpoint: "Blank"

        });

    }

}