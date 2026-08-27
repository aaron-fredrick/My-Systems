# My Systems

> Open-source systems for self-hosting, self-management, privacy and ownership.

**My Systems** is a family of open-source, self-hosted and self-managed software and infrastructure systems for people who want greater control over their services, infrastructure and data.

The systems are designed to provide practical alternatives to relying entirely on third-party hosted services. They can run on infrastructure you control - from a repurposed laptop or desktop to a dedicated home server.

The goal is not to eliminate cloud services. It is to give people the option to own and operate the systems that matter to them, particularly where privacy, control, independence or resilience provide meaningful value.

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

- **Ownership** - keep infrastructure understandable and controllable.
- **Privacy** - keep sensitive data and services under your control where it matters.
- **Open source** - build systems that are inspectable, modifiable and transparent.
- **Independence** - each system should remain useful on its own.
- **Composability** - systems should integrate through clear interfaces and established standards.
- **Practicality** - self-hosting is an option, not an ideology.
- **Operability** - documentation, recovery and maintenance are part of the system.

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

My Systems is an evolving open-source project family. **MyDNS** is currently the first active implementation.

## License

See [LICENSE](LICENSE).
