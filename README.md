# 🎟️ Ticketing Microservices System

A **microservices-based ticketing platform** built with **Node.js, TypeScript, Docker, and Kubernetes**.  

---

## ✨ Features

- 🔑 **Authentication Service** – signup, signin, JWT auth  
- 🎫 **Tickets Service** – create, update, and manage tickets  
- 📦 **Orders Service** – reserve tickets and manage orders  
- 💳 **Payments Service** – secure payments via Stripe API  
- ⏰ **Expiration Service** – order expiration using Redis & Bull queues  
- 📦 **Common Library** – shared code published to **npm**  

---

## 🏗️ Architecture

- **Event-driven communication** via **NATS Streaming**  
- **Optimistic concurrency control** with MongoDB & Mongoose  
- **Asynchronous workflows** with Redis & Bull  
- **Scalable deployment** with Docker, Kubernetes, Skaffold, and Ingress-NGINX  

