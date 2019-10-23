function setStartLocalStorage() {
    localStorage.setItem("selectedLayer", "[]")
    localStorage.setItem("layerCounterRadius", 0)
    localStorage.setItem("layerCounterPolygons", 0)
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