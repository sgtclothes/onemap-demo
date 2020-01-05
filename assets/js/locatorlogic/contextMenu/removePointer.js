var removePointer = function (map) {
    $(document).delegate("#contextmenu-remove-pointing", "click", function () {
        var layer = getLayerById(map, "pointer")
        map.ObjMap.remove(layer)
        $("#hold-radius-slider").remove()
        map.ObjMap.remove(getLayerById(map, "hold-radius"))
        localStorage.removeItem("livePointingLongitude")
        localStorage.removeItem("livePointingLatitude")
    })
}