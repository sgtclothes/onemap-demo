function removeClick(map) {
    $(document).delegate("#contextmenu-remove", "click", function () {
        $('.image-wrapper-a').remove() //Remove context menu
        let selectedLayer = JSON.parse(getLocalStorage("selectedLayer", []))
        for (let s = 0; s < groupLayers.length; s++) {
            for (let i = 0; i < selectedLayer.length; i++) {
                for (let j = 0; j < groupLayers[s].layers.items.length; j++) {
                    if (groupLayers[s].layers.items[j].id == selectedLayer[i]) {
                        let key = groupLayers[s].layers.items[j].id.split("-")

                        let index = selectedLayer.indexOf(groupLayers[s].layers.items[j].id)
                        selectedLayer.splice(index, 1)
                        setLocalStorage("selectedLayer", JSON.stringify(selectedLayer))

                        groupLayers[s].layers.items[j].visible = false
                        groupLayers[s].layers.items.splice(j, 1)

                        if (key[1] == "buffer") {
                            sortID(map, "radius", "dynamic-buffer-")
                        }
                        if (key[1] == "polygon") {
                            sortID(map, "polygons", "dynamic-polygon-")
                        }
                        if (key[0] == "point") {
                            sortID(map, "points", "point-")
                        }
                        if (key[0] == "rectangle") {
                            sortID(map, "rectangles", "rectangle-")
                        }
                        if (key[1] == "time") {
                            sortID(map, "driving-time", "drive-time-")
                        }
                        if (key[1] == "distance") {
                            sortID(map, "driving-distance", "drive-distance-")
                        }
                    }
                }
            }
        }
        console.log(map.ObjMap)
    })
}