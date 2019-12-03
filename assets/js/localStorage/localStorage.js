function setStartLocalStorage(map) {
    localStorage.setItem("selectedLayer", "[]")
    localStorage.setItem("layerCounterRadius", 0)
    localStorage.setItem("layerCounterPolygons", 0)
    localStorage.setItem("livePointingLatitude", map.ObjMapView.center.latitude);
    localStorage.setItem("livePointingLongitude", map.ObjMapView.center.longitude);
    localStorage.setItem("pointingHighlight", null);
    localStorage.setItem("geometryRings", null)
}

var testing = function () {
    alert("Test")
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