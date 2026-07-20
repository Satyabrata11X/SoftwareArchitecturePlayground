/* =====================================================
   Architecture Studio
   metrics.js
   Live Metrics Dashboard
===================================================== */

(() => {

    "use strict";

    /* ==========================================
       Elements
    ========================================== */

    const cpuValue = document.getElementById("cpuValue");
    const memoryValue = document.getElementById("memoryValue");
    const latencyValue = document.getElementById("latencyValue");
    const requestValue = document.getElementById("requestValue");
    const healthValue = document.getElementById("healthValue");
    const usersValue = document.getElementById("usersValue");

    const cpuProgress = document.getElementById("cpuProgress");
    const memoryProgress = document.getElementById("memoryProgress");
    const latencyProgress = document.getElementById("latencyProgress");
    const requestProgress = document.getElementById("requestProgress");
    const healthProgress = document.getElementById("healthProgress");
    const usersProgress = document.getElementById("usersProgress");

    /* ==========================================
       Helpers
    ========================================== */

    function formatUsers(value) {
        return value.toLocaleString();
    }

    function formatRequests(value) {

        if (value >= 1000) {
            return (value / 1000).toFixed(1) + "K";
        }

        return value;

    }

    function setProgress(bar, value) {

        bar.style.width = value + "%";

    }

    function setProgressColor(bar, value) {

        if (value < 50) {

            bar.style.background = "#22c55e";

        }
        else if (value < 75) {

            bar.style.background = "#f59e0b";

        }
        else {

            bar.style.background = "#ef4444";

        }

    }

    function animateCard(element) {

        const card = element.closest(".metric-card");

        card.classList.add("metric-active");

        setTimeout(() => {

            card.classList.remove("metric-active");

        }, 350);

    }

    /* ==========================================
       Update Dashboard
    ========================================== */

    function updateMetrics(state) {

        /* CPU */

        cpuValue.textContent =
            state.cpu.toFixed(0) + "%";

        setProgress(cpuProgress, state.cpu);

        setProgressColor(cpuProgress, state.cpu);

        animateCard(cpuValue);

        /* Memory */

        const memoryGB =
            (state.memory / 100 * 8).toFixed(1);

        memoryValue.textContent =
            memoryGB + " GB";

        setProgress(memoryProgress, state.memory);

        setProgressColor(memoryProgress, state.memory);

        animateCard(memoryValue);

        /* Latency */

        latencyValue.textContent =
            state.latency.toFixed(0) + " ms";

        setProgress(
            latencyProgress,
            Math.min(state.latency, 100)
        );

        setProgressColor(
            latencyProgress,
            state.latency
        );

        animateCard(latencyValue);

        /* Requests */

        requestValue.textContent =
            formatRequests(
                state.requestsPerSecond
            );

        setProgress(
            requestProgress,
            Math.min(
                state.requestsPerSecond / 80,
                100
            )
        );

        requestProgress.style.background =
            "#3b82f6";

        animateCard(requestValue);

        /* Health */

        healthValue.textContent =
            state.health.toFixed(1) + "%";

        setProgress(
            healthProgress,
            state.health
        );

        healthProgress.style.background =
            "#22c55e";

        animateCard(healthValue);

        /* Users */

        usersValue.textContent =
            formatUsers(state.users);

        setProgress(
            usersProgress,
            Math.min(
                state.users / 200,
                100
            )
        );

        usersProgress.style.background =
            "#8b5cf6";

        animateCard(usersValue);

    }

    /* ==========================================
       Subscribe
    ========================================== */

    simulationEngine.subscribe((state) => {

        updateMetrics(state);

    });

})();