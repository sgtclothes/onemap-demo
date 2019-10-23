var createSketch = function (map) {
    var graphicsLayer = new ESRI.GraphicsLayer()
    window.sketch = new ESRI.Sketch({
        layer: graphicsLayer,
        view: map.ObjMapView,
        updateOnGraphicClick: false,
        defaultUpdateOptions: {
            enableRotation: false,
            enableScaling: false,
            multipleSelectionEnabled: false,
            preserveAspectRatio: false,
            toggleToolOnClick: false
        }
    });
}