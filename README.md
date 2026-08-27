# My Systems

> A collection of self-hosted, configurable systems for owning more of your infrastructure.

**My Systems** is a family of practical software and infrastructure projects designed to let individuals build, operate and integrate their own services - from a repurposed laptop or desktop to a dedicated home server.

The goal is not to eliminate cloud services. It is to build useful, configurable alternatives where ownership, control, privacy, learning or resilience provide a meaningful advantage.

## Systems

| System | Purpose | Status |
| --- | --- | --- |
| 🧭 **MyDNS** | Self-hosted DNS resolver/server, local zones, upstream resolution and filtering | **Building** |
| ☁️ **MyDrive** | Personal cloud storage, synchronization, sharing and remote access | Planned |
| 🗄️ **MyBackup** | Backup, snapshots, retention and recovery | Planned |
| 🔐 **MyVault** | Passwords, API keys, secrets and credentials | Planned |
| 🪪 **MyAuth** | Central identity and authentication | Planned |
| 🌐 **MyProxy** | Reverse proxy, routing, TLS and controlled external access | Planned |
| 📊 **MyMonitor** | Monitoring, metrics, logs, health checks and alerts | Planned |
| 🏠 **MyHome** | Personal infrastructure dashboard and automation | Idea |
| 🔔 **MyNotify** | Central notification service | Idea |
| 📦 **MyRegistry** | Self-hosted container/package/artifact registry | Idea |
| ✉️ **MyMail** | Self-hosted email infrastructure | Idea |
| ⚙️ **MyCI** | Self-hosted CI/CD infrastructure | Idea |

## Documentation

The documentation site contains the ecosystem overview, individual system documentation, architecture and design principles.

- [My Systems documentation](docs/index.md)
- [Ecosystem architecture](docs/architecture/ecosystem.md)
- [Brand profile](docs/brand/brand-profile.md)

## Principles

- **Own what matters** - self-host where control provides real value.
- **Open and portable** - prefer open standards and interoperable interfaces.
- **Independent systems** - every My System should remain useful on its own.
- **Composable infrastructure** - systems should integrate cleanly without becoming tightly coupled.
- **Security by design** - identity, secrets, recovery and operational security are first-class concerns.
- **Practical over ideological** - use hosted services when they are genuinely better.
- **Document everything needed to operate it** - reproducibility matters as much as implementation.

## Project Structure

```text
My-Systems/
├── docs/
│   ├── systems/
│   ├── architecture/
│   └── brand/
├── assets/
└── .github/
    └── workflows/
```

## Status

My Systems is an evolving project family. **MyDNS** is currently the first active implementation.

## License

See [LICENSE](LICENSE).
