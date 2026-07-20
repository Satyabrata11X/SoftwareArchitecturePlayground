/* =====================================================
   ARCHITECTURE STUDIO
   simulation.js
   Core Simulation Engine
===================================================== */

(() => {

    "use strict";

    class SimulationEngine {

        constructor() {

            this.running = false;
            this.interval = null;

            this.config = {

                tickRate: 1000,
                minCpu: 15,
                maxCpu: 95,
                minMemory: 25,
                maxMemory: 90,
                minLatency: 8,
                maxLatency: 80

            };

            this.state = {

                tick: 0,

                users: 1500,

                requestsPerSecond: 4200,

                cpu: 24,

                memory: 42,

                latency: 18,

                responseTime: 26,

                throughput: 4100,

                health: 100,

                autoScaling: false,

                failureMode: false,

                services: [

                    {
                        id: 1,
                        name: "API Gateway",
                        status: "healthy",
                        load: 22,
                        instances: 1
                    },

                    {
                        id: 2,
                        name: "Authentication",
                        status: "healthy",
                        load: 28,
                        instances: 1
                    },

                    {
                        id: 3,
                        name: "User Service",
                        status: "healthy",
                        load: 34,
                        instances: 1
                    },

                    {
                        id: 4,
                        name: "Database",
                        status: "healthy",
                        load: 30,
                        instances: 1
                    }

                ]

            };

            this.listeners = [];

        }

        /* ==========================
           Utility
        ========================== */

        random(min, max) {

            return Math.random() * (max - min) + min;

        }

        randomInt(min, max) {

            return Math.floor(this.random(min, max + 1));

        }

        clamp(value, min, max) {

            return Math.max(min, Math.min(max, value));

        }

        /* ==========================
           Update Metrics
        ========================== */

        updateMetrics() {

            this.state.cpu += this.random(-2.5, 2.5);

            this.state.memory += this.random(-1.8, 1.8);

            this.state.latency += this.random(-1.5, 1.5);

            this.state.responseTime += this.random(-2, 2);

            this.state.requestsPerSecond += this.randomInt(-150, 150);

            this.state.users += this.randomInt(-15, 25);

            this.state.throughput =
                this.state.requestsPerSecond -
                this.randomInt(20, 120);

            this.state.cpu = this.clamp(
                this.state.cpu,
                this.config.minCpu,
                this.config.maxCpu
            );

            this.state.memory = this.clamp(
                this.state.memory,
                this.config.minMemory,
                this.config.maxMemory
            );

            this.state.latency = this.clamp(
                this.state.latency,
                this.config.minLatency,
                this.config.maxLatency
            );

            this.state.responseTime = this.clamp(
                this.state.responseTime,
                18,
                90
            );

        }

        /* ==========================
           Service Load
        ========================== */

        updateServices() {

            this.state.services.forEach(service => {

                service.load += this.random(-4, 4);

                service.load = this.clamp(
                    service.load,
                    10,
                    100
                );

                if (service.status === "failed") {

                    return;

                }

                if (service.load < 60) {

                    service.status = "healthy";

                }
                else if (service.load < 80) {

                    service.status = "busy";

                }
                else {

                    service.status = "critical";

                }

            });

        }

        /* ==========================
           Auto Scaling
        ========================== */

        updateScaling() {

            const overloaded = this.state.services.filter(service => {

                return service.load > 80;

            });

            this.state.autoScaling =
                overloaded.length > 0;

        }

        /* ==========================
           Failure Simulation
        ========================== */

        updateFailures() {

            if (Math.random() < 0.01) {

                const index = this.randomInt(
                    0,
                    this.state.services.length - 1
                );

                this.state.services[index].status = "failed";

                this.state.failureMode = true;

            }

            if (
                this.state.failureMode &&
                Math.random() < 0.18
            ) {

                this.state.failureMode = false;

                this.state.services.forEach(service => {

                    if (service.status === "failed") {

                        service.status = "healthy";

                        service.load = 20;

                    }

                });

            }

        }

        /* ==========================
           Health
        ========================== */

        updateHealth() {

            const failed =
                this.state.services.filter(s =>
                    s.status === "failed"
                ).length;

            this.state.health =
                Math.max(70, 100 - (failed * 10));

        }

        /* ==========================
           Tick
        ========================== */

        tick() {

            this.state.tick++;

            this.updateMetrics();

            this.updateServices();

            this.updateScaling();

            this.updateFailures();

            this.updateHealth();

            this.emit();

        }

        /* ==========================
           Events
        ========================== */

        subscribe(callback) {

            this.listeners.push(callback);

        }

        emit() {

            this.listeners.forEach(listener => {

                listener(this.state);

            });

        }

        /* ==========================
           Controls
        ========================== */

        start() {

            if (this.running) return;

            this.running = true;

            this.interval = setInterval(() => {

                this.tick();

            }, this.config.tickRate);

            console.log("Simulation Started");

        }

        stop() {

            this.running = false;

            clearInterval(this.interval);

            console.log("Simulation Stopped");

        }

        reset() {

            this.stop();

            this.state.tick = 0;

            this.start();

        }

    }

    window.simulationEngine =
        new SimulationEngine();

})();