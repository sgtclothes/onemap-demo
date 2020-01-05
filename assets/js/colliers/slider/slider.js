$(document).delegate(".analyze-polygon", "change", function () {
    if ($(this).val() == "buffer") {
        $(".screen-component-map").remove()
        createInfoPointing()
    } else if ($(this).val() == "driving-time") {
        $(".screen-component-map").remove()
        fillParameterDrivingTime()
    } else if ($(this).val() == "driving-distance") {
        $(".screen-component-map").remove()
        fillParameterDrivingDistance()
    }
})

$(document).delegate("#slider-radius", "input change", function () {
    var rad = document.getElementById("slider-buffer-radius");
    var area = document.getElementById("slider-buffer-area");
    var areaCal = Math.PI * Number($(this).val()) * Number($(this).val())
    rad.innerHTML = $(this).val();
    area.innerHTML = areaCal.toFixed(2)
    startCreatingCircle($(this).val(), "kilometers");
});

var startCreatingCircle = function (radius, unit) {
    var circle = new ESRI.Circle({
        center: [
            localStorage.getItem("livePointingLongitude"),
            localStorage.getItem("livePointingLatitude")
        ],
        geodesic: true,
        radius: radius,
        radiusUnit: unit,
        spatialReference: { wkid: 3857 }
    });

    var fillSymbol = defaultSymbolGraphics();
    var graphic = new ESRI.Graphic({
        geometry: circle,
        symbol: fillSymbol,
        selector: "buffer-slider",
        id: "buffer-slider"
    });

    var pointing = getLayerViewById("buffer-slider")

    if (pointing) {
        mapView.graphics.remove(pointing)
        mapView.graphics.add(graphic);
    } else {
        mapView.graphics.add(graphic);
    }
};

$(document).delegate("#slider-radius-submit", "click", function () {
    var val = Number($("#slider-buffer-radius").text())
    var buffer = getLayerViewById("buffer-slider")
    var pointing = getLayerViewById("pointing")
    var geometry = buffer.geometry

    var polygon = new ESRI.Polygon({
        rings: geometry.rings,
        spatialReference: { wkid: 4326 }
    })

    createPolygon(polygon, "buffer", $("#name-buffer").text(), "buffer")
    createLabel(polygon, "label", $("#name-buffer").text(), $("#name-buffer").text() + " : " + val + " km", "buffer")
    $("#name-buffer").text()
    appendDataLayerGraphics()

    mapView.graphics.remove(buffer)
    mapView.graphics.remove(pointing)

    $(".screen-component-map").remove()
    $("#current-point").text("None")
})

$(document).delegate("#slider-buffer-radius[contenteditable=true],#slider-buffer-area[contenteditable=true]", "keypress", function (e) {
    if (!isNumberKey($(this).text(), e)) e.preventDefault()
});

$(document).delegate("#name-buffer[contenteditable=true]", "keydown", function (e) {
    if (e.keyCode == 13) {
        $("#slider-radius").val($("#slider-buffer-radius").text())
        startCreatingCircle(Number($("#slider-buffer-radius").text()), "kilometers")
        $(this).blur();
        if (Number($("#slider-radius").val()) > 0) {
            $("#slider-radius-submit").click()
        }
        return false;
    }
});

$(document).delegate("#slider-buffer-radius[contenteditable=true]", "keydown", function (e) {
    if (e.keyCode == 13) {
        if ($(this).text() == ".") {
            $(this).text(0)
        }
        if (Number($(this).text()) > 100) {
            $(this).text(100)
        }
        var area = Math.PI * Number($(this).text()) * Number($(this).text())
        $("#slider-buffer-area").text(area.toFixed(2))
        $("#slider-radius").val($("#slider-buffer-radius").text())
        startCreatingCircle(Number($(this).text()), "kilometers")
        $(this).blur();
        if (Number($("#slider-radius").val()) > 0) {
            $("#slider-radius-submit").click()
        }
        return false;
    }
});

$(document).delegate("#slider-buffer-area[contenteditable=true]", "keydown", function (e) {
    if (e.keyCode == 13) {
        if ($(this).text() == ".") {
            $(this).text(0)
        }
        var radius = Math.sqrt(Number($(this).text()) / Math.PI)
        $("#slider-buffer-radius").text(radius.toFixed(2))
        if (Number($("#slider-buffer-radius").text()) > 100) {
            $("#slider-buffer-radius").text(100)
            var areaCorrection = Math.PI * 100 * 100
            $(this).text(areaCorrection.toFixed(2))
        }
        $("#slider-radius").val($("#slider-buffer-radius").text())
        startCreatingCircle(radius, "kilometers")
        $(this).blur();
        if (Number($("#slider-radius").val()) > 0) {
            $("#slider-radius-submit").click()
        }
        return false;
    }
});

$(document).delegate("#slider-buffer-radius[contenteditable=true]", "blur", function () {
    if (/\s/.test($(this).text())) {
        $(this).text(0)
    } else if ($(this).text() == "") {
        $(this).text(0)
    }
    var area = Math.PI * Number($(this).text()) * Number($(this).text())
    $("#slider-buffer-area").text(area.toFixed(2))
    $("#slider-radius").val($("#slider-buffer-radius").text())
    startCreatingCircle($("#slider-radius").val(), "kilometers")

})

$(document).delegate("#slider-buffer-area[contenteditable=true]", "blur", function () {
    if (/\s/.test($(this).text())) {
        $(this).text(0)
    } else if ($(this).text() == "") {
        $(this).text(0)
    }
    var radius = Math.sqrt(Number($(this).text()) / Math.PI)
    $("#slider-buffer-radius").text(radius.toFixed(2))
    $("#slider-radius").val($("#slider-buffer-radius").text())
    startCreatingCircle(radius, "kilometers")
})

var nameBuffer = "name-buffer"
$(document).delegate('#' + nameBuffer, "keydown", function (e) {
    check_charcount(nameBuffer, 10, e)
})

var sliderBufferRadius = "slider-buffer-radius"
$(document).delegate('#' + sliderBufferRadius, "keydown", function (e) {
    check_charcount(sliderBufferRadius, 18, e)
})

var sliderBufferArea = "slider-buffer-area"
$(document).delegate('#' + sliderBufferArea, "keydown", function (e) {
    check_charcount(sliderBufferArea, 18, e)
})