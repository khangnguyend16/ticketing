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

## 🛠️ Tech Stack

- **Backend:** Node.js, Express, TypeScript  
- **Database:** MongoDB  
- **Messaging/Event Bus:** NATS Streaming  
- **Queues:** Redis + Bull  
- **Testing:** Jest, Supertest  
- **DevOps:** Docker, Kubernetes, Skaffold, Ingress-NGINX  
- **CI/CD:** GitHub Actions  
- **Payments:** Stripe API  
- **Cloud Hosting:** DigitalOcean Kubernetes Cluster  
- **Library:** Shared npm package (`common`)  

---

## ⚡ Run locally with Skaffold

```bash
skaffold dev
