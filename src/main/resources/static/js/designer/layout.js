// ==========================================
// Professional Layout Engine
// ==========================================

function getNodePosition(component, components) {

    // Canvas Settings
    const canvasWidth = 1500;

    const centerX = canvasWidth / 2;

    // Group Components
    const services =
        components.filter(c => c.type === "SERVICE");

    const serviceIndex =
        services.findIndex(c => c.id === component.id);

    const totalServices =
        services.length;

    // Service Layout
    const spacing = 300;

    const startX =
        centerX - ((totalServices - 1) * spacing) / 2;

    switch (component.type) {

        case "CLIENT":

            return {

                left: centerX - 120,

                top: 40

            };

        case "LOAD_BALANCER":

            return {

                left: centerX - 120,

                top: 170

            };

        case "API_GATEWAY":

            return {

                left: centerX - 120,

                top: 310

            };

        case "SERVICE":

            return {

                left: startX + (serviceIndex * spacing),

                top: 520

            };

        case "CACHE":

            return {

                left: centerX - 500,

                top: 760

            };

        case "QUEUE":

            return {

                left: centerX - 120,

                top: 760

            };

        case "DATABASE":

            return {

                left: centerX + 260,

                top: 760

            };

        default:

            return {

                left: 100,

                top: 100

            };

    }

}