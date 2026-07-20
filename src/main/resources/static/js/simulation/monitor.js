/*
==========================================================
Phase 11 : Real-Time Monitoring Engine
monitor.js
==========================================================
*/

(() => {

    const metrics = {

        incomingRequests: 8921,
        latency: 19,
        responseTime: 35,
        cpu: 43,
        memory: 4.6,
        successRate: 99.98,

        completedRequests: 0,
        failedRequests: 0

    };

    const elements = {

        incomingRequests: document.getElementById("incomingRequests"),
        latency: document.getElementById("statusLatency"),
        responseTime: document.getElementById("responseTime"),
        cpu: document.getElementById("statusCpu"),
        memory: document.getElementById("statusMemory"),
        successRate: document.getElementById("successRate")

    };

    let monitorInterval = null;

    function random(min, max) {

        return Math.random() * (max - min) + min;

    }

    function clamp(value, min, max) {

        return Math.max(min, Math.min(max, value));

    }

    function updateMetrics() {

        const stats = window.requestFlow?.statistics();

        if (stats) {

            metrics.incomingRequests = Math.max(
    metrics.completedRequests +
    metrics.failedRequests,
    metrics.incomingRequests
);

        }

        metrics.incomingRequests += Math.floor(random(-120, 180));
        metrics.incomingRequests = Math.max(500, metrics.incomingRequests);

        metrics.cpu += random(-2.5, 3.5);
        metrics.cpu = clamp(metrics.cpu, 8, 98);

        metrics.memory += random(-0.08, 0.12);
        metrics.memory = clamp(metrics.memory, 2.0, 16.0);

        metrics.latency += random(-2, 3);
        metrics.latency = clamp(metrics.latency, 8, 250);

        metrics.responseTime = metrics.latency + random(10, 20);

        const total =
            metrics.completedRequests +
            metrics.failedRequests;

        if (total > 0) {

            metrics.successRate =
                (metrics.completedRequests / total) * 100;

        } else {

            metrics.successRate = 99.98;

        }

        render();

    }

    function render() {

        if (elements.incomingRequests)
            elements.incomingRequests.textContent =
                `${Math.round(metrics.incomingRequests)} req/min`;

        if (elements.latency)
            elements.latency.textContent =
                `${Math.round(metrics.latency)} ms`;

        if (elements.responseTime)
            elements.responseTime.textContent =
                `${Math.round(metrics.responseTime)} ms`;

        if (elements.cpu)
            elements.cpu.textContent =
                `${Math.round(metrics.cpu)}%`;

        if (elements.memory)
            elements.memory.textContent =
                `${metrics.memory.toFixed(1)} GB`;

        if (elements.successRate)
            elements.successRate.textContent =
                `${metrics.successRate.toFixed(2)}%`;

        if (elements.successRate) {

            elements.successRate.classList.remove(
                "success",
                "warning",
                "danger"
            );

            if (metrics.successRate >= 99) {

                elements.successRate.classList.add("success");

            } else if (metrics.successRate >= 95) {

                elements.successRate.classList.add("warning");

            } else {

                elements.successRate.classList.add("danger");

            }

        }

    }

    function start() {

        if (monitorInterval) return;

        render();

        monitorInterval = setInterval(updateMetrics, 1000);

    }

    function stop() {

        clearInterval(monitorInterval);

        monitorInterval = null;

    }

    function reset() {

        stop();

        metrics.incomingRequests = 8921;
        metrics.latency = 19;
        metrics.responseTime = 35;
        metrics.cpu = 43;
        metrics.memory = 4.6;
        metrics.successRate = 99.98;
        metrics.completedRequests = 0;
        metrics.failedRequests = 0;

        render();

    }

    window.simulationMonitor = {

    start,
    stop,
    reset,
    metrics,

    recordRequest() {

        metrics.incomingRequests++;

    },

    recordSuccess() {

        metrics.completedRequests++;

    },

    recordFailure() {

        metrics.failedRequests++;

    },

    scaleUp() {

        metrics.cpu = clamp(metrics.cpu - 8, 8, 98);
        metrics.memory = clamp(metrics.memory + 0.3, 2, 16);

    },

    scaleDown() {

        metrics.cpu = clamp(metrics.cpu + 5, 8, 98);
        metrics.memory = clamp(metrics.memory - 0.2, 2, 16);

    }

};

    document.addEventListener("DOMContentLoaded", start);

})();