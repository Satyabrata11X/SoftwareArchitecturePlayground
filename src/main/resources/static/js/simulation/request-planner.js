// ==========================================
// Request Planner
// ==========================================

console.log("Request Planner Loaded");

// ==========================================
// Build Request Plan
// ==========================================

function buildRequestPlan(graph, requestType) {

    switch (requestType) {

        case "ORDER":

            return [

                "CLIENT",

                "LOAD_BALANCER",

                "API_GATEWAY",

                "SERVICE",

                "CACHE",

                "DATABASE"

            ];

        case "PAYMENT":

            return [

                "CLIENT",

                "LOAD_BALANCER",

                "API_GATEWAY",

                "SERVICE",

                "DATABASE"

            ];

        case "SEARCH":

            return [

                "CLIENT",

                "LOAD_BALANCER",

                "API_GATEWAY",

                "CACHE"

            ];

        default:

            return [];

    }

}

// ==========================================
// Request Planner
// ==========================================

console.log("Request Planner Loaded");

// ==========================================
// Request Types
// ==========================================

const RequestType = {

    ORDER: "ORDER",

    PAYMENT: "PAYMENT",

    SEARCH: "SEARCH",

    LOGIN: "LOGIN"

};

// ==========================================
// Build Request Plan
// ==========================================

function buildRequestPlan(graph, requestType) {

    switch (requestType) {

        case RequestType.ORDER:

            return buildOrderRequest(graph);

        case RequestType.PAYMENT:

            return buildPaymentRequest(graph);

        case RequestType.SEARCH:

            return buildSearchRequest(graph);

        case RequestType.LOGIN:

            return buildLoginRequest(graph);

        default:

            console.warn("Unknown Request Type");

            return [];

    }

}

// ==========================================
// Order Request
// ==========================================

function buildOrderRequest(graph) {

    return findPathByTypes(

        graph,

        [

            "CLIENT",

            "LOAD_BALANCER",

            "API_GATEWAY",

            "SERVICE",

            "CACHE",

            "DATABASE"

        ]

    );

}

// ==========================================
// Payment Request
// ==========================================

function buildPaymentRequest(graph) {

    return findPathByTypes(

        graph,

        [

            "CLIENT",

            "LOAD_BALANCER",

            "API_GATEWAY",

            "SERVICE",

            "DATABASE"

        ]

    );

}

// ==========================================
// Search Request
// ==========================================

function buildSearchRequest(graph) {

    return findPathByTypes(

        graph,

        [

            "CLIENT",

            "LOAD_BALANCER",

            "API_GATEWAY",

            "CACHE"

        ]

    );

}

// ==========================================
// Login Request
// ==========================================

function buildLoginRequest(graph) {

    return findPathByTypes(

        graph,

        [

            "CLIENT",

            "LOAD_BALANCER",

            "API_GATEWAY",

            "SERVICE",

            "DATABASE"

        ]

    );

}

// ==========================================
// Find Components By Type
// ==========================================

function findPathByTypes(graph, types) {

    const route = [];

    types.forEach(type => {

        const node = Object.values(graph).find(

            node => node.component.type === type

        );

        if (node) {

            route.push({

                componentId: node.component.id,

                componentName: node.component.name,

                componentType: node.component.type

            });

        }

    });

    console.table(route);

    return route;

}