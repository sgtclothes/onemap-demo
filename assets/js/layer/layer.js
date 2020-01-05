var getItemsGroupLayer = function (layer) {
    let results = []
    for (let i = 0; i < layer.layers.items.length; i++) {
        if (layer.layers.items[i].graphics.items.length > 0) {
            for (let j = 0; j < layer.layers.items[i].graphics.items.length; j++) {
                results.push(layer.layers.items[i].graphics.items[j])
            }
        }
    }
    return results
}

var getAllItemsFromGroupLayer = function (map, layerName) {
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == layerName) {
            layer = map.ObjMap.layers.items[i]
        }
    }
    return layer.layers
}

var getLayerById = function (map, id) {
    let layer = undefined
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == id) {
            layer = map.ObjMap.layers.items[i]
        }
    }
    return layer
}

var getNestedLayerById = function (map, id, nested_id) {
    let layer = undefined
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == id) {
            if (map.ObjMap.layers.items[i].layers.items.length > 0) {
                for (let j = 0; j < map.ObjMap.layers.items[i].layers.items.length; j++) {
                    if (map.ObjMap.layers.items[i].layers.items[j].id == nested_id) {
                        layer = map.ObjMap.layers.items[i].layers.items[j]
                    }
                }
            }
        }
    }
    return layer
}

var getLayerViewById = function (id) {
    var layer = undefined
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].id == id) {
            layer = mapView.graphics.items[i]
        }
    }
    return layer
}

var getLayerViewBySelector = function (selector) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].selector == selector) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByReference = function (reference) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].reference == reference) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByTypeReference = function (reference) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].reference.split("-")[0] == reference) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByGraphicsTypeAndTypeReference = function (gType, reference) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].gType == gType && mapView.graphics.items[i].reference.split("-")[0] == reference) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByName = function (name) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].name == name) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByGraphicsType = function (gType) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].gType == gType) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByGroup = function (group) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].group == group) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByGraphicsTypeAndName = function (gType, name) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].gType == gType && mapView.graphics.items[i].name == name) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByGraphicsTypeAndId = function (gType, id) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].gType == gType && mapView.graphics.items[i].id == id) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByGraphicsTypeAndSelector = function (gType, selector) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].gType == gType && mapView.graphics.items[i].selector == selector) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewByGraphicsTypeAndReference = function (gType, reference) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].gType == gType && mapView.graphics.items[i].reference == reference) {
            layer.push(mapView.graphics.items[i])
        }
    }
    return layer
}

var getLayerViewIndexByReference = function (reference) {
    var layer = []
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].reference == reference) {
            layer.push(i)
        }
    }
    return layer
}

var countLayerByGraphicsType = function (gType) {
    var layer = []
    var count = 0
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].gType == gType) {
            layer.push(mapView.graphics.items[i])
        }
    }
    count = layer.length
    return count
}

var countLayerBySelector = function (selector) {
    var layer = []
    var count = 0
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].selector == selector) {
            layer.push(mapView.graphics.items[i])
        }
    }
    count = layer.length
    return count
}

var countLayerByReference = function (reference) {
    var layer = []
    var count = 0
    for (let i = 0; i < mapView.graphics.items.length; i++) {
        if (mapView.graphics.items[i].reference == reference) {
            layer.push(mapView.graphics.items[i])
        }
    }
    count = layer.length
    return count
}