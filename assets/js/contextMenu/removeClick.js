function removeClick(map) {
    $(document).delegate("#contextmenu-remove", "click", function () {
        $('.image-wrapper-a').remove() //Remove context menu
        let selectedLayer = JSON.parse(getLocalStorage("selectedLayer", []))
        for (let s = 0; s < groupLayers.length; s++) {
            for (let i = 0; i < selectedLayer.length; i++) {
                for (let j = 0; j < groupLayers[s].layers.items.length; j++) {
                    if (groupLayers[s].layers.items[j].id == selectedLayer[i]) {
                        groupLayers[s].layers.items[j].visible = false
                        groupLayers[s].layers.items.splice(j, 1)
                    }
                }
            }
        }
        console.log(groupLayers)
        sort(map, "polygons", "dynamic-polygon-")
    })
}