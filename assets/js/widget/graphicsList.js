function addGraphicsList() {
    var div = document.createElement("DIV")
    div.style.border = "0px"
    div.style.boxShadow = "none"
    div.style.backgroundColor = "white"
    div.style.width = "auto"
    div.style.padding = "5px"
    div.style.height = "auto"
    div.style.fontSize = "12px"
    div.style.fontWeight = "bold"
    $.get("assets/js/widget/graphicsList/graphicsList.html", function (data) {
        $(div).html(data);
        $(".title-graphics").css("background-color", sessionStorage.getItem("colorTheme"))
    });

    window.graphicsListExpand = new ESRI.Expand({
        view: mapView,
        content: div,
        expandIconClass: "esri-icon-layers",
        collapseIconClass: "esri-icon-close"
    });

    mapView.ui.add(graphicsListExpand, "top-right")
}

function appendDataCurrentPointGraphics() {
    var pointing = getLayerViewById("pointing")
    if (pointing !== undefined) {
        $("#current-point").empty()
        $.get("assets/js/widget/pointing/pointing.html", function (data) {
            $("#current-point").append(data);
        });
    } else {
        $("#current-point").text("None")
    }
}

function appendDataLayerGraphics() {
    var graphics = getLayerViewByGroup("layer")
    console.log(graphics)
    if (graphics.length > 0) {
        $("#layers").empty()
        $("#layers").css("padding-left", "0px")
        for (let i = 0; i < graphics.length; i++) {
            //--- Visible state
            var visibleState = graphics[i].visible
            var visibleClass = "esri-icon-visible"
            if (visibleState) {
                visibleClass = "esri-icon-visible"
            } else {
                visibleClass = "esri-icon-non-visible"
            }
            //--- End of Visible State
            //--- Selected state
            var checkState = ""
            if (graphics[i].symbol.color.r == 255 && graphics[i].symbol.color.g == 0 && graphics[i].symbol.color.b == 0) {
                checkState = "checked"
            }
            //--- End of selected state
            $("#layers").prepend("<div class='dragdrop item-graphic-border' style='height:25px;'><input " + checkState + " class='styled' type='checkbox' name='select-graphic'><label><span></span></label><div id='" + graphics[i].id + "' class='item-graphic " + graphics[i].id + "'></div><i class='esri-icon-trash remove-item'></i><i class='" + visibleClass + " visible-item'></i></div></div>")
            $(".item-graphic-border").css("border", "1px solid " + sessionStorage.getItem("colorTheme"))
            for (let j = 0; j < $(".item-graphic-border").length; j++) {
                var item = $(".item-graphic-border")[j]
                if ($(item).find("i.edit-item").length < 1) {
                    if (graphics[i].id.split("-")[0] == "buffer") {
                        $(item).append("<i class='esri-icon-edit edit-item'></i>")
                    }
                }
            }
            $("." + graphics[i].id).attr("title", graphics[i].name)
            $("." + graphics[i].id).text(limitString(graphics[i].name, 8, "..."))
        }
        enableDragDrop()
    } else {
        $("#layers").text("None")
    }
}

$(document).delegate(".item-graphic", "click", function () {
    var type = $(this).attr("id").split("-")[0]
    var selectedType = "polygon"
    if (type == "buffer" || type == "search" || type == "polygon") {
        selectedType = "polygon"
    } else if (type == "marker") {
        selectedType = "marker"
    } else if (type == "polyline") {
        selectedType = "polyline"
    }
    $(this).prev().prev().trigger("click")
    var graphic = getLayerViewByGraphicsTypeAndId(selectedType, $(this).attr("id"))
    mapView.goTo({
        target: graphic
    })
})

$(document).delegate("[name='select-graphic']", "click", function () {
    var type = $(this).next().next().attr("id").split("-")[0]
    var selectedType = "polygon"
    if (type == "buffer" || type == "search" || type == "polygon") {
        selectedType = "polygon"
    } else if (type == "marker") {
        selectedType = "marker"
    } else if (type == "polyline") {
        selectedType = "polyline"
    }
    var graphic = getLayerViewByGraphicsTypeAndId(selectedType, $(this).next().next().attr("id"))
    selectGraphic(graphic, $(this))
})

$(document).delegate(".remove-item", "click", function () {
    $(".screen-component-map").remove()
    var pointing = getLayerViewById("pointing")
    if (pointing !== undefined) {
        mapView.graphics.remove(pointing)
    }
    var id = $(this).prev().attr("id")
    var graphic = getLayerViewById(id)
    var name = graphic.name
    var type = id.split("-")[0]
    var selectedType = "polygon"
    Swal.fire({
        title: 'Are you sure? tou want to delete &nbsp; <strong>' + name + "</strong> ?",
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Graphic has been deleted.',
                'success'
            )
            if (graphic !== undefined) {
                if (type == "buffer" || type == "search" || type == "polygon") {
                    selectedType = "polygon"
                } else if (type == "marker") {
                    selectedType = "marker"
                } else if (type == "polyline") {
                    selectedType = "polyline"
                }
                graphic = getLayerViewByGraphicsTypeAndName(selectedType, name)
                var label = getLayerViewByGraphicsTypeAndName("text", name)
                mapView.graphics.remove(graphic[0])
                mapView.graphics.remove(label[0])
                $("#layers").css("padding-left", "10px")
                appendDataLayerGraphics()
            }
        }
    })
})

$(document).delegate(".visible-item", "click", function () {
    var id = $(this).prev().prev().attr("id")
    console.log(id)
    var type = id.split("-")[0]
    var selectedType = "polygon"
    var graphic = getLayerViewById(id)
    var name = graphic.name
    if ($(this).hasClass("esri-icon-visible")) {
        if (graphic !== undefined) {
            if (type == "buffer" || type == "search" || type == "polygon") {
                selectedType = "polygon"
            } else if (type == "marker") {
                selectedType = "marker"
            } else if (type == "polyline") {
                selectedType = "polyline"
            }
            graphic = getLayerViewByGraphicsTypeAndName(selectedType, name)
            var label = getLayerViewByGraphicsTypeAndName("text", name)
            graphic[0].visible = false
            label[0].visible = false
        }
        $(this).removeClass("esri-icon-visible").addClass("esri-icon-non-visible")
    } else if ($(this).hasClass("esri-icon-non-visible")) {
        if (graphic !== undefined) {
            if (type == "buffer" || type == "search" || type == "polygon") {
                selectedType = "polygon"
            } else if (type == "marker") {
                selectedType = "marker"
            } else if (type == "polyline") {
                selectedType = "polyline"
            }
            graphic = getLayerViewByGraphicsTypeAndName(selectedType, name)
            var label = getLayerViewByGraphicsTypeAndName("text", name)
            graphic[0].visible = true
            label[0].visible = true
        }
        $(this).removeClass("esri-icon-non-visible").addClass("esri-icon-visible")
    }
})

$(document).delegate(".edit-item", "click", function () {
    var id = $(this).prev().prev().prev().attr("id")
    var graphic = getLayerViewById(id)
    Projection.load().then(function () {
        var outSpatialReference = new ESRI.SpatialReference({
            wkid: 3857
        });
        graphic.geometry = Projection.project(graphic.geometry, outSpatialReference);
        graphicsLayer.add(graphic)
        map.add(graphicsLayer)
        sketch.update([graphic], {
            tool: "reshape",
            enableRotation: true,
            enableScaling: true,
            preserveAspectRatio: true,
            toggleToolOnClick: false
        })
        sketch.on("update", function (event) {
            if (event.state == "complete") {
                var graphicTemp = []
                var labelTemp = []
                var name = getLayerViewByGraphicsTypeAndReference("text", id)[0].name
                var text = getLayerViewByGraphicsTypeAndReference("text", id)[0].symbol.text
                var reference = getLayerViewByGraphicsTypeAndReference("text", id)[0].reference
                mapView.graphics.remove(graphic)
                mapView.graphics.remove(getLayerViewByGraphicsTypeAndReference("text", id)[0])
                for (let i = 0; i < map.layers.items.length; i++) {
                    for (let j = 0; j < map.layers.items[i].graphics.items.length; j++) {
                        graphicTemp.push(map.layers.items[i].graphics.items[j])
                    }
                }
                mapView.graphics.add(graphicTemp[0])
                createLabel(graphicTemp[0], "label", name, text, reference)
                map.removeAll()
                console.log(mapView)
            }
        })
    })
})

function selectGraphic(layer, input) {
    var selectedSymbol = {}
    if (layer[0].gType == "polygon") {
        if ($(input).prop("checked") == true) {
            selectedSymbol = {
                type: "simple-fill",
                color: [255, 0, 0, 0.5],
                style: "solid",
                outline: {
                    type: "simple-line",
                    width: 0.5,
                    style: "solid",
                    color: [122, 124, 128, 1]
                }
            }
        } else if ($(input).prop("checked") == false) {
            selectedSymbol = {
                type: "simple-fill",
                color: [255, 255, 255, 0.5],
                style: "solid",
                outline: {
                    type: "simple-line",
                    width: 0.5,
                    style: "solid",
                    color: [122, 124, 128, 1]
                }
            }
        }
    } else if (layer[0].gType == "marker") {
        if ($(input).prop("checked") == true) {
            selectedSymbol = {
                type: "simple-marker",
                color: [255, 0, 0],
                style: "circle",
            }
        } else if ($(input).prop("checked") == false) {
            selectedSymbol = {
                type: "simple-marker",
                color: [255, 255, 255],
                style: "circle",
            }
        }
    } else if (layer[0].gType == "polyline") {
        if ($(input).prop("checked") == true) {
            selectedSymbol = {
                type: "simple-line",
                color: [255, 0, 0],
                style: "solid",
            }
        } else if ($(input).prop("checked") == false) {
            selectedSymbol = {
                type: "simple-line",
                color: [255, 255, 255],
                style: "solid",
            }
        }
    }
    layer[0].symbol = selectedSymbol
}


function enableDragDrop() {
    jQuery.fn.swap = function (b) {
        b = jQuery(b)[0];
        var a = this[0];
        var id1 = $(a).find(".item-graphic").attr("id")
        var id2 = $(b).find(".item-graphic").attr("id")

        console.log(id1)
        console.log(id2)

        var layer1 = getLayerViewByReference(id1)
        var layer2 = getLayerViewByReference(id2)
        var index1 = getLayerViewIndexByReference(id1)
        var index2 = getLayerViewIndexByReference(id2)

        console.log(layer1)
        console.log(layer2)
        console.log(index1)
        console.log(index2)

        mapView.graphics.remove(layer1[0])
        mapView.graphics.remove(layer1[1])
        mapView.graphics.remove(layer2[0])
        mapView.graphics.remove(layer2[1])

        mapView.graphics.add(layer1[0], index2[0])
        mapView.graphics.add(layer1[1], index2[1])
        mapView.graphics.add(layer2[0], index1[0])
        mapView.graphics.add(layer2[1], index1[1])

        mapView.extent = mapView.extent

        var t = a.parentNode.insertBefore(document.createTextNode(''), a);
        b.parentNode.insertBefore(a, b);
        t.parentNode.insertBefore(b, t);
        t.parentNode.removeChild(t);
        return this;
    };

    $(".dragdrop").draggable({ revert: true, helper: "clone" });
    $(".dragdrop").droppable({
        accept: ".dragdrop",
        activeClass: "ui-state-hover",
        hoverClass: "ui-state-active",
        drop: function (event, ui) {

            var draggable = ui.draggable, droppable = $(this),
                dragPos = draggable.position(), dropPos = droppable.position();

            draggable.css({
                left: dropPos.left + 'px',
                top: dropPos.top + 'px'
            });

            droppable.css({
                left: dragPos.left + 'px',
                top: dragPos.top + 'px'
            });
            draggable.swap(droppable);
        }
    });
}