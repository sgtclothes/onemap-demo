var createSketch = function () {
    window.graphicsLayer = new ESRI.GraphicsLayer()
    window.sketch = new ESRI.SketchViewModel({
        layer: graphicsLayer,
        view: mapView,
        updateOnGraphicClick: true,
        defaultUpdateOptions: {
            enableRotation: true,
            enableScaling: true,
            multipleSelectionEnabled: true,
            preserveAspectRatio: true,
            toggleToolOnClick: false
        }
    });
}