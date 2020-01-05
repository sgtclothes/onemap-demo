var setPointing = function (points) {

    var buffer = getLayerViewById("buffer-slider")
    if (buffer) {
        mapView.graphics.remove(buffer)
    }

    var longitude = points["longitude"]
    var latitude = points["latitude"]

    var markerSymbol = {
        type: "picture-marker",
        url: "assets/images/icons/map-marker.png",
        width: "24px",
        height: "24px"
    };

    var point = new ESRI.Point();
    point.longitude = points["longitude"];
    point.latitude = points["latitude"];
    point.x = points["longitude"];
    point.y = points["latitude"];

    localStorage.setItem("livePointingLatitude", latitude);
    localStorage.setItem("livePointingLongitude", longitude);

    var pointing = getLayerViewById("pointing")

    if (pointing !== undefined) {
        mapView.graphics.remove(pointing)
    }

    var pointGraphic = new ESRI.Graphic({
        geometry: point,
        symbol: markerSymbol,
        selector: "pointing",
        id: "pointing"
    });

    mapView.graphics.add(pointGraphic)
    mapView.goTo({
        target: pointGraphic
    })

    appendDataCurrentPointGraphics()
    createInfoPointing()
    getProjectionGeometryPoint(point, "4326", "3854").then(function (results) {
        if (results !== undefined) {
            localStorage.setItem("livePointingX", results.data.geometries[0].x);
            localStorage.setItem("livePointingY", results.data.geometries[0].y);
        } else {
            localStorage.setItem("livePointingX", 0);
            localStorage.setItem("livePointingY", 0);
        }
    })
}

var createInfoPointing = async function () {
    if ($("#hold-pointing").length > 0 || $("#hold-driving-time").length > 0 || $("#hold-driving-distance").length > 0) {
        $("#hold-pointing").remove()
        $("#hold-driving-time").remove()
        $("#hold-driving-distance").remove()
        await addInfoPointing("assets/js/widget/pointing/pointing.html")
    } else {
        await addInfoPointing("assets/js/widget/pointing/pointing.html")
    }
}

var addInfoPointing = function (url) {
    var latitude = localStorage.getItem("livePointingLatitude")
    var longitude = localStorage.getItem("livePointingLongitude")
    var div = document.createElement("DIV")
    div.style.border = "0px"
    div.style.boxShadow = "none"
    div.style.width = "auto"
    div.style.padding = "5px"
    div.style.height = "auto"
    div.style.fontSize = "12px"
    div.style.fontWeight = "bold"
    div.id = "hold-pointing"
    div.className = "screen-component-map"
    mapView.ui.add(div, "bottom-left")
    $.get(url, function (data) {
        $(div).html(data);
        setTextToAllClass(".live-long", Number(limitString(longitude, 18)))
        setTextToAllClass(".live-lat", Number(limitString(latitude, 18)))
        setDefaultNameBuffer()
    });
}

var setDefaultNameBuffer = function () {
    var buffer = getLayerViewBySelector("buffer")
    if (buffer.length < 1) {
        $("#name-buffer").text("buffer-0")
    } else {
        if (checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("polygon", "buffer")).length > 0) {
            $("#name-buffer").text("buffer-" + checkOrderNumbersId(getLayerViewByGraphicsTypeAndSelector("polygon", "buffer"))[0])
        } else {
            $("#name-buffer").text("buffer-" + (Number(buffer.length)))
        }
    }
}

$(document).delegate("div[contenteditable=true]", "keydown", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault()
        $(this).blur()
    }
})

$(document).delegate('.live-lat[contenteditable=true],.live-long[contenteditable=true]', "keydown", function (e) {
    if (e.keyCode == 13) {
        setTextToAllClass("." + $(this).attr("class"), $(this).text())
        var point = []
        if ($(this).attr("class") == "live-long") {
            var liveLat = $(".live-lat")[0]
            mapView.goTo({
                target: [Number($("." + $(this).attr("class")).text()), Number($(liveLat).text())]
            })
            $(this).blur();
            point["latitude"] = Number($(liveLat).text())
            point["longitude"] = Number($(this).text())
        } else if ($(this).attr("class") == "live-lat") {
            var liveLong = $(".live-long")[0]
            mapView.goTo({
                target: [Number($(liveLong).text()), Number($("." + $(this).attr("class")).text())]
            })
            $(this).blur();
            point["latitude"] = Number($(this).text())
            point["longitude"] = Number($(liveLong).text())
        }
        setPointing(point)
        return false;
    }
});

$(document).delegate('.live-lat[contenteditable=true],.live-long[contenteditable=true]', "keypress", function (e) {
    var x = event.charCode || event.keyCode;
    if (isNaN(String.fromCharCode(e.which)) && x != 46 || x === 32 || x === 13 || (x === 46 && event.currentTarget.innerText.includes('.'))) e.preventDefault();
});

var setTextToAllClass = function (className, text) {
    $(className).each(function () {
        $(this).text(text)
    })
}

var liveLat = "live-lat"
$(document).delegate('.' + liveLat, "keydown", function (e) {
    check_charcountClass($(this), 14, e)
})

var liveLong = "live-long"
$(document).delegate('.' + liveLong, "keydown", function (e) {
    check_charcountClass($(this), 14, e)
})