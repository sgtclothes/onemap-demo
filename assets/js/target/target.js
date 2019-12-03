var createTargetPoint = function (map) {
    var mapDiv = $("#mapDiv");
    var offset = $(mapDiv).offset();
    var width = $(mapDiv).width();
    var height = $(mapDiv).height();

    var centerX = offset.left + width / 2;
    var centerY = offset.top + height / 2;

    $(mapDiv).append("<img id='target-map' src='assets/images/icons/cross-shaped-target.png' style='width: 15px; height: 15px; position: absolute; pointer-events:none; left:" + centerX + "px; top:" + centerY + "px;'>")

    $("#target-map").click(function (e) {
        e.stopPropagation();
    });

    var container = document.querySelector("#mapDiv");
    new ResizeSensor(container, function () {
        if ($("#target-map").length > 0) {
            $("#target-map").remove()
            var mapDiv = $("#mapDiv");
            var offset = $(mapDiv).offset();
            var width = $(mapDiv).width();
            var height = $(mapDiv).height();
            var centerX = offset.left + width / 2;
            var centerY = offset.top + height / 2;
            $(mapDiv).append("<img id='target-map' src='assets/images/icons/cross-shaped-target.png' style='width: 15px; height: 15px; position: fixed; pointer-events:none; left:" + centerX + "px; top:" + centerY + "px;'>")
        }
    });

}