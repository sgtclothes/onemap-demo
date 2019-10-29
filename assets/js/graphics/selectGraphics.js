var ctrlPressed = false;
$(window).keydown(function (evt) {
    if (evt.which == 17) { // ctrl
        ctrlPressed = true;
    }
}).keyup(function (evt) {
    if (evt.which == 17) { // ctrl
        ctrlPressed = false;
    }
});

var selectLayer = function (response) {
    var selectedLayer = JSON.parse(getLocalStorage("selectedLayer", []))
    if (!selectedLayer.includes(response.results[0].graphic.layer.id)) {
        selectedLayer.push(response.results[0].graphic.layer.id)
    }
    setLocalStorage("selectedLayer", JSON.stringify(selectedLayer))
    console.log(JSON.parse(localStorage.getItem("selectedLayer")))
    let symbol = {
        type: "simple-fill",
        color: [255, 0, 0, 0.2],
        outline: {
            color: "#7a7c80",
            width: 2
        }
    }
    if (response.results[0].graphic.selector == "buffer-graphics" || response.results[0].graphic.selector == "polygon-graphics") {
        response.results[0].graphic.symbol = symbol
    } else {
        console.log("Not a polygon")
    }
}

var selectMe = function (mouseButton, response) {
    if (ctrlPressed) {
        if (mouseButton == 0) {
            var selectedLayer = JSON.parse(getLocalStorage("selectedLayer", []))
            if (response.results[0].graphic.selector == "buffer-graphics" || response.results[0].graphic.selector == "polygon-graphics" || response.results[0].graphic.selector == "rectangle-graphics" || response.results[0].graphic.selector == "drivetime-graphics" || response.results[0].graphic.selector == "drivedistance-graphics") {
                if (selectedLayer.includes(response.results[0].graphic.layer.id)) {
                    response.results[0].graphic.symbol = {
                        type: "simple-fill",
                        color: [150, 150, 150, 0.2],
                        outline: {
                            color: "#7a7c80",
                            width: 2
                        }
                    }
                    //Splice results from selected layer
                    let index = selectedLayer.indexOf(response.results[0].graphic.layer.id)
                    selectedLayer.splice(index, 1)
                    setLocalStorage("selectedLayer", JSON.stringify(selectedLayer))
                    console.log(JSON.parse(getLocalStorage("selectedLayer", [])))
                } else {
                    selectLayer(response)
                }
            } else {
                console.log("Not a buffer")
            }
        }
    } else {
        resetSelectedGraphics()
        selectLayer(response)
    }
}

var resetSelectedGraphics = function () {
    setLocalStorage("selectedLayer", "[]")
    for (let s = 0; s < groupLayers.length; s++) {
        for (let i = 0; i < groupLayers[s].layers.items.length; i++) {
            for (let j = 0; j < groupLayers[s].layers.items[i].graphics.items.length; j++) {
                if (groupLayers[s].layers.items[i].graphics.items[j].selector == "buffer-graphics" || groupLayers[s].layers.items[i].graphics.items[j].selector == "polygon-graphics" || groupLayers[s].layers.items[i].graphics.items[j].selector == "rectangle-graphics" || groupLayers[s].layers.items[i].graphics.items[j].selector == "drivetime-graphics" || groupLayers[s].layers.items[i].graphics.items[j].selector == "drivedistance-graphics") {
                    groupLayers[s].layers.items[i].graphics.items[j].symbol = {
                        type: "simple-fill",
                        color: [150, 150, 150, 0.2],
                        outline: {
                            color: "#7a7c80",
                            width: 2
                        }
                    }
                }
            }
        }
    }
}