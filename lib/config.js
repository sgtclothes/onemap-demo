export default class Config {
    constructor() {
        this.Construct = "this is config"
        this.Position = [
            "bottom-leading",
            "bottom-left",
            "bottom-right",
            "bottom-trailing",
            "top-leading",
            "top-left",
            "top-right",
            "top-trailing",
            "manual"
        ]
        this.Basemap = "osm"
        this.Zoom = 6
        this.CenterPoint = [118, -3.8]
        this.RouteServiceUrl = "https://utility.arcgis.com/usrsvcs/appservices/srsKxBIxJZB0pTZ0/rest/services/World/Route/NAServer/Route_World"
        this.RendererFeatureLayer = {
            "type": "simple",
            "symbol": {
                "type": "picture-marker",
                "url": "http://static.arcgis.com/images/Symbols/PeoplePlaces/Shopping.png",
                "width": 15,
                "height": 15
            }
        }

        this.travelModes = [
            { "name": "Walking Time", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Walking", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Preferred for Pedestrians", "value": "PREFER_LOW" }, { "parameterName": "Walking Speed (km/h)", "attributeName": "WalkTime", "value": 5 }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Roads Unsuitable for Pedestrians", "value": "AVOID_HIGH" }], "description": "Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.", "impedanceAttributeName": "WalkTime", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAllowBacktrack", "restrictionAttributeNames": ["Avoid Private Roads", "Avoid Roads Unsuitable for Pedestrians", "Preferred for Pedestrians", "Walking"], "useHierarchy": false, "simplificationTolerance": 2, "timeAttributeName": "WalkTime", "distanceAttributeName": "Kilometers", "type": "WALK", "id": "caFAgoThrvUpkFBW" },
            { "name": "Rural Driving Distance", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Driving an Automobile", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Through Traffic Prohibited", "value": "AVOID_HIGH" }, { "parameterName": "Vehicle Maximum Speed (km/h)", "attributeName": "TravelTime", "value": 0 }, { "parameterName": "Restriction Usage", "attributeName": "Roads Under Construction Prohibited", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Gates", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Express Lanes", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Carpool Roads", "value": "PROHIBITED" }], "description": "Models the movement of cars and other similar small automobiles, such as pickup trucks, and finds solutions that optimize travel distance. Travel obeys one-way roads, avoids illegal turns, and follows other rules that are specific to cars, but does not discourage travel on unpaved roads.", "impedanceAttributeName": "Kilometers", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAtDeadEndsAndIntersections", "restrictionAttributeNames": ["Avoid Carpool Roads", "Avoid Express Lanes", "Avoid Gates", "Avoid Private Roads", "Driving an Automobile", "Roads Under Construction Prohibited", "Through Traffic Prohibited"], "useHierarchy": true, "simplificationTolerance": 10, "timeAttributeName": "TravelTime", "distanceAttributeName": "Kilometers", "type": "AUTOMOBILE", "id": "Yzk3NjI1NTU5NjVj" },
            { "name": "Driving Time", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Avoid Unpaved Roads", "value": "AVOID_HIGH" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Driving an Automobile", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Through Traffic Prohibited", "value": "AVOID_HIGH" }, { "parameterName": "Vehicle Maximum Speed (km/h)", "attributeName": "TravelTime", "value": 0 }, { "parameterName": "Restriction Usage", "attributeName": "Roads Under Construction Prohibited", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Gates", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Express Lanes", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Carpool Roads", "value": "PROHIBITED" }], "description": "Models the movement of cars and other similar small automobiles, such as pickup trucks, and finds solutions that optimize travel time. Travel obeys one-way roads, avoids illegal turns, and follows other rules that are specific to cars. When you specify a start time, dynamic travel speeds based on traffic are used where it is available.", "impedanceAttributeName": "TravelTime", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAtDeadEndsAndIntersections", "restrictionAttributeNames": ["Avoid Unpaved Roads", "Avoid Private Roads", "Driving an Automobile", "Through Traffic Prohibited", "Roads Under Construction Prohibited", "Avoid Gates", "Avoid Express Lanes", "Avoid Carpool Roads"], "useHierarchy": true, "simplificationTolerance": 10, "timeAttributeName": "TravelTime", "distanceAttributeName": "Kilometers", "type": "AUTOMOBILE", "id": "FEgifRtFndKNcJMJ" },
            { "name": "Driving Distance", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Avoid Unpaved Roads", "value": "AVOID_HIGH" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Driving an Automobile", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Through Traffic Prohibited", "value": "AVOID_HIGH" }, { "parameterName": "Vehicle Maximum Speed (km/h)", "attributeName": "TravelTime", "value": 0 }, { "parameterName": "Restriction Usage", "attributeName": "Roads Under Construction Prohibited", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Gates", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Express Lanes", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Carpool Roads", "value": "PROHIBITED" }], "description": "Models the movement of cars and other similar small automobiles, such as pickup trucks, and finds solutions that optimize travel distance. Travel obeys one-way roads, avoids illegal turns, and follows other rules that are specific to cars.", "impedanceAttributeName": "Kilometers", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAtDeadEndsAndIntersections", "restrictionAttributeNames": ["Avoid Unpaved Roads", "Avoid Private Roads", "Driving an Automobile", "Through Traffic Prohibited", "Roads Under Construction Prohibited", "Avoid Gates", "Avoid Express Lanes", "Avoid Carpool Roads"], "useHierarchy": true, "simplificationTolerance": 10, "timeAttributeName": "TravelTime", "distanceAttributeName": "Kilometers", "type": "AUTOMOBILE", "id": "iKjmHuBSIqdEfOVr" },
            { "name": "Walking Distance", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Walking", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Preferred for Pedestrians", "value": "PREFER_LOW" }, { "parameterName": "Walking Speed (km/h)", "attributeName": "WalkTime", "value": 5 }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Roads Unsuitable for Pedestrians", "value": "AVOID_HIGH" }], "description": "Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel distance.", "impedanceAttributeName": "Kilometers", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAllowBacktrack", "restrictionAttributeNames": ["Avoid Private Roads", "Avoid Roads Unsuitable for Pedestrians", "Preferred for Pedestrians", "Walking"], "useHierarchy": false, "simplificationTolerance": 2, "timeAttributeName": "WalkTime", "distanceAttributeName": "Kilometers", "type": "WALK", "id": "yFuMFwIYblqKEefX" },
            { "name": "Rural Driving Time", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Driving an Automobile", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Through Traffic Prohibited", "value": "AVOID_HIGH" }, { "parameterName": "Vehicle Maximum Speed (km/h)", "attributeName": "TravelTime", "value": 0 }, { "parameterName": "Restriction Usage", "attributeName": "Roads Under Construction Prohibited", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Gates", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Express Lanes", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Carpool Roads", "value": "PROHIBITED" }], "description": "Models the movement of cars and other similar small automobiles, such as pickup trucks, and finds solutions that optimize travel time. Travel obeys one-way roads, avoids illegal turns, and follows other rules that are specific to cars, but does not discourage travel on unpaved roads. When you specify a start time, dynamic travel speeds based on traffic are used where it is available.", "impedanceAttributeName": "TravelTime", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAtDeadEndsAndIntersections", "restrictionAttributeNames": ["Avoid Carpool Roads", "Avoid Express Lanes", "Avoid Gates", "Avoid Private Roads", "Driving an Automobile", "Roads Under Construction Prohibited", "Through Traffic Prohibited"], "useHierarchy": true, "simplificationTolerance": 10, "timeAttributeName": "TravelTime", "distanceAttributeName": "Kilometers", "type": "AUTOMOBILE", "id": "NmNhNDUwZmE1YTlj" },
            { "name": "Trucking Time", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Use Preferred Truck Routes", "value": "PREFER_HIGH" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Unpaved Roads", "value": "AVOID_HIGH" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Driving a Truck", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Roads Under Construction Prohibited", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Gates", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Express Lanes", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Carpool Roads", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Truck Restricted Roads", "value": "AVOID_HIGH" }, { "parameterName": "Vehicle Maximum Speed (km/h)", "attributeName": "TruckTravelTime", "value": 0 }], "description": "Models basic truck travel by preferring designated truck routes, and finds solutions that optimize travel time. Routes must obey one-way roads, avoid illegal turns, and so on. When you specify a start time, dynamic travel speeds based on traffic are used where it is available, up to the legal truck speed limit.", "impedanceAttributeName": "TruckTravelTime", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBNoBacktrack", "restrictionAttributeNames": ["Avoid Carpool Roads", "Avoid Express Lanes", "Avoid Gates", "Avoid Private Roads", "Avoid Truck Restricted Roads", "Avoid Unpaved Roads", "Driving a Truck", "Roads Under Construction Prohibited", "Use Preferred Truck Routes"], "useHierarchy": true, "simplificationTolerance": 10, "timeAttributeName": "TruckTravelTime", "distanceAttributeName": "Kilometers", "type": "TRUCK", "id": "ZzzRtYcPLjXFBKwr" },
            { "name": "Trucking Distance", "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Use Preferred Truck Routes", "value": "PREFER_HIGH" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Unpaved Roads", "value": "AVOID_HIGH" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Private Roads", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Driving a Truck", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Roads Under Construction Prohibited", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Gates", "value": "AVOID_MEDIUM" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Express Lanes", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Carpool Roads", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Avoid Truck Restricted Roads", "value": "AVOID_HIGH" }, { "parameterName": "Vehicle Maximum Speed (km/h)", "attributeName": "TruckTravelTime", "value": 0 }], "description": "Models basic truck travel by preferring designated truck routes, and finds solutions that optimize travel distance. Routes must obey one-way roads, avoid illegal turns, and so on.", "impedanceAttributeName": "Kilometers", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBNoBacktrack", "restrictionAttributeNames": ["Avoid Carpool Roads", "Avoid Express Lanes", "Avoid Gates", "Avoid Private Roads", "Avoid Truck Restricted Roads", "Avoid Unpaved Roads", "Driving a Truck", "Roads Under Construction Prohibited", "Use Preferred Truck Routes"], "useHierarchy": true, "simplificationTolerance": 10, "timeAttributeName": "TruckTravelTime", "distanceAttributeName": "Kilometers", "type": "TRUCK", "id": "UBaNfFWeKcrRVYIo" }
        ]
        this.Renderer = new Array()
        this.Renderer["minimarket"] = {
            type: "class-breaks", // autocasts as new ClassBreaksRenderer()
            defaultSymbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "black",
                style: "backward-diagonal",
                outline: {
                    width: 1,
                    color: [255, 0, 0]
                }
            }
        }
        this.PopupTemplate = new Array()
        this.PopupTemplate["minimarket"] = {
            "title": "Mini Market",
            "content": "<b>Provinsi : </b>{PROVINSI}<br><b>Mini Market : </b>{MINIMARKET}<br><b>ID Provinsi : </b>{ID_PROV}<br><b>Shape Length : </b>{Shape_Length}<br><b>Shape Area : </b>{Shape_Area}"
        }
        this.BufferPolySym = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [140, 140, 222, 0.5],
            outline: {
                color: [0, 0, 0, 0.5],
                width: 2
            }
        }
        this.BufferPointSym = {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            color: [255, 0, 0],
            outline: {
                color: [255, 255, 255],
                width: 1
            },
            size: 7
        }
        this.DriveTimePoint = {
            type: "point",
            longitude : 106.822,
            latitude : -6.272
        }
    
        this.DriveTimeMarkerSymbol = {
            type: "simple-marker",
            color: [0, 0, 0],
            size: 8,
            // outline: {
            //     color: [0, 0, 0],
            //     width: 1
            // }
        };
        this.DriveTimeFillSymbol = {
            type: "simple-fill",
            color: "rgba(255,50,50,.25)",
            outline: {
              style: "long-dash",
              color: [0, 0, 0],
              width: 1
            }
        };
    
        this.DriveTimeParams = {
            'f': 'json',
            'env:outSR': 4326,
            'env:processSR': 4326,
            'facilities':'{"geometryType":"esriGeometryPoint","features":[{"geometry":{"x":' + this.DriveTimePoint.longitude + ',"y":'+ this.DriveTimePoint.latitude + ',"spatialReference":{"wkid":4326}}}],"sr":{"wkid":4326}}',
            'break_units': 'minutes',
            'B_Values': 10
        }
        this.TrackGraphic = {
            symbol: {
                type: "simple-marker",
                size: "9px",
                color: "green",
                outline: {
                    color: "#efefef",
                    width: "1.2px"
                }
            }
        }
        this.InfoWindowUrl = {
            url: "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/476"
        }
        this.PrintServiceUrl = "http://tig.co.id/ags/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        this.RouteTaskUrl = "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"

    }

    create() {
        return this.Construct
    }
}