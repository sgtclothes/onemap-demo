var radiusClick = function (map) {
    $(document).delegate("#contextmenu-radius", "click", function () {
        $(".image-wrapper-a").remove() //Remove context menu
        $("#loading-bar").show()
        let latitude = Number(getLocalStorage("livePointingLatitude", ""))
        let longitude = Number(getLocalStorage("livePointingLongitude", ""))
        let point = new ESRI.Point()
        point.longitude = longitude;
        point.latitude = latitude;
        createDynamicCircle(map, map.ObjMapView.toScreen(point).x, map.ObjMapView.toScreen(point).y)
    })
}