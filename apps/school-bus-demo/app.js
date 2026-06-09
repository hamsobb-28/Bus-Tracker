const views = {
  parent: document.querySelector("#parent-view"),
  driver: document.querySelector("#driver-view"),
  admin: document.querySelector("#admin-view")
};

const routeStops = [
  { name: "Sharon High School", eta: "Departing", lat: 42.1137, lng: -71.1775 },
  { name: "Post Office Square", eta: "6 min", lat: 42.1237, lng: -71.1787 },
  { name: "Sharon Public Library", eta: "11 min", lat: 42.1246, lng: -71.1819 },
  { name: "Sharon Station", eta: "16 min", lat: 42.1257, lng: -71.1848 }
];

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
  if (state.progress < 25) return 1;
  if (state.progress < 58) return 2;
  if (state.progress < 88) return 3;
  return 4;
}

function getPositionFromProgress() {
  const points = routeStops.map((stop) => ({ lat: stop.lat, lng: stop.lng }));

  const segmentSize = 100 / (points.length - 1);
  const segment = Math.min(points.length - 2, Math.floor(state.progress / segmentSize));
  const localProgress = (state.progress - segment * segmentSize) / segmentSize;
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

  const routeLatLngs = routeStops.map((stop) => [stop.lat, stop.lng]);
  maps.routeBounds = L.latLngBounds(routeLatLngs);
  const parentMap = L.map("parent-map", {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([42.1199, -71.1806], 15);

  addTileLayer(parentMap);
  L.polyline(routeLatLngs, { color: "#1f7a4f", weight: 6, opacity: 0.72 }).addTo(parentMap);

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
  L.polyline(routeLatLngs, { color: "#1f7a4f", weight: 5, opacity: 0.62 }).addTo(adminMap);

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
