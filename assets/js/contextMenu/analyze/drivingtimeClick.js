var drivingtimeClick = function (map) {
    $(document).delegate("#contextmenu-driving-time", "click", function () {
        $(".image-wrapper-a").remove()
        $("#subcontextmenum").remove()
        $("#subcontextmenud").remove()
        createDrivingTime(map)
    })
}