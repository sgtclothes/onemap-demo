function mapViewClick(map) {
    map.ObjMapView.on("click", function (event) {
        $(".image-wrapper-a").remove()
        let point = new ESRI.Point(event.x, event.y)
        if (event.button == 0) {
            map.ObjMapView.hitTest(point).then(function (response) {
                getGraphicsInfo(response, map)
            });
        } else if (event.button == 2) {
            var selectedLayer = JSON.parse(localStorage.getItem("selectedLayer"))
            map.ObjMapView.hitTest(point).then(function (response) {
                if (response.results.length > 0 && (response.results[0].graphic.attributes == "buffer-graphics" || response.results[0].graphic.attributes == "polygon-graphics")) {
                    selectLayer(response)
                    createContextMenu(map, event, condition = ["analyze", "remove"])
                } else {
                    if (selectedLayer.length > 0) {
                        createContextMenu(map, event, condition = ["analyze", "remove"])
                    } else {
                        createContextMenu(map, event, condition = ["radius", "polygon", "drivingtime"])
                    }
                }
            })
        }
    })
}