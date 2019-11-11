var setWindowVariables = async function (map) {
    window.token = undefined
    window.legendOverflow = false
    window.displayedLegend = []
    await generateToken().then(function (token) {
        console.log(token)
        window.token = token
    })
    window.pointTheSiteEnabled = false;
    window.pointEnabled = false;
    window.currentPagePopup = 1;
    //---Make a parent grouplayer of radius and polygons---//
    window.groupLayerProperty = new ESRI.GroupLayer({
        id: "colliers-property"
    });
    window.groupLayerExternalData = new ESRI.GroupLayer({
        id: "external-data"
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
    window.groupLayers = [groupLayerRadius, groupLayerDrivingTime, groupLayerDrivingDistance, groupLayerPoints, groupLayerPolygons, groupLayerPolylines, groupLayerRectangles, groupLayerProperty, groupLayerExternalData]
    window.groupLayerID = []
    for (let i = 0; i < groupLayers.length; i++) {
        groupLayerID[i] = groupLayers[i].id
    }
    map.ObjMap.addMany([groupLayerRadius, groupLayerDrivingTime, groupLayerDrivingDistance, groupLayerPoints, groupLayerPolygons, groupLayerPolylines, groupLayerRectangles, groupLayerProperty, groupLayerExternalData]);
    //--- End of Make a parent grouplayer of radius and polygons---//

    //---Make window for featureLayer---//
    window.colliersPropertyStaging = new ESRI.FeatureLayer({
        url: "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K_staging/FeatureServer/0"
    })
    window.colliersPropertyForSaleHouse = new ESRI.FeatureLayer({
        url:
            "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/2"
    });
    window.colliersPropertyForSaleOffice = new ESRI.FeatureLayer({
        url:
            "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/1"
    });
    window.colliersPropertySold = new ESRI.FeatureLayer({
        url:
            "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/0"
    });
    //---End of Make window for featureLayer---//

    //---Feature Layer for all POI ---//
    window.POIFeatureLayer = new ESRI.FeatureLayer({
        url:
            "https://139.162.2.92:6443/arcgis/rest/services/TEMP/k_target_temptest/FeatureServer/2"
    });
    //---End of Feature Layer for all POI ---//
}