# 🧭 MyDNS

## Own your DNS.

MyDNS is a self-hosted, configurable DNS resolver/server intended to provide local naming, custom zones, upstream resolution, caching and filtering without making a hosted DNS platform the sole control point.

## Scope

- Recursive/forwarding DNS resolution
- Local DNS zones
- Custom records
- Upstream resolvers
- Caching
- Filtering
- Management/configuration
- Operational visibility
- Secure deployment

## Design Goals

1. **Control** - configuration and policy remain under the operator's control.
2. **Portable deployment** - practical on a laptop, desktop, VM or home server.
3. **Standards-based** - use established DNS protocols and formats.
4. **Reliable** - DNS should fail gracefully and be observable.
5. **Composable** - integrate with MyProxy, MyMonitor and other systems without requiring them.

## Ecosystem Role

MyDNS is the network foundation of the My Systems family. It can provide local names for services such as `drive`, `vault`, `auth` and `monitor`, while external DNS remains available where appropriate.

## Status

**Building**

Detailed implementation documentation belongs in the MyDNS engineering repository/project documentation. This page remains the public ecosystem-level overview.
