var setWindowVariables = function (map) {
    window.pointTheSiteEnabled = false;
    window.pointEnabled = false;
    //---Make a parent grouplayer of radius and polygons---//
    window.groupLayerProperty = new ESRI.GroupLayer({
        id: "colliers-property"
    });
    window.groupLayerRadius = new ESRI.GroupLayer({
        id: "radius"
    })
    window.groupLayerDrivingTime = new ESRI.GroupLayer({
        id: "driving-time"
    })
    window.groupLayerDrivingDistance = new ESRI.GroupLayer({
        id: "driving-distance"
    })
    window.groupLayerPoints = new ESRI.GroupLayer({
        id: "points"
    });
    window.groupLayerPolygons = new ESRI.GroupLayer({
        id: "polygons"
    });
    window.groupLayerPolylines = new ESRI.GroupLayer({
        id: "polylines"
    });
    window.groupLayerRectangles = new ESRI.GroupLayer({
        id: "rectangles"
    });
    window.groupLayers = [groupLayerRadius, groupLayerDrivingTime, groupLayerDrivingDistance, groupLayerPoints, groupLayerPolygons, groupLayerPolylines, groupLayerRectangles, groupLayerProperty]
    map.ObjMap.addMany([groupLayerRadius, groupLayerDrivingTime, groupLayerDrivingDistance, groupLayerPoints, groupLayerPolygons, groupLayerPolylines, groupLayerRectangles, groupLayerProperty]);
    //--- End of Make a parent grouplayer of radius and polygons---//
}