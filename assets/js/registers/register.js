var sortID = function (map, layer, id) {
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == layer) {
            for (let j = 0; j < map.ObjMap.layers.items[i].layers.items.length; j++) {
                map.ObjMap.layers.items[i].layers.items[j].id = id + (j + 1)
            }
        }
    }
}

var sortTitle = function (map, layer, title) {
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == layer) {
            for (let j = 0; j < l.layers.items.length; j++) {
                map.ObjMap.layers.items[i].layers.items[j].title = title
            }
        }
    }
}

var registerAttributes = function (map, layer, attributes, cursor) {
    if (typeof cursor == "number") {
        for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
            if (map.ObjMap.layers.items[i].id == layer) {
                for (let j = 0; j < map.ObjMap.layers.items[i].layers.items.length; j++) {
                    console.log(map.ObjMap.layers.items[i].layers.items[j].graphics.items[cursor])
                    map.ObjMap.layers.items[i].layers.items[j].graphics.items[cursor].selector = attributes
                }
            }
        }
    } else if (cursor == "*") {
        for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
            if (map.ObjMap.layers.items[i].id == layer) {
                for (let j = 0; j < map.ObjMap.layers.items[i].layers.items.length; j++) {
                    for (let k = 0; k < map.ObjMap.layers.items[i].layers.items[j].graphics.items.length; k++) {
                        map.ObjMap.layers.items[i].layers.items[j].graphics.items[k].selector = attributes
                    }
                }
            }
        }
    }
}

var removeEmptyLayer = function (map, layer) {
    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
        if (map.ObjMap.layers.items[i].id == layer) {
            for (let j = 0; j < map.ObjMap.layers.items[i].layers.items.length; j++) {
                if (map.ObjMap.layers.items[i].layers.items[j].graphics.items.length < 1) {
                    map.ObjMap.layers.items[i].layers.items.splice(j, 1)
                }
            }
        }
    }
}