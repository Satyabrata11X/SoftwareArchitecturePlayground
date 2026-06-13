🚀 Software Architecture Playground

A Spring Boot-based backend application that allows users to design software architectures, manage components and connections, and perform architecture simulations such as traffic analysis, failure impact analysis, and bottleneck detection.

📌 Project Overview

Software systems are made up of multiple components such as API Gateways, Services, Databases, Caches, and Queues.

This project provides a platform to:

Create software architectures
Add system components
Define relationships between components
Simulate traffic loads
Analyze failure impacts
Detect bottlenecks in the architecture

The goal is to learn and apply backend development, database design, and system design concepts through a real-world project.

🏗️ Features
1. Architecture Management

Create and manage software architectures.

Example:

Food Delivery System
E-Commerce Platform
Banking System
2. Component Management

Add components to an architecture.

Supported Component Types:

CLIENT
LOAD_BALANCER
API_GATEWAY
SERVICE
DATABASE
CACHE
QUEUE

Example:

Gateway
Order Service
Payment Service
PostgreSQL
Redis Cache
3. Connection Management

Define communication paths between components.

Example:

Gateway
   ↓
Order Service
   ↓
PostgreSQL
4. Traffic Simulation

Simulate user traffic and estimate component load.

Example:

Traffic = 10,000 Users

Gateway       → MEDIUM
Order Service → HIGH
PostgreSQL    → CRITICAL
5. Failure Simulation

Analyze the impact of component failures.

Example:

Gateway
   ↓
Order Service
   ↓
PostgreSQL

If PostgreSQL fails:

PostgreSQL → DOWN
Order Service → IMPACTED
Gateway → IMPACTED
6. Bottleneck Detection

Identify the most overloaded component in the system.

Example:

Traffic = 50,000 Users

Bottleneck:
PostgreSQL
🛠️ Tech Stack
Backend
Java 24
Spring Boot
Spring Data JPA
Hibernate
Database
PostgreSQL
Build Tool
Maven
Testing
Postman
Version Control
Git
GitHub
📂 Project Structure
src/main/java

├── architecture
│   ├── Architecture.java
│   ├── ArchitectureRepository.java
│   ├── ArchitectureService.java
│   └── ArchitectureController.java
│
├── component
│   ├── Component.java
│   ├── ComponentType.java
│   ├── ComponentRepository.java
│   ├── ComponentService.java
│   └── ComponentController.java
│
├── connection
│   ├── Connection.java
│   ├── ConnectionRepository.java
│   ├── ConnectionService.java
│   └── ConnectionController.java
│
├── simulation
│   ├── SimulationResult.java
│   ├── SimulationService.java
│   ├── SimulationController.java
│   ├── FailureSimulationResult.java
│   ├── FailureSimulationService.java
│   ├── FailureSimulationController.java
│   ├── BottleneckResult.java
│   ├── BottleneckService.java
│   └── BottleneckController.java
🗄️ Database Design
Architecture Table
architectures
Column	Type
id	BIGINT
name	VARCHAR
description	VARCHAR
Component Table
components
Column	Type
id	BIGINT
name	VARCHAR
type	VARCHAR
architecture_id	BIGINT
Connection Table
connections
Column	Type
id	BIGINT
source_component_id	BIGINT
target_component_id	BIGINT
🔗 Example Architecture
Food Delivery System

Gateway
   ↓
Order Service
   ↓
PostgreSQL
📡 REST API Endpoints
Architecture APIs
Create Architecture
POST /architectures
Get All Architectures
GET /architectures
Get Architecture By ID
GET /architectures/{id}
Delete Architecture
DELETE /architectures/{id}
Component APIs
Create Component
POST /components
Get All Components
GET /components
Get Component By ID
GET /components/{id}
Get Components By Architecture
GET /components/architecture/{architectureId}
Delete Component
DELETE /components/{id}
Connection APIs
Create Connection
POST /connections
Get All Connections
GET /connections
Get Connection By ID
GET /connections/{id}
Delete Connection
DELETE /connections/{id}
Simulation APIs
Traffic Simulation
GET /simulation/traffic?architectureId=1&users=10000
Failure Simulation
GET /failure?componentId=3
Bottleneck Detection
GET /bottleneck?architectureId=1&users=10000
🧪 Sample Output
Traffic Simulation
[
  {
    "componentName": "Gateway",
    "loadPercentage": 50.0,
    "status": "MEDIUM"
  },
  {
    "componentName": "Order Service",
    "loadPercentage": 80.0,
    "status": "HIGH"
  }
]
Failure Simulation
[
  {
    "componentName": "PostgreSQL",
    "status": "DOWN"
  },
  {
    "componentName": "Order Service",
    "status": "IMPACTED"
  },
  {
    "componentName": "Gateway",
    "status": "IMPACTED"
  }
]
Bottleneck Detection
{
  "componentName": "PostgreSQL",
  "loadPercentage": 100.0,
  "status": "CRITICAL"
}
🎯 Learning Outcomes

This project helped me gain practical experience with:

Spring Boot Development
REST API Design
PostgreSQL Database Design
JPA Relationships
Dependency Injection
Service Layer Architecture
System Design Concepts
Traffic Simulation
Failure Analysis
Bottleneck Detection
🚀 Future Enhancements
React Frontend
Interactive Architecture Diagram Builder
Drag-and-Drop Components
Swagger/OpenAPI Documentation
Authentication & Authorization
Docker Deployment
Microservices Support
Kafka Event Simulation
Advanced Failure Propagation
Real-Time Monitoring Dashboard

👨‍💻 Author

Satyabrata

B.Tech Computer Science Engineering Student

Passionate about Backend Development, System Design, and Software Engineering.

⭐ If you found this project interesting, feel free to star the repository and connect with me on LinkedIn.
