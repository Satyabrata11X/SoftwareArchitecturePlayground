// ==========================================
// Component Icons Module
// ==========================================

function getComponentIcon(type) {

    switch (type) {

        case "CLIENT":
            return "fa-solid fa-user";

        case "LOAD_BALANCER":
            return "fa-solid fa-scale-balanced";

        case "API_GATEWAY":
            return "fa-solid fa-globe";

        case "SERVICE":
            return "fa-solid fa-server";

        case "DATABASE":
            return "fa-solid fa-database";

        case "CACHE":
            return "fa-solid fa-bolt";

        case "QUEUE":
            return "fa-solid fa-list";

        default:
            return "fa-solid fa-cube";

    }

}