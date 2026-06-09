const views = {
  parent: document.querySelector("#parent-view"),
  driver: document.querySelector("#driver-view"),
  admin: document.querySelector("#admin-view")
};

const routeStops = [
  { name: "Sharon High School", eta: "Departing", lat: 42.113659, lng: -71.177707 },
  { name: "Post Office Square", eta: "6 min", lat: 42.1236, lng: -71.17876 },
  { name: "Sharon Public Library", eta: "11 min", lat: 42.12441, lng: -71.182002 },
  { name: "Sharon Station", eta: "16 min", lat: 42.125748, lng: -71.184742 }
];

// Street-snapped route geometry from OSRM/OpenStreetMap for the demo stops.
const routePath = [
  { lat: 42.113659, lng: -71.177707 },
  { lat: 42.113596, lng: -71.177684 },
  { lat: 42.113528, lng: -71.177632 },
  { lat: 42.113482, lng: -71.177545 },
  { lat: 42.113465, lng: -71.17744 },
  { lat: 42.113481, lng: -71.177277 },
  { lat: 42.113667, lng: -71.176041 },
  { lat: 42.113759, lng: -71.176059 },
  { lat: 42.113806, lng: -71.176072 },
  { lat: 42.113884, lng: -71.176093 },
  { lat: 42.114435, lng: -71.176242 },
  { lat: 42.114603, lng: -71.176288 },
  { lat: 42.11469, lng: -71.176311 },
  { lat: 42.114826, lng: -71.176347 },
  { lat: 42.115684, lng: -71.176571 },
  { lat: 42.11764, lng: -71.17709 },
  { lat: 42.118393, lng: -71.177277 },
  { lat: 42.118443, lng: -71.177289 },
  { lat: 42.11908, lng: -71.17747 },
  { lat: 42.119391, lng: -71.177548 },
  { lat: 42.119953, lng: -71.177688 },
  { lat: 42.120142, lng: -71.177735 },
  { lat: 42.120343, lng: -71.177787 },
  { lat: 42.120358, lng: -71.17779 },
  { lat: 42.1204, lng: -71.1778 },
  { lat: 42.120425, lng: -71.177806 },
  { lat: 42.120546, lng: -71.177836 },
  { lat: 42.120666, lng: -71.177866 },
  { lat: 42.120687, lng: -71.177872 },
  { lat: 42.121047, lng: -71.177964 },
  { lat: 42.121127, lng: -71.177985 },
  { lat: 42.121263, lng: -71.17802 },
  { lat: 42.121274, lng: -71.178022 },
  { lat: 42.12131, lng: -71.178032 },
  { lat: 42.121462, lng: -71.17807 },
  { lat: 42.121525, lng: -71.178086 },
  { lat: 42.121669, lng: -71.178121 },
  { lat: 42.121723, lng: -71.178134 },
  { lat: 42.122022, lng: -71.178206 },
  { lat: 42.12206, lng: -71.178216 },
  { lat: 42.122234, lng: -71.17826 },
  { lat: 42.122498, lng: -71.178327 },
  { lat: 42.122588, lng: -71.178347 },
  { lat: 42.122666, lng: -71.178364 },
  { lat: 42.122887, lng: -71.178412 },
  { lat: 42.123027, lng: -71.178442 },
  { lat: 42.12305, lng: -71.178446 },
  { lat: 42.123171, lng: -71.178466 },
  { lat: 42.123247, lng: -71.178473 },
  { lat: 42.123297, lng: -71.178474 },
  { lat: 42.123346, lng: -71.178469 },
  { lat: 42.123359, lng: -71.178467 },
  { lat: 42.123371, lng: -71.178463 },
  { lat: 42.123425, lng: -71.17843 },
  { lat: 42.123475, lng: -71.178383 },
  { lat: 42.1236, lng: -71.17876 },
  { lat: 42.123617, lng: -71.178813 },
  { lat: 42.123668, lng: -71.178951 },
  { lat: 42.123725, lng: -71.179111 },
  { lat: 42.123767, lng: -71.17923 },
  { lat: 42.123778, lng: -71.179262 },
  { lat: 42.123804, lng: -71.179337 },
  { lat: 42.123826, lng: -71.179406 },
  { lat: 42.123848, lng: -71.179475 },
  { lat: 42.12387, lng: -71.179543 },
  { lat: 42.123883, lng: -71.179584 },
  { lat: 42.123922, lng: -71.179694 },
  { lat: 42.123948, lng: -71.179773 },
  { lat: 42.123971, lng: -71.179856 },
  { lat: 42.123985, lng: -71.179902 },
  { lat: 42.123997, lng: -71.179959 },
  { lat: 42.124017, lng: -71.180053 },
  { lat: 42.124051, lng: -71.180231 },
  { lat: 42.124113, lng: -71.180575 },
  { lat: 42.124124, lng: -71.180636 },
  { lat: 42.124292, lng: -71.181548 },
  { lat: 42.124302, lng: -71.181593 },
  { lat: 42.12432, lng: -71.181663 },
  { lat: 42.124384, lng: -71.181916 },
  { lat: 42.12441, lng: -71.182002 },
  { lat: 42.124421, lng: -71.182041 },
  { lat: 42.124446, lng: -71.182134 },
  { lat: 42.124509, lng: -71.182358 },
  { lat: 42.124614, lng: -71.182711 },
  { lat: 42.124707, lng: -71.182999 },
  { lat: 42.124758, lng: -71.183125 },
  { lat: 42.124805, lng: -71.183233 },
  { lat: 42.124857, lng: -71.183335 },
  { lat: 42.124915, lng: -71.183438 },
  { lat: 42.124968, lng: -71.183526 },
  { lat: 42.125132, lng: -71.183787 },
  { lat: 42.1252, lng: -71.183892 },
  { lat: 42.125248, lng: -71.183963 },
  { lat: 42.125278, lng: -71.184011 },
  { lat: 42.125436, lng: -71.184259 },
  { lat: 42.125504, lng: -71.184365 },
  { lat: 42.125577, lng: -71.184478 },
  { lat: 42.125702, lng: -71.184671 },
  { lat: 42.12572, lng: -71.1847 },
  { lat: 42.125748, lng: -71.184742 }
];

const stopProgressThresholds = [70, 85, 99];

const fleetBuses = [
  { id: "12", label: "Bus 12", className: "bus-12", lat: 42.1137, lng: -71.1775 },
  { id: "18", label: "Bus 18", className: "bus-18", lat: 42.1212, lng: -71.1742 },
  { id: "22", label: "Bus 22", className: "bus-22", lat: 42.1172, lng: -71.1866 }
];

const state = {
  activeView: "parent",
  status: "Not started",
  progress: 0,
  delayed: false,
  timer: null,
  sessionId: null,
  lastPing: null,
  followBus: false
};

const elements = {
  viewTitle: document.querySelector("#view-title"),
  globalStatus: document.querySelector("#global-status"),
  parentStatus: document.querySelector("#parent-status"),
  adminBus12: document.querySelector("#admin-bus-12"),
  driverStatus: document.querySelector("#driver-status"),
  driverDetail: document.querySelector("#driver-detail"),
  driverLastPing: document.querySelector("#driver-last-ping"),
  parentLastUpdate: document.querySelector("#parent-last-update"),
  adminLastUpdate: document.querySelector("#admin-last-update"),
  nextStop: document.querySelector("#next-stop"),
  eta: document.querySelector("#eta"),
  sessionId: document.querySelector("#session-id"),
  parentStops: document.querySelector("#parent-stops"),
  followBus: document.querySelector("#follow-bus")
};

const maps = {
  parent: null,
  admin: null,
  parentBusMarker: null,
  adminBusMarker: null,
  resizeObserver: null,
  routeBounds: null,
  isProgrammaticMove: false
};

function renderStops() {
  elements.parentStops.innerHTML = routeStops
    .map((stop, index) => {
      const className = index < currentStopIndex() ? "done" : index === currentStopIndex() ? "current" : "";
      return `
        <li class="${className}">
          <span class="stop-dot">${index + 1}</span>
          <span>${stop.name}</span>
          <strong>${index === 0 ? "School" : stop.eta}</strong>
        </li>
      `;
    })
    .join("");
}

function currentStopIndex() {
  if (state.progress < stopProgressThresholds[0]) return 1;
  if (state.progress < stopProgressThresholds[1]) return 2;
  if (state.progress < stopProgressThresholds[2]) return 3;
  return 4;
}

function addRouteLine(map, routeLatLngs, weight) {
  const routeCasing = L.polyline(routeLatLngs, {
    color: "#ffffff",
    className: "route-line route-line-casing",
    interactive: false,
    weight: weight + 5,
    opacity: 0.9,
    smoothFactor: 1
  }).addTo(map);
  const routeLine = L.polyline(routeLatLngs, {
    color: "#1a73e8",
    className: "route-line route-line-blue",
    interactive: false,
    weight,
    opacity: 0.95,
    smoothFactor: 1
  }).addTo(map);

  routeCasing.bringToFront();
  routeLine.bringToFront();
}

function getPositionFromProgress() {
  const points = routePath;
  const segmentDistances = points.slice(0, -1).map((point, index) => {
    const next = points[index + 1];
    return Math.hypot(next.lat - point.lat, next.lng - point.lng);
  });
  const totalDistance = segmentDistances.reduce((sum, distance) => sum + distance, 0);
  let targetDistance = totalDistance * (state.progress / 100);
  let segment = 0;

  while (segment < segmentDistances.length - 1 && targetDistance > segmentDistances[segment]) {
    targetDistance -= segmentDistances[segment];
    segment += 1;
  }

  const localProgress = segmentDistances[segment] === 0 ? 0 : targetDistance / segmentDistances[segment];
  const start = points[segment];
  const end = points[segment + 1];

  return {
    lat: start.lat + (end.lat - start.lat) * localProgress,
    lng: start.lng + (end.lng - start.lng) * localProgress
  };
}

function makeIcon(className, label, size) {
  return L.divIcon({
    className: "",
    html: `<div class="${className}">${label}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
}

function addTileLayer(map) {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}

function showMapFallback(containerId) {
  const container = document.querySelector(`#${containerId}`);
  container.innerHTML = `
    <div class="map-fallback">
      Real map tiles need an internet connection. The route data is still centered on Sharon High School.
    </div>
  `;
}

function initMaps() {
  if (!window.L) {
    showMapFallback("parent-map");
    showMapFallback("admin-map");
    return;
  }

  const routeLatLngs = routePath.map((point) => [point.lat, point.lng]);
  const stopLatLngs = routeStops.map((stop) => [stop.lat, stop.lng]);
  maps.routeBounds = L.latLngBounds([...routeLatLngs, ...stopLatLngs]);
  const parentMap = L.map("parent-map", {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([42.1199, -71.1806], 15);

  addTileLayer(parentMap);
  addRouteLine(parentMap, routeLatLngs, 6);

  routeStops.forEach((stop, index) => {
    L.marker([stop.lat, stop.lng], {
      icon: makeIcon("stop-map-marker", index + 1, 30)
    }).addTo(parentMap).bindPopup(stop.name);
  });

  maps.parentBusMarker = L.marker([routeStops[0].lat, routeStops[0].lng], {
    icon: makeIcon("bus-map-marker", "12", 48),
    zIndexOffset: 1000
  }).addTo(parentMap).bindPopup("Bus 12");

  parentMap.fitBounds(maps.routeBounds, { padding: [36, 36] });
  const adminMap = L.map("admin-map", {
    scrollWheelZoom: false,
    zoomControl: false
  }).setView([42.1199, -71.1806], 14);

  addTileLayer(adminMap);
  addRouteLine(adminMap, routeLatLngs, 5);

  fleetBuses.forEach((bus) => {
    const marker = L.marker([bus.lat, bus.lng], {
      icon: makeIcon(`fleet-map-marker ${bus.className}`, bus.id, 38)
    }).addTo(adminMap).bindPopup(bus.label);

    if (bus.id === "12") {
      maps.adminBusMarker = marker;
    }
  });

  adminMap.fitBounds(maps.routeBounds, { padding: [30, 30] });

  maps.parent = parentMap;
  maps.admin = adminMap;
  maps.resizeObserver = new ResizeObserver(() => refreshVisibleMaps());
  maps.resizeObserver.observe(document.querySelector("#parent-map"));
  maps.resizeObserver.observe(document.querySelector("#admin-map"));
  refreshVisibleMaps();
}

function setFollowBus(enabled) {
  state.followBus = enabled;
  elements.followBus.setAttribute("aria-pressed", String(enabled));
  elements.followBus.classList.toggle("active", enabled);
  elements.followBus.innerHTML = enabled
    ? '<span class="follow-icon" aria-hidden="true"></span> Following'
    : '<span class="follow-icon" aria-hidden="true"></span> Follow Bus';

  if (enabled) {
    centerOnBus(true);
  }
}

function centerOnBus(animate = true) {
  if (!maps.parent) return;
  const position = getPositionFromProgress();
  maps.isProgrammaticMove = true;
  maps.parent.setView([position.lat, position.lng], Math.max(maps.parent.getZoom(), 16), {
    animate
  });
  window.setTimeout(() => {
    maps.isProgrammaticMove = false;
  }, 400);
}

function refreshVisibleMaps() {
  window.setTimeout(() => {
    maps.parent?.invalidateSize();
    maps.admin?.invalidateSize();

    if (state.activeView === "parent") {
      if (state.followBus) {
        centerOnBus(false);
      } else if (maps.routeBounds) {
        maps.parent?.fitBounds(maps.routeBounds, { padding: [36, 36], animate: false });
      }
    }

    if (state.activeView === "admin" && maps.routeBounds) {
      maps.admin?.fitBounds(maps.routeBounds, { padding: [30, 30], animate: false });
    }
  }, 80);
}

function setView(viewName) {
  state.activeView = viewName;
  document.querySelectorAll(".role-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  Object.entries(views).forEach(([name, view]) => {
    view.classList.toggle("active", name === viewName);
  });
  elements.viewTitle.textContent = {
    parent: "My Bus",
    driver: "Driver Route",
    admin: "Admin Dashboard"
  }[viewName];

  refreshVisibleMaps();
}

function setStatus(status) {
  state.status = status;
  const normalized = status.toLowerCase().replace(" ", "-");
  elements.globalStatus.textContent = status;
  elements.globalStatus.className = `status-pill ${normalized}`;
  elements.parentStatus.textContent = status;
  elements.adminBus12.textContent = status;
  elements.driverStatus.textContent = status;
}

function updateLastPing() {
  state.lastPing = new Date();
  const time = state.lastPing.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" });
  elements.driverLastPing.textContent = time;
  elements.parentLastUpdate.textContent = `Updated ${time}`;
  elements.adminLastUpdate.textContent = `Updated ${time}`;
}

function renderBusPosition() {
  const position = getPositionFromProgress();
  const latLng = [position.lat, position.lng];
  maps.parentBusMarker?.setLatLng(latLng);
  maps.adminBusMarker?.setLatLng(latLng);

  if (state.followBus) {
    maps.isProgrammaticMove = true;
    maps.parent?.panTo(latLng, { animate: true, duration: 0.55 });
    window.setTimeout(() => {
      maps.isProgrammaticMove = false;
    }, 650);
  }

  const stopIndex = currentStopIndex();
  const next = routeStops[Math.min(stopIndex, routeStops.length - 1)];
  elements.nextStop.textContent = state.progress >= 96 ? "Route complete" : next.name;

  if (state.status === "Not started") {
    elements.eta.textContent = "Waiting for driver";
  } else if (state.status === "Completed") {
    elements.eta.textContent = "Bus arrived";
  } else if (state.status === "Paused") {
    elements.eta.textContent = "Tracking paused";
  } else {
    const baseEta = Math.max(2, Math.ceil((100 - state.progress) / 8));
    elements.eta.textContent = state.delayed ? `${baseEta + 8} min - delayed` : `${baseEta} min`;
  }

  renderStops();
}

function startRoute() {
  state.delayed = false;
  state.sessionId = `Session ${new Date().toLocaleDateString()} AM`;
  elements.sessionId.textContent = state.sessionId;
  elements.driverDetail.textContent = "Tracking is active. Location pings are being simulated.";
  setStatus("Active");
  updateLastPing();

  if (state.timer) clearInterval(state.timer);
  state.timer = setInterval(() => {
    if (state.status !== "Active" && state.status !== "Delayed") return;
    state.progress = Math.min(100, state.progress + 4);
    updateLastPing();
    renderBusPosition();

    if (state.progress >= 100) {
      endRoute(true);
    }
  }, 1500);
}

function pauseRoute() {
  if (state.status === "Paused") {
    elements.driverDetail.textContent = "Tracking resumed.";
    setStatus(state.delayed ? "Delayed" : "Active");
    updateLastPing();
    return;
  }

  if (state.status === "Active" || state.status === "Delayed") {
    elements.driverDetail.textContent = "Tracking paused. Parents will see that updates are paused.";
    setStatus("Paused");
    updateLastPing();
  }
}

function endRoute(autoCompleted = false) {
  if (state.timer) clearInterval(state.timer);
  state.timer = null;
  state.progress = autoCompleted ? 100 : state.progress;
  state.delayed = false;
  elements.driverDetail.textContent = autoCompleted ? "Route completed automatically." : "Route ended by driver.";
  setStatus("Completed");
  updateLastPing();
  renderBusPosition();
}

function reportDelay() {
  if (state.status === "Not started" || state.status === "Completed") return;
  state.delayed = true;
  elements.driverDetail.textContent = "Delay reported. Parents and admins now see delayed status.";
  setStatus("Delayed");
  updateLastPing();
  renderBusPosition();
}

document.querySelectorAll(".role-tab").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.querySelector("#start-route").addEventListener("click", startRoute);
document.querySelector("#pause-route").addEventListener("click", pauseRoute);
document.querySelector("#end-route").addEventListener("click", () => endRoute(false));
document.querySelector("#delay-route").addEventListener("click", reportDelay);
elements.followBus.addEventListener("click", () => setFollowBus(!state.followBus));

initMaps();
renderStops();
renderBusPosition();
