# School Bus Tracker Agent Plan

## Mission

Build a school-first bus tracking product for one school, starting with a low-cost driver-phone demo and growing into a sellable multi-school platform.

The first goal is Phase 1: a believable demo that shows the product flow without requiring real GPS hardware, accounts, or paid map APIs.

## Product Direction

- Initial customer: one school.
- Future customer: multiple schools or districts.
- Tracking source: driver phones first; optional GPS devices later.
- Access model: parents and students must log in and only see their assigned route.
- Platforms: responsive website first, then mobile app.
- Notifications: not required for the first version, but the system should leave space for push, SMS, and email alerts later.

## Core Roles

- Parent/student: sees only assigned bus, route status, stops, and ETA.
- Driver: starts and ends route tracking from a phone.
- School admin: manages routes, buses, drivers, stops, and assignments.
- Product owner: manages future school customers, billing, usage, and settings.

## Mini Milestones

### Phase 1: Demo

Purpose: prove the workflow visually and interactively.

Deliverables:

- Clickable parent/student view.
- Clickable driver view.
- Clickable school admin view.
- Simulated bus movement on a real Sharon, MA map layer.
- Toggleable follow-bus map control.
- Simulated route stops, ETA, and status.
- Clear safety model in the UI: assigned-route visibility only.

Acceptance checks:

- A user can switch between parent, driver, and admin views.
- Parent view shows one assigned bus and route timeline.
- Driver view can start, pause, resume, and end a route session.
- Admin view shows buses, route setup, and live fleet status.
- Demo works from static files without requiring a backend.

### Phase 2: Real GPS MVP

Purpose: replace simulated movement with driver phone location.

Deliverables:

- Driver location permission flow.
- Real location pings from driver phone.
- Backend endpoint for location updates.
- Parent map receives fresh bus position.
- Route session storage.

Materials needed:

- Driver phone with browser or mobile app.
- HTTPS hosting so browser GPS APIs work reliably.
- Backend database.
- Authentication provider.
- Map provider.

### Phase 3: School Pilot

Purpose: test with a small group in real school conditions.

Deliverables:

- 1 school, 1-3 buses, limited parent group.
- Admin onboarding flow.
- Basic support process.
- GPS reliability logging.
- Privacy review.

Materials needed:

- School approval.
- Driver participation.
- Parent test group.
- Privacy policy draft.
- Incident/contact process.

### Phase 4: Production

Purpose: harden the product for daily use.

Deliverables:

- Strong role-based access control.
- Audit logs.
- Route history retention rules.
- Monitoring for stale GPS signals.
- Notification system.
- Better ETA calculations.
- Admin user management.

Materials needed:

- Production hosting.
- Backups.
- Error monitoring.
- Terms and privacy docs.
- Support owner.

### Phase 5: Sellable Product

Purpose: make the app useful beyond one school.

Deliverables:

- Multi-school tenant model.
- Billing and subscription plans.
- School onboarding checklist.
- Optional GPS device support.
- Analytics dashboard.
- Customer support tooling.

Materials needed:

- Legal/business setup.
- Pricing model.
- Sales materials.
- Device vendor research if GPS hardware is offered.

## Recommended Stack

### Demo Phase

- Static HTML, CSS, and JavaScript.
- Leaflet with OpenStreetMap tiles for the real map layer.
- Simulated route behavior.
- No paid map API key.

### Real MVP

- Frontend: Next.js or React.
- Mobile: Expo / React Native.
- Backend: Supabase or Node.js API.
- Database: PostgreSQL.
- Auth: Supabase Auth, Clerk, or Auth0.
- Live updates: Supabase Realtime or WebSockets.
- Maps: Mapbox, Google Maps, or Leaflet/OpenStreetMap.
- Notifications later: Firebase Cloud Messaging, Twilio, email.

## Worker Delegation

The project is split into subagents:

- Frontend Agent: owns UI, screens, visual polish, responsive behavior.
- Backend Agent: owns data model, APIs, auth, live updates.
- Mobile/Driver Agent: owns driver-phone location sharing and route session UX.
- Privacy/Security Agent: owns permissions, student safety, retention, and compliance posture.
- QA/Debugging Agent: owns testing, bug reports, acceptance checks, and release readiness.
- Product/Launch Agent: owns school pilot plan, materials, onboarding, and commercialization path.

Each subagent has its own brief in `docs/agents/`.

## Current Implementation

Phase 1 demo lives in `apps/school-bus-demo/`.

Run it by opening:

`apps/school-bus-demo/index.html`
