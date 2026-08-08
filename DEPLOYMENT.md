# Nexus AI Sales OS - Enterprise Production Deployment Guide

## System Overview
**Nexus AI Sales OS** is a fully autonomous, enterprise-grade AI Sales and Digital Asset Valuation Platform. Powered by a fleet of **20 specialized Gemini 3.6 Flash AI agents**, Nexus orchestrates complete end-to-end M&A transaction cycles for SaaS and digital products—from strategic buyer discovery and DCF valuation modeling to campaign generation, interactive AI negotiation, and binding legal contract execution (LOI/NDA/APA).

---

## 1. Environment & API Key Prerequisites

| Service | Environment Variable | Required | Description |
|---|---|---|---|
| **Google Gemini API** | `GEMINI_API_KEY` | **Yes** | Primary AI intelligence engine for autonomous agents |
| **Outreach Engine** | `SENDGRID_API_KEY` | Optional | Automated cold email dispatch and sequence delivery |
| **Apollo / HubSpot** | `HUBSPOT_API_KEY` | Optional | Buyer prospecting & CRM bi-directional sync |
| **Escrow.com** | `ESCROW_API_KEY` | Optional | Digital asset purchase price escrow holdback & release |
| **JWT & Security** | `JWT_SECRET` | **Yes** | Enterprise session token signing |

---

## 2. Production Build & Execution Commands

```bash
# 1. Install Dependencies
npm install

# 2. Run Production Build (Vite + esbuild CJS server bundle)
npm run build

# 3. Launch Enterprise Production Server
npm start
```

---

## 3. Architecture & Container Ingress

- **Backend Runtime**: Express Node.js Server (`dist/server.cjs`) on Port `3000`.
- **Frontend Stack**: React 18 SPA with Tailwind CSS & Motion.
- **AI Core**: Direct Google GenAI SDK (`@google/genai`) with Gemini 3.6 Flash server proxy (`/api/agent/dispatch`).
- **State Engine**: Persisted local state with fallback cloud synchronization hooks.

---

## 4. Human-in-the-Loop Governance Checkpoints

Autonomous AI deals are governed by automatic escalation safety checks (`/api/governance/check`):
- **Discount Threshold**: Any counter-offer exceeding **15%** discount requires CEO / Board approval.
- **Deal Tier 1**: Transactions over **$2,000,000 USD** trigger executive sign-off.
- **Custom Escrow**: Non-standard legal terms mandate Chief Legal Officer verification.

---

## 5. Operations & Monitoring Setup

- **Health Check Endpoint**: `GET /api/health`
- **Telemetry Metric Export**: Built-in real-time stream tracking token consumption, latency (ms), agent dispatch count, and total pipeline value.
- **Backup Strategy**: Daily automated snapshots of `localStorage` workspace configurations & encrypted transaction histories.
