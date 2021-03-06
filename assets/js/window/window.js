function setWindowVariables() {
    window.hoveredMeasurement = false
    window.hoveredDraw = false
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
    // window.legendOverflow = false
    // window.zoomSearchLevel = 0
    // window.displayedLegend = []
    // window.searchGraphics = undefined
    // // await getRoles().then(function (roles) {
    // //     console.log(roles)
    // // })
    // window.pointTheSiteEnabled = false;
    // window.pointEnabled = false;
    // window.currentPagePopup = 1;
    // window.propertyServiceStatusValue = []
    // //---Make a parent grouplayer of radius and polygons---//
    // window.groupLayerProperty = new ESRI.GroupLayer({
    //     id: "colliers-property"
    // });
    // window.groupLayerExternalData = new ESRI.GroupLayer({
    //     id: "external-data"
    // });
    // window.groupLayerRadius = new ESRI.GroupLayer({
    //     id: "radius"
    // })
    // window.groupLayerDrivingTime = new ESRI.GroupLayer({
    //     id: "driving-time"
    // })
    // window.groupLayerDrivingDistance = new ESRI.GroupLayer({
    //     id: "driving-distance"
    // })
    // window.groupLayerPoints = new ESRI.GroupLayer({
    //     id: "points"
    // });
    // window.groupLayerPolygons = new ESRI.GroupLayer({
    //     id: "polygons"
    // });
    // window.groupLayerPolylines = new ESRI.GroupLayer({
    //     id: "polylines"
    // });
    // window.groupLayerRectangles = new ESRI.GroupLayer({
    //     id: "rectangles"
    // });
    // window.groupLayerMeasurements = new ESRI.GroupLayer({
    //     id: "measurements"
    // })
    // window.groupLayerLabels = new ESRI.GroupLayer({
    //     id: "labels"
    // })
    // window.groupLayers = [groupLayerMeasurements, groupLayerRadius, groupLayerDrivingTime, groupLayerDrivingDistance, groupLayerPolygons, groupLayerPolylines, groupLayerRectangles, groupLayerExternalData, groupLayerProperty, groupLayerPoints, groupLayerLabels]
    // window.groupLayerID = []
    // for (let i = 0; i < groupLayers.length; i++) {
    //     groupLayerID[i] = groupLayers[i].id
    // }
    // map.ObjMap.addMany([groupLayerMeasurements, groupLayerRadius, groupLayerDrivingTime, groupLayerDrivingDistance, groupLayerPolygons, groupLayerPolylines, groupLayerRectangles, groupLayerExternalData, groupLayerProperty, groupLayerPoints, groupLayerLabels]);
    // //--- End of Make a parent grouplayer of radius and polygons---//

    // //---Make window for featureLayer---//
    // window.colliersPropertyStaging = new ESRI.FeatureLayer({
    //     url: "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K_staging/FeatureServer/0"
    // })
    // window.colliersPropertyForSaleHouse = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/2"
    // });
    // window.colliersPropertyForSaleOffice = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/1"
    // });
    // window.colliersPropertySold = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/0"
    // });
    // //---End of Make window for featureLayer---//

    // //---Feature Layer for all External Data ---//
    // window.POIFeatureLayer = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/2"
    // });
    // //---End of Feature Layer for all External Data ---//

    // //---Feature Service for all Onemap Database ---//
    // window.onemapRoles = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/11"
    // });
    // window.onemapDepartment = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/6"
    // });
    // window.onemapUsers = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/13"
    // });
    // window.onemapLayers = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/10"
    // });
    // window.onemapFields = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/7"
    // });
    // window.onemapActiveLayers = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/2"
    // });
    // window.onemapActiveFields = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/1"
    // });
    // window.onemapGraphicsLayers = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/8"
    // });
    // window.onemapSites = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/12"
    // });
    // window.onemapAnalysis = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/3"
    // });
    // window.onemapAnalysisPoints = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/4"
    // });
    // window.onemapAnalysisPolygons = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/5"
    // });
    // window.onemapGroupLayers = new ESRI.FeatureLayer({
    //     url:
    //         "https://gis.locatorlogic.com/arcgis/rest/services/ONEMAP/onemap/FeatureServer/9"
    // });

    // window.addFeatures = "/addFeatures"
    // window.updateFeatures = "/updateFeatures"
    // window.deleteFeatures = "/deleteFeatures"
    // //---End Feature Service for all Onemap Database ---//
}

// new ResizeSensor(document, function () {
//     console.log(window.innerWidth)
// })