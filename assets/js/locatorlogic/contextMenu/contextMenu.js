function createContextMenu(event, condition) {
    let menu = []
    let strMenu = ""
    if (condition.includes("mark")) {
        var pointing = getLayerViewById("pointing")
        if (pointing !== undefined) {
            menu.push('<div id="contextmenu-mark"><i class="mi-room"></i>Mark</div>')
        }
    }
    if (condition.includes("measurement")) {
        menu.push('<div id="contextmenu-measurement"><i class="mi-straighten"></i>Measurement<i class="mi-keyboard-arrow-right"></i></div>')
    }
    if (condition.includes("draw")) {
        menu.push('<div id="contextmenu-analyze-polygon"><i class="mi-bubble-chart"></i>Analyze<i class="mi-keyboard-arrow-right"></i></div>')
    }
    if (condition.includes("remove pointing")) {
        menu.push('<div id="contextmenu-remove-pointing"><i class="esri-icon-trash"></i>Remove Pointing</div>')
    }
    if (condition.includes("configuration")) {
        menu.push('<div id="contextmenu-configuration"><i class="mi-format-list-bulleted"></i>Configuration</div>')
    }
    if (condition.includes("analyze")) {
        menu.push('<div id="contextmenu-analyze"><i class="mi-timeline"></i>Analyze</div>')
    }
    if (condition.includes("view-popup")) {
        menu.push('<div id="contextmenu-view-popup"><i class="mi-speaker-notes"></i>View Popup</div>')
    }
    if (condition.includes("remove")) {
        menu.push('<div id="contextmenu-remove"><i class="esri-icon-trash"></i>Remove</div>')
    }

    for (let i = 0; i < menu.length; i++) {
        strMenu += menu[i]
    }

    let imageWrapper = $('<div class="contextmenu">')
        .css({
            "left": event.x + 'px',
            "top": event.y + 50 + 'px'
        })
        .append($(
            strMenu
        ))
    $('<div style="float:left" class="contextmenu-container">')
        .css({
            "width": "auto",
            "height": "auto"
        })
        .append($(imageWrapper))
        .appendTo(document.body);

    if ($('.contextmenu').length) {
        var elem = $('.contextmenu'),
            top = elem.offset().top,
            left = elem.offset().left,
            width = elem.width(),
            height = elem.height()
        if (left + width > $("#mapDiv").width()) {
            $(elem).css("left", event.x - 150)
        }
        if (top + height > $("#mapDiv").height()) {
            $(elem).css("top", event.y - 10)
        }
    }
}

$(document).on('mouseenter mouseleave', "#contextmenu-mark", function (event) {
    if ($("#subcontextmenum").length) {
        $("#subcontextmenum").remove()
    }
    if ($("#subcontextmenud").length) {
        $("#subcontextmenud").remove()
    }
})

function analyzeHover(condition) {
    $(document).on('mouseenter mouseleave', "#contextmenu-analyze-polygon", function (event) {
        if (event.type === 'mouseenter') {
            if (!hoveredDraw) {
                hoveredDraw = true
                hoveredMeasurement = false
                let container = $(this).parents(".contextmenu-container")
                let position = getPos($(this)[0])
                let x = position.x
                let y = position.y
                let menu = []
                let strMenu = ""
                if (condition.includes("radius")) {
                    menu.push('<div id="contextmenu-radius"><i class="mi-donut-large"></i>Radius</div>')
                }
                if (condition.includes("drivingtime")) {
                    menu.push('<div id="contextmenu-driving-time"><i class="mi-access-alarms"></i>Driving Time</div>')
                }
                if (condition.includes("drivingdistance")) {
                    menu.push('<div id="contextmenu-driving-distance"><i class="mi-refresh"></i>Driving Distance</div>')
                }
                if (condition.includes("manual")) {
                    menu.push('<div id="contextmenu-manual"><i class="mi-mode-edit"></i>Manual</div>')
                }

                for (let i = 0; i < menu.length; i++) {
                    strMenu += menu[i]
                }
                $(container).append("<div style='position:absolute;' id='subcontextmenud'>")
                $("#subcontextmenud").css({
                    "left": x + 110 + 'px',
                    "top": y - 5 + 'px'
                }).append($(strMenu))
                if ($('#subcontextmenud').length) {
                    var elem = $('#subcontextmenud'),
                        top = elem.offset().top,
                        left = elem.offset().left,
                        width = elem.width(),
                        height = elem.height()
                    if (left + width > $("#mapDiv").width()) {
                        $(elem).css("left", x - 130 + 'px')
                    }
                    if (top + height > $("#mapDiv").height()) {
                        $(elem).css("top", y - 70 + 'px')
                    }
                }
                //Switch condition 
                if ($("#subcontextmenum").length) {
                    $("#subcontextmenum").remove()
                }
            }
        }
        changeModelContextMenu()
    });
}

function measurementHover(condition) {
    $(document).on('mouseenter mouseleave', "#contextmenu-measurement", function (event) {
        if (event.type === 'mouseenter') {
            if (!hoveredMeasurement) {
                hoveredMeasurement = true
                hoveredDraw = false
                let container = $(this).parents(".contextmenu-container")
                let position = getPos($(this)[0])
                let x = position.x
                let y = position.y
                let menu = []
                let strMenu = ""
                if (condition.includes("point")) {
                    menu.push('<div id="contextmenu-point"><i class="mi-fiber-manual-record"></i>Point</div>')
                }
                if (condition.includes("polygon")) {
                    menu.push('<div id="contextmenu-polygon"><i class="mi-crop-square"></i>Polygon</div>')
                }
                if (condition.includes("polyline")) {
                    menu.push('<div id="contextmenu-polyline"><i class="mi-show-chart"></i>Polyline</div>')
                }
                if (condition.includes("rectangle")) {
                    menu.push('<div id="contextmenu-rectangle"><i class="mi-crop-16-9"></i>Rectangle</div>')
                }
                for (let i = 0; i < menu.length; i++) {
                    strMenu += menu[i]
                }
                $(container).append("<div style='position:absolute;' id='subcontextmenum'>")
                $("#subcontextmenum").css({
                    "left": x + 110 + 'px',
                    "top": y - 5 + 'px'
                }).append($(strMenu))
                if ($('#subcontextmenum').length) {
                    var elem = $('#subcontextmenum'),
                        top = elem.offset().top,
                        left = elem.offset().left,
                        width = elem.width(),
                        height = elem.height()
                    if (left + width > $("#mapDiv").width()) {
                        $(elem).css("left", x - 130 + 'px')
                    }
                    if (top + height > $("#mapDiv").height()) {
                        $(elem).css("top", y - 70 + 'px')
                    }
                }
                //Switch condition 
                if ($("#subcontextmenud").length) {
                    $("#subcontextmenud").remove()
                }
            }
        }
        changeModelContextMenu()
    });
}

function getPos(el) {
    for (var lx = 0, ly = 0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return { x: lx, y: ly };
}

function closeContextMenu() {
    $('body').click(function (evt) {
        $(".contextmenu-container").remove()
    });
}

function resetContextMenu() {
    $(".contextmenu").remove()
    $("#subcontextmenum").remove()
    $("#subcontextmenud").remove()
    hoveredMeasurement = false
    hoveredDraw = false
}

function changeModelContextMenu() {
    $(".contextmenu").css("background-color", sessionStorage.getItem("colorTheme"))
    $(".contextmenu").css("color", "white")
    $("#subcontextmenum").css("background-color", sessionStorage.getItem("colorTheme"))
    $("#subcontextmenum").css("color", "white")
    $("#subcontextmenud").css("background-color", sessionStorage.getItem("colorTheme"))
    $("#subcontextmenud").css("color", "white")
}

$(document).delegate("#contextmenu-mark", "click", function () {
    contextMenuClickMark()
    resetContextMenu()
})

$(document).on('mouseenter mouseleave', "#contextmenu-mark", function (event) {
    if (event.type === 'mouseenter') {
        hoveredMeasurement = false
        hoveredDraw = false
    }
})

$(document).delegate("#contextmenu-polygon", "click", function () {
    resetContextMenu()
    var measurePolygon = new ESRI.AreaMeasurement2D({
        view: mapView
    });
    measurePolygon.viewModel.newMeasurement();
    measurePolygon.watch("viewModel.state", function (state) {
        if (state == "measured") {
            map.removeAll()
            var count = countLayerBySelector("polygon")
            createPolygon(measurePolygon.viewModel.measurement.geometry, "polygon", "polygon-" + count, "polygon")
            createLabel(measurePolygon.viewModel.measurement.geometry, "label", "polygon-" + count, "polygon-" + count + ": " + Number(measurePolygon.viewModel.measurement.area).toFixed(2) + " km²", "polygon")
            appendDataLayerGraphics()
            measurePolygon.destroy()
        }
    })
})

$(document).delegate("#contextmenu-polyline", "click", function () {
    resetContextMenu()
    var measureDistance = new ESRI.DistanceMeasurement2D({
        view: mapView
    });
    measureDistance.viewModel.newMeasurement();
    measureDistance.watch("viewModel.state", function (state) {
        if (state == "measured") {
            map.removeAll()
            var count = countLayerBySelector("polyline")
            createPolyline(measureDistance.viewModel.measurement.geometry, "polyline", "polyline-" + count, "polyline")
            createLabel(measureDistance.viewModel.measurement.geometry, "label", "polyline-" + count, "polyline-" + count + ": " + Number(measureDistance.viewModel.measurement.length / 1000).toFixed(2) + " km²", "polyline")
            appendDataLayerGraphics()
            measureDistance.destroy()
        }
    })
})

$(document).delegate("#contextmenu-radius", "click", function () {
    resetContextMenu()
    sketch.create("circle", { mode: "hybrid" })
    sketch.on("create", function (event) {
        if (event.state === "complete") {
            map.removeAll()
            var count = countLayerBySelector("buffer")
            createPolygon(event.graphic.geometry, "buffer", "buffer-" + count, "buffer")
            createLabel(event.graphic.geometry, "label", "buffer-" + count, "buffer-" + count, "buffer")
            appendDataLayerGraphics()
            createSketch()
        }
    })
})

$(document).delegate("#contextmenu-driving-time", "click", function () {
    resetContextMenu()
    fillParameterDrivingTime()
})

$(document).delegate("#contextmenu-driving-distance", "click", function () {
    resetContextMenu()
    fillParameterDrivingDistance()
})