// ==========================================
// Drag Module
// ==========================================

function enableDragging(node) {

    // Make node draggable
    jsPlumb.draggable(node, {

        containment: "parent",

        drag: function () {

            jsPlumb.repaintEverything();

        }

    });

    // Target Endpoint (Top)

    jsPlumb.addEndpoint(node,

        {
            anchor: "Top"
        },

        {

            isTarget: true,

            maxConnections: -1,

            endpoint: "Dot",

            paintStyle: {

                fill: "#3b82f6",

                radius: 5

            }

        }

    );

    // Source Endpoint (Bottom)

    jsPlumb.addEndpoint(node,

        {
            anchor: "Bottom"
        },

        {

            isSource: true,

            maxConnections: -1,

            endpoint: "Dot",

            paintStyle: {

                fill: "#22c55e",

                radius: 5

            },

            connector: [

                "Flowchart",

                {

                    cornerRadius: 10

                }

            ]

        }

    );

}