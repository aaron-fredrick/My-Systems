# My Systems

> Your systems. Your control.

**My Systems** is a family of open-source systems for people who want to own, operate and understand more of their digital infrastructure.

It is not a single application. It is an ecosystem of independent systems designed to work on their own and connect when you choose.

The idea is simple: **use the cloud when it makes sense, self-host when you want control, and keep the freedom to change either way.**

---

## The ecosystem

My Systems is being built as a collection of focused services rather than one large platform.

### 🧭 MyDNS — Building

A self-hosted DNS resolver and server for local zones, upstream resolution, custom records and network-level control.

**Repository:** [MyDNS](https://github.com/aaron-fredrick/MyDNS)

---

### ☁️ MyDrive — Planned

Personal storage and file infrastructure for synchronization, sharing, remote access and media handling on hardware you control.

**Status:** Planned

---

### 🗄️ MyBackup — Planned

Backup infrastructure for snapshots, retention, recovery and protecting the data managed by the other My Systems.

**Status:** Planned

---

### 🔐 MyVault — Planned

A personal secrets and credential system for passwords, API keys, tokens and other sensitive information.

**Status:** Planned

---

### 🪪 MyAuth — Planned

Central identity and authentication infrastructure for the My Systems ecosystem and other services.

**Status:** Planned

---

### 🌐 MyProxy — Planned

Reverse proxy and access infrastructure for routing services, TLS termination and controlled external access.

**Status:** Planned

---

### 📊 MyMonitor — Planned

Monitoring and observability infrastructure covering metrics, logs, health checks and alerts across the ecosystem.

**Status:** Planned

---

### 🏠 MyHome — Idea

A personal infrastructure dashboard and automation layer for operating the wider My Systems environment.

**Status:** Idea

---

### 🔔 MyNotify — Idea

A central notification service for delivering events and alerts from My Systems and other connected services.

**Status:** Idea

---

### 📦 MyRegistry — Idea

Self-hosted infrastructure for container images, packages and other development artifacts.

**Status:** Idea

---

### ✉️ MyMail — Idea

Self-hosted email infrastructure focused on ownership and operational control.

**Status:** Idea

---

### ⚙️ MyCI — Idea

Self-hosted continuous integration and delivery infrastructure for building and deploying projects.

**Status:** Idea

---

## How the systems fit together

The systems are intentionally **independent by default**.

You might run only MyDNS. You might add MyDrive and MyBackup. Later, MyAuth, MyProxy and MyMonitor can provide shared infrastructure around them.

```text
                         MyAuth
                           │
                           │ identity
                           ▼
 MyDNS ─────────────── My Systems ─────────────── MyDrive
   │                         │                       │
   │ network                 │ operations            │ data
   │                         │                       │
   ├──────────── MyProxy ────┼──── MyMonitor ───────┤
   │                         │                       │
   └──────────────────── MyBackup ──────────────────┘
                           │
                           ▼
                         MyVault
```

The diagram represents the intended ecosystem direction, not the current implementation state. Individual systems remain useful without requiring the rest of the ecosystem.

## Principles

### Ownership
Keep infrastructure understandable and controllable.

### Privacy
Keep sensitive data and services under your control where it provides meaningful value.

### Open source
Build systems that are inspectable, modifiable and transparent.

### Independence
Every system should remain useful on its own.

### Composability
Systems should connect through clear interfaces and established standards rather than becoming tightly coupled.

### Practicality
Self-hosting is an option, not an ideology. Use hosted services when they make more sense.

### Operability
Documentation, maintenance, observability and recovery are part of the system - not afterthoughts.

## Documentation

The repository contains the planning, architecture and design documentation for the ecosystem.

- [Documentation](docs/index.md)
- [Ecosystem architecture](docs/architecture/ecosystem.md)
- [Brand profile](docs/brand/brand-profile.md)
- [Motion & visual design plan](docs/MOTION_SYSTEM_PLAN.md)

For the first active system, start with **[MyDNS](https://github.com/aaron-fredrick/MyDNS)**.

## Project structure

```text
My-Systems/
├── docs/
│   ├── systems/
│   ├── architecture/
│   └── brand/
├── site/
├── assets/
└── .github/
    └── workflows/
```

## Status

My Systems is an evolving ecosystem.

**Currently building:** MyDNS

**Next planned systems:** MyDrive, MyBackup, MyVault, MyAuth, MyProxy and MyMonitor

The remaining systems are ideas that will be evaluated as the ecosystem develops.

## License

See [LICENSE](LICENSE).
