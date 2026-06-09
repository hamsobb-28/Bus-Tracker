# RouteWise School Bus Demo

This is the Phase 1 demo for the school bus tracker project, currently tailored for Sharon High School in Sharon, MA 02067.

## What It Shows

- Parent/student assigned-route view.
- Driver route controls.
- Admin fleet overview.
- Real OpenStreetMap map tiles through Leaflet.
- Simulated bus movement on a real Sharon, MA map.
- Toggleable Follow Bus control that centers the parent map on Bus 12 and keeps following as it moves.
- Simulated route status and ETA.

## How To Run

Open `index.html` in a browser.

No server, install step, or API key is required. The map layer uses Leaflet and OpenStreetMap from public CDNs, so the map tiles need an internet connection.

## Known Demo Limits

- Bus movement is simulated.
- There is no real authentication yet.
- There is no real database yet.
- The route and bus movement are still simulated.
- Notifications are planned for later phases.

## Map Notes

The demo uses Leaflet with OpenStreetMap tiles because Google Maps requires an API key for a production-quality embedded app map. The map code can be swapped to Google Maps later if the project gets a Google Maps Platform key.

## Next Phase

Phase 2 should replace simulated movement with driver phone GPS updates and add a backend with authentication, route sessions, and live location storage.
