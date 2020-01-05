function setStartLocalStorage() {
    localStorage.setItem("selectedLayer", "[]")
    localStorage.setItem("layerCounterRadius", 0)
    localStorage.setItem("layerCounterPolygons", 0)
    localStorage.setItem("livePointingLatitude", 0);
    localStorage.setItem("livePointingLongitude", 0);
    localStorage.setItem("livePointingX", 0);
    localStorage.setItem("livePointingY", 0);
    localStorage.setItem("pointingHighlight", null);
    localStorage.setItem("geometryRings", null)
}