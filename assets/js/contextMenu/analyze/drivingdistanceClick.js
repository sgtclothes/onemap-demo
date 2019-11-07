var drivingdistanceClick = function (map) {
    $(document).delegate("#contextmenu-driving-distance", "click", function () {
        $(".image-wrapper-a").remove()
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        createDrivingDistance(map)
    })
}