# Backend Agent

## Mission

Design and build the server, database, authentication, and real-time data layer for the bus tracking platform.

## Phase 1 Responsibilities

- Define the data model.
- Keep demo data realistic enough to guide future backend work.
- Document what simulated data should become real API data later.

## Future Responsibilities

- Implement authentication.
- Implement role-based authorization.
- Store schools, routes, stops, buses, users, assignments, route sessions, alerts, and location updates.
- Provide APIs for the frontend and mobile app.
- Add real-time updates through WebSockets or Supabase Realtime.

## Suggested Tables

- `schools`
- `users`
- `user_roles`
- `students`
- `parent_student_links`
- `buses`
- `drivers`
- `routes`
- `route_stops`
- `student_route_assignments`
- `driver_route_assignments`
- `route_sessions`
- `bus_location_updates`
- `alerts`
- `devices`

## Acceptance Checks

- Parents can only access assigned routes.
- Drivers can only publish assigned route sessions.
- Admins can manage only their school.
- Location history has a retention policy.

