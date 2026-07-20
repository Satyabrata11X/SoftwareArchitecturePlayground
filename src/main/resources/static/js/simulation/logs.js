/*
==================================================
 Architecture Studio
 Phase 10 - Live Logging Engine
==================================================
*/

(() => {

    const MAX_LOGS = 200;

    const logs = [];

    function now() {

        return new Date().toLocaleTimeString();

    }

    function add(type, message) {

        const entry = {

            time: now(),
            type,
            message

        };

        logs.unshift(entry);

        if (logs.length > MAX_LOGS) {

            logs.pop();

        }

        render();

    }

    function render() {

        const container = document.getElementById("simulationLogs");

        if (!container) return;

        container.innerHTML = "";

        logs.forEach(log => {

            const row = document.createElement("div");

            row.className = "log-entry " + log.type;

            row.innerHTML = `

                <span class="log-time">${log.time}</span>

                <span class="log-type">${log.type.toUpperCase()}</span>

                <span class="log-message">${log.message}</span>

            `;

            container.appendChild(row);

        });

    }

    function clear() {

        logs.length = 0;

        render();

    }

    window.simulationLogs = {

        add,
        clear,

        all() {

            return [...logs];

        }

    };

})();