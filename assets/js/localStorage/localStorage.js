function setStartLocalStorage() {
    localStorage.setItem("selectedLayer", "[]")
    localStorage.setItem("layerCounterRadius", 0)
    localStorage.setItem("layerCounterPolygons", 0)
    localStorage.setItem("livePointingLatitude", 0);
    localStorage.setItem("livePointingLongitude", 0);
    localStorage.setItem("pointingHighlight", null);
    localStorage.setItem("geometryRings", null)
}

function setLocalStorage(name, value) {
    localStorage.setItem(name, value)
}

function getLocalStorage(name, value) {
    var selected = null
    if (localStorage.getItem(name) == null) {
        selected = value
    } else {
        selected = localStorage.getItem(name)
    }
    return selected
}