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

const fleetRoutes = {
  "12": {
    id: "12",
    label: "Bus 12",
    routeName: "North Loop",
    driver: "Ms. Carter",
    className: "bus-12",
    color: "#1a73e8",
    stops: routeStops,
    path: routePath,
    progress: () => state.progress,
    status: () => state.status
  },
  "18": {
    id: "18",
    label: "Bus 18",
    routeName: "East Ridge",
    driver: "Mr. Patel",
    className: "bus-18",
    color: "#1f7a4f",
    progress: () => 42,
    status: () => "Active",
    stops: [
      { name: "Sharon High School", eta: "Departing", lat: 42.113659, lng: -71.177707 },
      { name: "Cottage Street School", eta: "7 min", lat: 42.119561, lng: -71.173502 },
      { name: "East Elementary School", eta: "18 min", lat: 42.114321, lng: -71.147715 }
    ],
    path: [
      { lat: 42.113659, lng: -71.177707 },
      { lat: 42.113667, lng: -71.176041 },
      { lat: 42.11469, lng: -71.176311 },
      { lat: 42.11844, lng: -71.17627 },
      { lat: 42.118635, lng: -71.173102 },
      { lat: 42.119129, lng: -71.173319 },
      { lat: 42.119907, lng: -71.173596 },
      { lat: 42.121296, lng: -71.172588 },
      { lat: 42.121275, lng: -71.170287 },
      { lat: 42.121266, lng: -71.169124 },
      { lat: 42.121257, lng: -71.168096 },
      { lat: 42.12125, lng: -71.16724 },
      { lat: 42.121238, lng: -71.165835 },
      { lat: 42.121171, lng: -71.164576 },
      { lat: 42.121162, lng: -71.162562 },
      { lat: 42.12141, lng: -71.15958 },
      { lat: 42.12067, lng: -71.15949 },
      { lat: 42.12034, lng: -71.15867 },
      { lat: 42.11935, lng: -71.15946 },
      { lat: 42.11854, lng: -71.1599 },
      { lat: 42.117718, lng: -71.158015 },
      { lat: 42.11782, lng: -71.157848 },
      { lat: 42.118029, lng: -71.157521 },
      { lat: 42.118153, lng: -71.156236 },
      { lat: 42.116822, lng: -71.153682 },
      { lat: 42.116677, lng: -71.153288 },
      { lat: 42.11609, lng: -71.15099 },
      { lat: 42.115487, lng: -71.148474 },
      { lat: 42.114578, lng: -71.147419 },
      { lat: 42.11448, lng: -71.147681 },
      { lat: 42.114321, lng: -71.147715 }
    ]
  },
  "22": {
    id: "22",
    label: "Bus 22",
    routeName: "South Line",
    driver: "Ms. Brooks",
    className: "bus-22",
    color: "#d97706",
    progress: () => 100,
    status: () => "Completed",
    stops: [
      { name: "Sharon High School", eta: "Departing", lat: 42.113659, lng: -71.177707 },
      { name: "East Foxboro Street", eta: "12 min", lat: 42.108929, lng: -71.189944 },
      { name: "Heights Elementary School", eta: "Completed", lat: 42.104079, lng: -71.204572 }
    ],
    path: [
      { lat: 42.113659, lng: -71.177707 },
      { lat: 42.113667, lng: -71.176041 },
      { lat: 42.111789, lng: -71.178272 },
      { lat: 42.111536, lng: -71.179847 },
      { lat: 42.110084, lng: -71.180751 },
      { lat: 42.109515, lng: -71.180941 },
      { lat: 42.109201, lng: -71.181115 },
      { lat: 42.108236, lng: -71.181727 },
      { lat: 42.107581, lng: -71.182353 },
      { lat: 42.107131, lng: -71.182994 },
      { lat: 42.106727, lng: -71.184141 },
      { lat: 42.106388, lng: -71.184825 },
      { lat: 42.105871, lng: -71.185588 },
      { lat: 42.105385, lng: -71.186642 },
      { lat: 42.105003, lng: -71.186954 },
      { lat: 42.104832, lng: -71.18713 },
      { lat: 42.10497, lng: -71.187494 },
      { lat: 42.10716, lng: -71.18975 },
      { lat: 42.108752, lng: -71.18997 },
      { lat: 42.10965, lng: -71.189815 },
      { lat: 42.11095, lng: -71.189559 },
      { lat: 42.111774, lng: -71.189199 },
      { lat: 42.111995, lng: -71.189241 },
      { lat: 42.11211, lng: -71.189334 },
      { lat: 42.112126, lng: -71.189651 },
      { lat: 42.111269, lng: -71.191513 },
      { lat: 42.110171, lng: -71.19395 },
      { lat: 42.108852, lng: -71.197094 },
      { lat: 42.10801, lng: -71.198981 },
      { lat: 42.107501, lng: -71.20021 },
      { lat: 42.106686, lng: -71.202391 },
      { lat: 42.10613, lng: -71.203912 },
      { lat: 42.105684, lng: -71.204956 },
      { lat: 42.105054, lng: -71.206316 },
      { lat: 42.104295, lng: -71.205594 },
      { lat: 42.104172, lng: -71.205436 },
      { lat: 42.104079, lng: -71.204572 }
    ]
  }
};

const fleetBuses = [
  fleetRoutes["12"],
  fleetRoutes["18"],
  fleetRoutes["22"]
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
  adminBus18: document.querySelector("#admin-bus-18"),
  adminBus22: document.querySelector("#admin-bus-22"),
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
  adminBusMarkers: {},
  resizeObserver: null,
  parentRouteBounds: null,
  fleetRouteBounds: null,
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

function addRouteLine(map, routeLatLngs, weight, color = "#1a73e8", classSuffix = "blue") {
  const routeCasing = L.polyline(routeLatLngs, {
    color: "#ffffff",
    className: `route-line route-line-casing route-line-${classSuffix}-casing`,
    interactive: false,
    weight: weight + 5,
    opacity: 0.9,
    smoothFactor: 1
  }).addTo(map);
  const routeLine = L.polyline(routeLatLngs, {
    color,
    className: `route-line route-line-${classSuffix}`,
    interactive: false,
    weight,
    opacity: 0.95,
    smoothFactor: 1
  }).addTo(map);

  routeCasing.bringToFront();
  routeLine.bringToFront();
}

function getPositionOnPath(points, progress) {
  const segmentDistances = points.slice(0, -1).map((point, index) => {
    const next = points[index + 1];
    return Math.hypot(next.lat - point.lat, next.lng - point.lng);
  });
  const totalDistance = segmentDistances.reduce((sum, distance) => sum + distance, 0);
  let targetDistance = totalDistance * (progress / 100);
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

function getPositionFromProgress() {
  return getPositionOnPath(routePath, state.progress);
}

function getBusPosition(bus) {
  return getPositionOnPath(bus.path, bus.progress());
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
  const fleetLatLngs = fleetBuses.flatMap((bus) => [
    ...bus.path.map((point) => [point.lat, point.lng]),
    ...bus.stops.map((stop) => [stop.lat, stop.lng])
  ]);
  maps.parentRouteBounds = L.latLngBounds([...routeLatLngs, ...stopLatLngs]);
  maps.fleetRouteBounds = L.latLngBounds(fleetLatLngs);
  const parentMap = L.map("parent-map", {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([42.1199, -71.1806], 15);

  addTileLayer(parentMap);
  addRouteLine(parentMap, routeLatLngs, 6, fleetRoutes["12"].color, "bus-12");

  routeStops.forEach((stop, index) => {
    L.marker([stop.lat, stop.lng], {
      icon: makeIcon("stop-map-marker", index + 1, 30)
    }).addTo(parentMap).bindPopup(stop.name);
  });

  maps.parentBusMarker = L.marker([routeStops[0].lat, routeStops[0].lng], {
    icon: makeIcon("bus-map-marker", "12", 48),
    zIndexOffset: 1000
  }).addTo(parentMap).bindPopup("Bus 12");

  parentMap.fitBounds(maps.parentRouteBounds, { padding: [36, 36] });
  const adminMap = L.map("admin-map", {
    scrollWheelZoom: false,
    zoomControl: false
  }).setView([42.1199, -71.1806], 14);

  addTileLayer(adminMap);
  fleetBuses.forEach((bus) => {
    const busLatLngs = bus.path.map((point) => [point.lat, point.lng]);
    addRouteLine(adminMap, busLatLngs, bus.id === "12" ? 5 : 4, bus.color, `bus-${bus.id}`);

    bus.stops.slice(1).forEach((stop, index) => {
      L.marker([stop.lat, stop.lng], {
        icon: makeIcon("stop-map-marker", `${bus.id}.${index + 1}`, 30),
        zIndexOffset: 250
      }).addTo(adminMap).bindPopup(`${bus.label}: ${stop.name}`);
    });
  });

  fleetBuses.forEach((bus) => {
    const position = getBusPosition(bus);
    const marker = L.marker([position.lat, position.lng], {
      icon: makeIcon(`fleet-map-marker ${bus.className}`, bus.id, 38),
      zIndexOffset: 900
    }).addTo(adminMap).bindPopup(bus.label);

    maps.adminBusMarkers[bus.id] = marker;
  });

  adminMap.fitBounds(maps.fleetRouteBounds, { padding: [30, 30] });

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
      } else if (maps.parentRouteBounds) {
        maps.parent?.fitBounds(maps.parentRouteBounds, { padding: [36, 36], animate: false });
      }
    }

    if (state.activeView === "admin" && maps.fleetRouteBounds) {
      maps.admin?.fitBounds(maps.fleetRouteBounds, { padding: [30, 30], animate: false });
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
  elements.adminBus18.textContent = fleetRoutes["18"].status();
  elements.adminBus22.textContent = fleetRoutes["22"].status();
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
  fleetBuses.forEach((bus) => {
    const busPosition = getBusPosition(bus);
    maps.adminBusMarkers[bus.id]?.setLatLng([busPosition.lat, busPosition.lng]);
  });

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
