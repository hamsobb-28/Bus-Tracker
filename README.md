# RouteWise School Bus Tracker

RouteWise is a school bus tracking prototype that shows how parents, students, drivers, and school admins could safely track assigned bus routes from one shared platform.

This repository is named **Bus-Tracker**. The current app is a static Phase 1 demo built for Sharon High School in Sharon, MA. It is designed to be easy to show, easy to understand, and honest about what is simulated versus what still needs a real backend.

## What The Demo Shows

- Role-based demo login for parents, students, drivers, and admins.
- Parent and student views that only show the route assigned to that demo account.
- Driver controls to start, stop updates, report delay, and complete a route.
- Admin dashboard with a full fleet overview across Bus 12, Bus 18, and Bus 22.
- Real map rendering with Leaflet and OpenStreetMap tiles.
- Street-following demo route lines and simulated bus movement.
- A follow-bus control for the assigned route view.

## Demo Accounts

No password is required in this prototype. Use the login cards on the first screen:

| Role | Demo account | Access |
| --- | --- | --- |
| Parent | Chen Family | Assigned route for Bus 12 |
| Student | Maya Rivera | Assigned route for Bus 18 |
| Driver | Ms. Carter | Driver controls for Bus 12 |
| Admin | Transportation Office | Full fleet dashboard and all demo views |

Parents and students are intentionally limited to their assigned route. Admins can see the full fleet.

## Run Locally

Open the static demo file in a browser:

```text
apps/school-bus-demo/index.html
```

No install step, database, backend server, or API key is required.

The map uses Leaflet and OpenStreetMap from public CDNs, so an internet connection is needed for map tiles and external assets. If your browser blocks local CDN loading, serve the demo folder with any simple static server and open the local URL.

## Repository Layout

```text
Bus-Tracker/
  README.md                 Project overview and demo guide
  agent.md                  Boss-level project plan and milestones
  apps/
    school-bus-demo/        Static Phase 1 demo app
  docs/
    agents/                 Delegated worker briefs for future phases
```

The app-specific notes live in `apps/school-bus-demo/README.md`. The root README is the main GitHub landing page.

## Current Limitations

This is a presentation-ready prototype, not a production system yet.

- There is no real backend.
- There is no real authentication or password storage.
- Bus locations, statuses, ETAs, and route progress are simulated.
- Parent/student route assignment is enforced in front-end demo logic only.
- OpenStreetMap tiles require internet access.
- A real school deployment would need privacy review, consent, monitoring, and operational support.

## Safety And Privacy Direction

The core safety rule is simple: parents and students should only see the route assigned to their account. Admins can see the full fleet because they are responsible for operations.

Before any real deployment, RouteWise should add:

- real role-based authentication and authorization
- verified student/parent route assignments
- driver consent for phone GPS tracking
- location retention rules
- admin audit logs
- school approval and parent-facing privacy language

## Roadmap

### Phase 1: Demo

Current status: mostly complete.

- Static responsive app.
- Demo role login.
- Assigned route visibility.
- Driver route controls.
- Admin fleet dashboard.
- Simulated route and GPS behavior.

### Phase 2: Real GPS MVP

- Add backend authentication.
- Store users, roles, buses, routes, stops, and assignments.
- Let driver phones send real GPS pings.
- Update parent and admin maps in near real time.
- Store route sessions and status history.

### Phase 3: School Pilot

- Test with one school and a small number of buses.
- Review privacy, consent, and driver workflow.
- Monitor GPS reliability and stale location updates.
- Gather feedback from admins, drivers, and families.

### Phase 4: Production Platform

- Harden role-based access control.
- Add audit logs, backups, monitoring, and support processes.
- Improve ETA calculations.
- Add notifications for delays, arrivals, and route changes.
- Prepare multi-school onboarding.

## Suggested Next Engineering Stack

The static demo can stay as-is while the real MVP is built.

- Frontend: React or Next.js
- Mobile/driver app: Expo or mobile-friendly web app
- Backend: Supabase or Node.js API
- Database: PostgreSQL
- Auth: Supabase Auth, Clerk, Auth0, or school Google login
- Live updates: WebSockets or Supabase Realtime
- Maps: Leaflet/OpenStreetMap, Mapbox, or Google Maps Platform

## Project Goal

RouteWise starts as a focused school demo, but the long-term goal is a safe, affordable, sellable school transportation platform that can grow from one school into a multi-school product.
