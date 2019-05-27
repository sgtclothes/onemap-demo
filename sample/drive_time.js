function boot(GIS) {
    // TESTING DRIVE TIME

    let esriConfig = new GIS.Proxy.esriConfig();
    esriConfig.setUrlUtils();

    //Define Config class
    let config = new GIS.Config();

    //Define Map class
    let map = new GIS.Map(config.CenterPoint);
    map.setBasemap("streets-navigation-vector")
    map.render();

    let driveTime = new GIS.Buffer.DriveTime(
        config.DriveTimePoint,
        config.DriveTimeParams,
        "http://tig.co.id/ags/rest/services/GP/DriveTime32223232/GPServer/DriveTime3",
        config.DriveTimeFillSymbol
      );

    driveTime.createLayer(
        "https://gis.locatorlogic.com/arcgis/rest/services/BPS/BPS_ONLY_2016/MapServer/722/"
    );

    let driveTimePromise = new Promise(function(resolve, reject){
        driveTime.run(resolve);
    });

    driveTimePromise.then(function() {
        let extent = driveTime.ArrayParamsCatchment[0].features[0].geometry.extent;
        let xmin = extent.xmin;
        let xmax = extent.xmax;
        let ymin = extent.ymin;
        let ymax = extent.ymax;
        let wkid =
          driveTime.ArrayParamsCatchment[0].features[0].geometry.spatialReference
            .wkid;
        let inputFeatureArr = driveTime.ArrayParamsCatchment;
    
        let catchmentParams = {
          f: "json",
          "env:outSR": 4326,
          "env:processSR": 4326,
          Input_Feature: JSON.stringify(inputFeatureArr[0])
        };
    
        let catchment = new GIS.Buffer.Catchment();
    
        let catchmentPromise = new Promise(function(resolve, reject) {
          catchment.setServiceUrl(
            "http://tig.co.id/ags/rest/services/GP/v2_catchment/GPServer/catchment_select_table"
          );
          catchment.setParams(catchmentParams);
          catchment.run(resolve);
        });
    
        catchmentPromise.then(function() {
          let query = {
            f: "json",
            where: "OBJECT IN (" + catchment.ObjectIDStr[0] + ")",
            returnGeometry: true,
            spatialRel: "esriSpatialRelIntersects",
            maxAllowableOffset: 76,
            geometry:
              '{"xmin":' +
              xmin +
              ',"ymin":' +
              ymin +
              ',"xmax":' +
              xmax +
              ', "ymax":' +
              ymax +
              ',"spatialReference":{"wkid":' +
              wkid +
              "}}",
            geometryType: driveTime.ArrayParamsCatchment[0].geometryType,
            inSR: 102100,
            outFields: "*",
            outSR: 102100
          };
          catchment.setQuery(query);
        });
    });
    
    driveTime.render(map.ObjMap, map.ObjMapView, config.DriveTimeMarkerSymbol);
}