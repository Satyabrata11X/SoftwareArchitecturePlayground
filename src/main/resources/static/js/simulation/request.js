/* ==========================================================
   Architecture Studio
   Request Flow Engine
   Phase 1
========================================================== */

(() => {

    "use strict";

    /* ==========================================
       DOM Elements
    ========================================== */

    const container = document.getElementById("requestContainer");

    const nodes = {
    client: document.getElementById("clientNode"),
    gateway: document.getElementById("gatewayNode"),
    database: document.getElementById("databaseNode")
};

   if (
    !container ||
    !nodes.client ||
    !nodes.gateway ||
    !nodes.database
) {

        console.error("Request Engine: Required DOM elements not found.");

        return;

    }

    /* ==========================================
       Configuration
    ========================================== */

    const config = {

        packetSize: 16,

        animationDuration: 350,

        packetLimit: 120,

        defaultRate: 8

    };

    /* ==========================================
       Runtime State
    ========================================== */

    const state = {

        running: false,

        requestRate: config.defaultRate,

        activePackets: new Set(),

        timers: [],

        statistics: {

            created: 0,

            completed: 0

        }

    };

    /* ==========================================
       Helper Functions
    ========================================== */

    function wait(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    }

    function nodeCenter(element) {

        const rect = element.getBoundingClientRect();

        const parent = container.parentElement.getBoundingClientRect();

        return {

            x: rect.left - parent.left + rect.width / 2,

            y: rect.top - parent.top + rect.height / 2

        };

    }

    function randomColor() {

        const colors = [

            "#3b82f6",

            "#06b6d4",

            "#22c55e",

            "#f59e0b",

            "#a855f7"

        ];

        return colors[Math.floor(Math.random() * colors.length)];

    }

    function pulseNode(node) {

        node.classList.add("packet-active");

        setTimeout(() => {

            node.classList.remove("packet-active");

        }, 180);

    }

    console.log("Request Engine Initialized");

        /* ==========================================
       Packet Factory
    ========================================== */

    let packetCounter = 0;

    function createPacket() {

        if (state.activePackets.size >= config.packetLimit) {
            return null;
        }

        const packet = document.createElement("div");

        packet.className = "live-request";

        packet.dataset.id = ++packetCounter;

        packet.style.position = "absolute";

        packet.style.width = config.packetSize + "px";
        packet.style.height = config.packetSize + "px";

        packet.style.borderRadius = "50%";

        packet.style.background = randomColor();

        packet.style.boxShadow = `
            0 0 6px currentColor,
            0 0 12px currentColor,
            0 0 18px currentColor
        `;

        packet.style.transition =
            `left ${config.animationDuration}ms linear,
             top ${config.animationDuration}ms linear`;

        packet.style.pointerEvents = "none";

        packet.style.zIndex = "999";

        const start = nodeCenter(nodes.client);

        packet.style.left =
            (start.x - config.packetSize / 2) + "px";

        packet.style.top =
            (start.y - config.packetSize / 2) + "px";

        container.appendChild(packet);

        state.activePackets.add(packet);

        state.statistics.created++;

        return packet;

    }

    /* ==========================================
       Packet Movement
    ========================================== */

    function movePacket(packet, destination) {

        if (!packet) return;

        packet.style.left =
            (destination.x - config.packetSize / 2) + "px";

        packet.style.top =
            (destination.y - config.packetSize / 2) + "px";

    }

    /* ==========================================
       Remove Packet
    ========================================== */

    function destroyPacket(packet) {

        if (!packet) return;

        if (packet.parentNode) {
            packet.parentNode.removeChild(packet);
        }

        state.activePackets.delete(packet);

        state.statistics.completed++;

    }

    /* ==========================================
       Utility
    ========================================== */

    function clearPackets() {

        state.activePackets.forEach(packet => {

            if (packet.parentNode) {
                packet.parentNode.removeChild(packet);
            }

        });

        state.activePackets.clear();

    }

    function getPacketCount() {

        return state.activePackets.size;

    }

    console.log("Packet Factory Ready");

        /* ==========================================
       Animation Engine
    ========================================== */

    async function animatePacket(packet) {

        if (!packet) return;

        const client = nodeCenter(nodes.client);
        const gateway = nodeCenter(nodes.gateway);
        const service = nodeCenter(nodes.service);
        const database = nodeCenter(nodes.database);

        /* ---------- Client ---------- */

        movePacket(packet, client);

        pulseNode(nodes.client);

        await wait(80);

        /* ---------- Gateway ---------- */

        movePacket(packet, gateway);

        pulseNode(nodes.gateway);

        await wait(config.animationDuration);

        /* ---------- Service ---------- */

        movePacket(packet, service);

        pulseNode(nodes.service);

        await wait(config.animationDuration);

        /* ---------- Database ---------- */

        movePacket(packet, database);

        pulseNode(nodes.database);

        await wait(config.animationDuration);

        /* ---------- Response ---------- */

        packet.style.transform = "scale(0.2)";
        packet.style.opacity = "0";

        await wait(200);

        destroyPacket(packet);

    }

    /* ==========================================
       Send One Request
    ========================================== */

    let sendRequest = async function () {

        const packet = createPacket();

        if (!packet) return;

        await animatePacket(packet);

    }

    /* ==========================================
       Send Multiple Requests
    ========================================== */

    async function sendBurst(count = 5) {

        for (let i = 0; i < count; i++) {

            sendRequest();

            await wait(120);

        }

    }

    /* ==========================================
       Demo Mode
       (Temporary)
    ========================================== */

    function startDemo() {

        if (state.running) return;

        state.running = true;

        state.demoInterval = setInterval(() => {

            sendRequest();

        }, 800);

    }

    function stopDemo() {

        clearInterval(state.demoInterval);

        state.running = false;

        clearPackets();

    }

    console.log("Animation Engine Ready");

        /* ==========================================
       Traffic Controller
    ========================================== */

    let trafficTimer = null;

    /**
     * Calculate packet interval based on request rate.
     * Higher request rate = lower interval.
     */
    function calculateInterval() {

        const rate = Math.max(1, state.requestRate);

        return Math.max(40, 1000 / rate);

    }

    /**
     * Start Traffic
     */
    function startTraffic() {

        if (trafficTimer) {

            clearInterval(trafficTimer);

        }

        state.running = true;

        trafficTimer = setInterval(() => {

            if (state.activePackets.size >= config.packetLimit) {

                return;

            }

            sendRequest();

        }, calculateInterval());

        console.log(
            "Traffic Started :",
            state.requestRate,
            "req/sec"
        );

    }

    /**
     * Stop Traffic
     */
    function stopTraffic() {

        if (trafficTimer) {

            clearInterval(trafficTimer);

            trafficTimer = null;

        }

        state.running = false;

        console.log("Traffic Stopped");

    }

    /**
     * Update Traffic Rate
     */
    function setTrafficRate(rate) {

        state.requestRate = Math.max(1, rate);

        if (state.running) {

            startTraffic();

        }

    }

    /**
     * Simulate Traffic Spike
     */
    function trafficSpike(rate = 50, duration = 5000) {

        const previousRate = state.requestRate;

        console.log("Traffic Spike!");

        setTrafficRate(rate);

        setTimeout(() => {

            setTrafficRate(previousRate);

        }, duration);

    }

    /**
     * Simulate Low Traffic
     */
    function trafficIdle() {

        setTrafficRate(2);

    }

    /**
     * Simulate Normal Traffic
     */
    function trafficNormal() {

        setTrafficRate(config.defaultRate);

    }

    /**
     * Get Statistics
     */
    function getStatistics() {

        return {

            running: state.running,

            activePackets: state.activePackets.size,

            createdPackets: state.statistics.created,

            completedPackets: state.statistics.completed,

            requestRate: state.requestRate

        };

    }

    console.log("Traffic Controller Ready");

        /* ==========================================
       Simulation Engine Integration
    ========================================== */

    function updateTrafficFromSimulation(simulationState) {

        if (!simulationState) return;

        /*
            Expected simulation state:

            {
                users,
                cpu,
                memory,
                latency,
                requestsPerSecond,
                health
            }
        */

        // Requests/sec controls traffic speed
        if (simulationState.requestsPerSecond !== undefined) {

            const rate = Math.max(
                1,
                Math.round(simulationState.requestsPerSecond / 10)
            );

            setTrafficRate(rate);
        }

        // High CPU -> slow packets slightly
        if (simulationState.cpu > 90) {

            config.animationDuration = 650;

        } else if (simulationState.cpu > 70) {

            config.animationDuration = 500;

        } else {

            config.animationDuration = 350;

        }

        // Poor health reduces traffic
        if (simulationState.health < 70) {

            setTrafficRate(
                Math.max(
                    1,
                    Math.floor(state.requestRate * 0.5)
                )
            );

        }

    }

    /* ==========================================
       Subscribe to Simulation Engine
    ========================================== */

    if (
        window.simulationEngine &&
        typeof simulationEngine.subscribe === "function"
    ) {

        simulationEngine.subscribe((simulationState) => {

            updateTrafficFromSimulation(simulationState);

            if (!state.running) {

                startTraffic();

            }

        });

        console.log(
            "Request Engine connected to Simulation Engine"
        );

    } else {

        console.warn(
            "Simulation Engine not found."
        );

    }

    /* ==========================================
       Simulation Events
    ========================================== */

    document.addEventListener(
        "simulation:start",
        () => {

            startTraffic();

        }
    );

    document.addEventListener(
        "simulation:stop",
        () => {

            stopTraffic();

            clearPackets();

        }
    );

    document.addEventListener(
        "simulation:pause",
        () => {

            stopTraffic();

        }
    );

    document.addEventListener(
        "simulation:resume",
        () => {

            startTraffic();

        }
    );

    console.log("Simulation Integration Ready");

  /* ==========================================================
   Phase 6 : Smart Routing & Load Balancer
========================================================== */

const cacheNode = document.getElementById("cacheNode");

const servicePool = [

    {
        id: "auth",
        node: document.getElementById("authNode"),
        healthy: true,
        activeRequests: 0
    },

    {
        id: "user",
        node: document.getElementById("userNode"),
        healthy: true,
        activeRequests: 0
    },

    {
        id: "order",
        node: document.getElementById("orderNode"),
        healthy: true,
        activeRequests: 0
    }

].filter(service => service.node);

const routing = {

    services: servicePool,

    getHealthyServices() {

        return this.services.filter(service => service.healthy);

    },

    getLeastBusyService() {

        const healthy = this.getHealthyServices();

        if (!healthy.length) {

            return null;

        }

        healthy.sort((a, b) => {

            return a.activeRequests - b.activeRequests;

        });

        return healthy[0];

    }

};

function selectServiceNode() {

    const service = routing.getLeastBusyService();

    if (!service) {

        return null;

    }

    service.activeRequests++;

    return service;

}

function releaseService(service) {

    if (!service) return;

    service.activeRequests = Math.max(
        0,
        service.activeRequests - 1
    );

}

function setServiceHealth(serviceId, healthy) {

    const service = servicePool.find(
        s => s.id === serviceId
    );

    if (!service) return;

    service.healthy = healthy;

    service.node.classList.toggle(
        "failed-service",
        !healthy
    );

    service.node.classList.toggle(
        "healthy-service",
        healthy
    );

}

function getLoadBalancerStats() {

    return servicePool.map(service => ({

        id: service.id,

        healthy: service.healthy,

        activeRequests: service.activeRequests

    }));

}

console.log("Phase 6 Ready");

/* ==========================================================
   Phase 7 : Smart Packet Animation
========================================================== */

async function animateSmartPacket(packet) {

    if (!packet) return;

    const client = nodeCenter(nodes.client);
    const gateway = nodeCenter(nodes.gateway);

    const service = selectServiceNode();

    if (!service) {

        simulationLogs?.add(
            "failure",
            "No healthy service available"
        );

         simulationMonitor.recordFailure();

        destroyPacket(packet);
        return;

    }

    const serviceCenter = nodeCenter(service.node);

    const cache = cacheNode
        ? nodeCenter(cacheNode)
        : serviceCenter;

    const database = nodeCenter(nodes.database);

    // Client
    movePacket(packet, client);
    pulseNode(nodes.client);

    simulationLogs?.add(
        "request",
        "Client → API Gateway"
    );

    await wait(80);

    // Gateway
    movePacket(packet, gateway);
    pulseNode(nodes.gateway);

    simulationLogs?.add(
        "routing",
        `Gateway → ${service.id}`
    );

    await wait(config.animationDuration);

    // Service
    movePacket(packet, serviceCenter);
    pulseNode(service.node);

    simulationLogs?.add(
        "service",
        `${service.id} processing request`
    );

    await wait(config.animationDuration);

    // Cache
    if (cacheNode) {

        movePacket(packet, cache);
        pulseNode(cacheNode);

        simulationLogs?.add(
            "cache",
            `${service.id} → Redis Cache`
        );

        await wait(config.animationDuration);

    }

    // Database
    movePacket(packet, database);
    pulseNode(nodes.database);

    simulationLogs?.add(
        "database",
        "Redis Cache → PostgreSQL"
    );

    await wait(config.animationDuration);

    // Response
    simulationLogs?.add(
        "response",
        "Response returned to Client"
    );

    packet.style.opacity = "0";
    packet.style.transform = "scale(.2)";

    await wait(200);

    simulationMonitor.recordSuccess();


    releaseService(service);

    destroyPacket(packet);

}


async function sendSmartRequest() {

    const packet = createPacket();

    simulationMonitor.recordRequest();

    if (!packet) return;

     simulationMonitor.recordRequest();

    await animateSmartPacket(packet);

}

sendRequest = sendSmartRequest;

/* ==========================================================
   Public API
========================================================== */

window.requestFlow = {

    start() {

        startTraffic();

    },

    stop() {

        stopTraffic();

        clearPackets();

    },

    pause() {

        stopTraffic();

    },

    resume() {

        startTraffic();

    },

    send() {

        sendRequest();

    },

    clear() {

        clearPackets();

    },

    spike(rate = 40) {

        trafficSpike(rate);

    },

    normal() {

        trafficNormal();

    },

    idle() {

        trafficIdle();

    },

    setRate(rate) {

        setTrafficRate(rate);

    },

    failService(id) {

        setServiceHealth(id, false);

    },

    recoverService(id) {

        setServiceHealth(id, true);

    },

    failure(serviceId) {

    failureEngine.fail(serviceId);

},

recovery(serviceId) {

    failureEngine.recover(serviceId);

},

toggleFailure(serviceId) {

    failureEngine.toggle(serviceId);

},

randomFailure() {

    failureEngine.randomFailure();

},

randomRecovery() {

    failureEngine.randomRecovery();

},

recoverAll() {

    failureEngine.recoverAll();

},

failureStatus() {

    return failureEngine.getStatus();

},

    loadBalancer() {

        return getLoadBalancerStats();

    },

    statistics() {

        return getStatistics();

    },

    autoScaling() {

    return autoScaler.status();

},

resetScaling() {

    autoScaler.reset();

}

};

console.log("Phase 7 Ready");

/* ==========================================================
   Phase 8 : Failure Simulation Engine
========================================================== */

const failureEngine = {

    failures: new Set(),

    fail(serviceId) {

        const service = servicePool.find(
            s => s.id === serviceId
        );

        if (!service) return false;

        service.healthy = false;

        this.failures.add(serviceId);

        service.node.classList.add("failed-service");
        service.node.classList.remove("healthy-service");

        console.warn(serviceId + " service failed");

        return true;

    },

    recover(serviceId) {

        const service = servicePool.find(
            s => s.id === serviceId
        );

        if (!service) return false;

        service.healthy = true;

        this.failures.delete(serviceId);

        service.node.classList.remove("failed-service");
        service.node.classList.add("healthy-service");

        console.info(serviceId + " service recovered");

        return true;

    },

    toggle(serviceId) {

        if (this.failures.has(serviceId)) {

            this.recover(serviceId);

        } else {

            this.fail(serviceId);

        }

    },

    randomFailure() {

        const healthy = servicePool.filter(
            service => service.healthy
        );

        if (!healthy.length) return;

        const service =
            healthy[
                Math.floor(Math.random() * healthy.length)
            ];

        this.fail(service.id);

    },

    randomRecovery() {

        const failed = servicePool.filter(
            service => !service.healthy
        );

        if (!failed.length) return;

        const service =
            failed[
                Math.floor(Math.random() * failed.length)
            ];

        this.recover(service.id);

    },

    recoverAll() {

        servicePool.forEach(service => {

            this.recover(service.id);

        });

    },

    getStatus() {

        return servicePool.map(service => ({

            id: service.id,

            healthy: service.healthy,

            activeRequests: service.activeRequests

        }));

    }

};

console.log("Failure Engine Ready");

/* ==========================================================
   Phase 9 : Auto Scaling Engine
========================================================== */

const autoScaler = {

    minInstances: 1,

    maxInstances: 5,

    scaleUpThreshold: 8,

    scaleDownThreshold: 2,

    evaluate() {

        servicePool.forEach(service => {

            if (service.instances === undefined) {

                service.instances = 1;

            }

            /* -----------------------------
               Scale Up
            ----------------------------- */

            if (
                service.activeRequests >=
                this.scaleUpThreshold &&
                service.instances < this.maxInstances
            ) {

                service.instances++;

                console.log(
                    `${service.id} scaled to ${service.instances} instances`
                );

            }

            /* -----------------------------
               Scale Down
            ----------------------------- */

            else if (
                service.activeRequests <=
                this.scaleDownThreshold &&
                service.instances > this.minInstances
            ) {

                service.instances--;

                console.log(
                    `${service.id} scaled down to ${service.instances} instances`
                );

            }

        });

    },

    reset() {

        servicePool.forEach(service => {

            service.instances = 1;

        });

    },

    status() {

        return servicePool.map(service => ({

            id: service.id,

            instances: service.instances || 1,

            activeRequests: service.activeRequests,

            healthy: service.healthy

        }));

    }

};

console.log("Auto Scaling Engine Ready");

/* ==========================================================
   Auto Scaling Monitor
========================================================== */

setInterval(() => {

    autoScaler.evaluate();

}, 1500);

})();