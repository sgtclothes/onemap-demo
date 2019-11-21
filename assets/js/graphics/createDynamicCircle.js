//Testing pointing with dynamic circle
var createDynamicCircle = async function (map, pointX, pointY) {
    let sketchViewModel, pausableWatchHandle;

    let centerGraphic,
        edgeGraphic,
        polylineGraphic,
        bufferGraphic,
        centerGeometryAtStart,
        labelGraphic;

    let layerCounterRadius = getLocalStorage("layerCounterRadius", 0)
    let index = Number(layerCounterRadius) + 1
    setLocalStorage("layerCounterRadius", Number(layerCounterRadius) + 1)
    const unit = "kilometers";

    // Create layers
    const graphicsLayer = new ESRI.GraphicsLayer({
        id: "dynamic-buffer-" + index
    });

    groupLayerRadius.add(graphicsLayer)

    // Update UI
    await setUpSketch();

    pausableWatchHandle = ESRI.watchUtils.pausable(
        map.ObjMapView,
        "updating",
        function (val) {
            if (!val) {
                drawBufferPolygon();
            }
        }
    );

    $("#loading-bar").hide()

    function setUpSketch() {
        sketchViewModel = new ESRI.SketchViewModel({
            view: map.ObjMapView,
            layer: graphicsLayer,
            updateOnGraphicClick: false
        });
        sketchViewModel.on("update", onMove);
    }

    function onMove(event) {
        // If the edge graphic is moving, keep the center graphic
        // at its initial location. Only move edge graphic
        if (event.toolEventInfo && event.toolEventInfo.mover.attributes.edge) {
            const toolType = event.toolEventInfo.type;
            if (toolType === "move-start") {
                centerGeometryAtStart = centerGraphic.geometry;
            }
            // keep the center graphic at its initial location when edge point is moving
            else if (toolType === "move" || toolType === "move-stop") {
                centerGraphic.geometry = centerGeometryAtStart;
            }
        }

        // the center or edge graphic is being moved, recalculate the buffer
        const vertices = [
            [centerGraphic.geometry.x, centerGraphic.geometry.y],
            [edgeGraphic.geometry.x, edgeGraphic.geometry.y]
        ];

        // client-side stats query of features that intersect the buffer
        calculateBuffer(vertices);

        // user is clicking on the view... call update method with the center and edge graphics
        if (event.state === "cancel" || event.state === "complete") {
            sketchViewModel.update([edgeGraphic, centerGraphic], {
                tool: "move"
            });
        }
    }

    function calculateBuffer(vertices) {
        // Update the geometry of the polyline based on location of edge and center points
        polylineGraphic.geometry = new ESRI.Polyline({
            paths: vertices,
            spatialReference: map.ObjMapView.spatialReference
        });

        // Recalculate the polyline length and buffer polygon
        const length = ESRI.geometryEngine.geodesicLength(
            polylineGraphic.geometry,
            unit
        );
        const buffer = ESRI.geometryEngine.geodesicBuffer(
            centerGraphic.geometry,
            length,
            unit
        );

        // Update the buffer polygon
        bufferGraphic.geometry = buffer;

        // Update label graphic to show the length of the polyline
        labelGraphic.geometry = edgeGraphic.geometry;
        labelGraphic.symbol = {
            type: "text",
            color: "#000000",
            text: length.toFixed(2) + " kilometers",
            xoffset: 50,
            yoffset: 10,
            font: {
                // autocast as Font
                size: 14,
                family: "sans-serif"
            }
        };
    }

    function drawBufferPolygon() {
        // When pause() is called on the watch handle, the callback represented by the
        // watch is no longer invoked, but is still available for later use
        // this watch handle will be resumed when user searches for a new location
        pausableWatchHandle.pause();

        // Initial location for the center, edge and polylines on the view
        const centerPoint = map.ObjMapView.toMap({
            x: pointX,
            y: pointY
        });
        const edgePoint = map.ObjMapView.toMap({
            x: pointX + 10,
            y: pointY - 5
        });

        // Store updated vertices
        const vertices = [
            [centerPoint.x, centerPoint.y],
            [edgePoint.x, edgePoint.y]
        ];

        // Create center, edge, polyline and buffer graphics for the first time
        if (!centerGraphic) {
            const polyline = new ESRI.Polyline({
                paths: vertices,
                spatialReference: map.ObjMapView.spatialReference
            });

            var template = {};

            // get the length of the initial polyline and create buffer
            const length = ESRI.geometryEngine.geodesicLength(polyline, unit);
            const buffer = ESRI.geometryEngine.geodesicBuffer(
                centerPoint,
                length,
                unit
            );

            // Create the graphics representing the line and buffer
            const pointSymbol = {
                type: "simple-marker",
                style: "circle",
                size: 10,
                color: [122, 124, 128, 0.5]
            };

            centerGraphic = new ESRI.Graphic({
                geometry: centerPoint,
                symbol: pointSymbol,
                attributes: {
                    center: "center"
                },
                popupTemplate: template
            });

            edgeGraphic = new ESRI.Graphic({
                geometry: edgePoint,
                symbol: pointSymbol,
                attributes: {
                    edge: "edge"
                },
                popupTemplate: template
            });

            polylineGraphic = new ESRI.Graphic({
                geometry: polyline,
                symbol: {
                    type: "simple-line",
                    color: [122, 124, 128, 1],
                    width: 2.5
                },
                popupTemplate: template
            });

            bufferGraphic = new ESRI.Graphic({
                selector: "buffer-graphics",
                geometry: buffer,
                popupTemplate: template,
                symbol: defaultSymbolGraphics()
            });

            labelGraphic = labelLength(edgePoint, length);

            // Add graphics to layer
            graphicsLayer.addMany([centerGraphic, edgeGraphic, polylineGraphic, labelGraphic, bufferGraphic]);
            // once center and edge point graphics are added to the layer,
            // call sketch's update method pass in the graphics so that users
            // can just drag these graphics to adjust the buffer
            setTimeout(function () {
                sketchViewModel.update([edgeGraphic, centerGraphic], {
                    tool: "move"
                });
            }, 1000);
        }
        // Move the center and edge graphics to the new location returned from search
        else {
            centerGraphic.geometry = centerPoint;
            edgeGraphic.geometry = edgePoint;
        }

        // Query features that intersect the buffer
        calculateBuffer(vertices);
    }

    // Label polyline with its length
    function labelLength(geom, length) {
        var template = {};
        return new ESRI.Graphic({
            attributes: "label-graphics",
            geometry: geom,
            symbol: {
                type: "text",
                color: "#000000",
                text: length.toFixed(2) + " kilometers",
                xoffset: 50,
                yoffset: 10,
                font: {
                    // autocast as Font
                    size: 14,
                    family: "sans-serif"
                }
            },
            popupTemplate: template
        });
    }
}