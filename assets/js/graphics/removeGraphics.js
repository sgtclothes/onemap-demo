var removeGraphicsByAttribute = function (map, value) {
    for (let i = 0; i < map.ObjMapView.graphics.items.length; i++) {
        if (map.ObjMapView.graphics.items[i].attributes == value) {
            map.ObjMapView.graphics.items[i].visible = false;
            map.ObjMapView.graphics.items.splice(i, 1);
        }
    }
}

var removeGraphicsByObj = function (map, value) {
    for (let i = 0; i <= map.ObjMapView.graphics.items.length - 1; i++) {
        if (map.ObjMapView.graphics.items[i].obj.hasOwnProperty(value)) {
            if (
                map.ObjMapView.graphics.items[i].obj[value] ==
                getLocalStorage("pointingHighlight", "")
            ) {
                map.ObjMapView.graphics.items[i].visible = false;
                map.ObjMapView.graphics.items.splice(i, 1);
            }
        }
    }
}

var removeAllGraphicsById = function (map, id) {
    let layer = undefined
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == id) {
            layer = map.ObjMap.layers.items[i]
        }
    }
    layer.removeAll()
}

var removeSpecificLayerById = function (map, groupLayer, id) {
    let layer = undefined
    for (let i = 0; i < groupLayer.layers.items.length; i++) {
        if (groupLayer.layers.items[i].id == id) {
            layer = groupLayer.layers.items[i]
        }
    }
    console.log(layer)
}