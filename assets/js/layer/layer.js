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
    let results = []
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