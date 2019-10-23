function submitFilterServices(convertData, map, convertCSV) {
  $(document).delegate("#button-filter-property", "click", function () {

    //Setting name for label service
    let propertyTypeLabel = "propertytype"
    let marketingSchemeLabel = "marketingScheme"
    let strataLabel = "strata"
    let landSqmLabel = "landSqm"
    let buildSqmLabel = "buildSqm"
    let timePeriodLabel = "timePeriod"
    let departmentClientsLabel = "departmentClients"
    let propertyForSaleLabel = "propertyForSale"
    let propertySoldLabel = "propertySold"
    let propertyValuationLabel = "propertyValuation"
    let propertyAdvisoryWorkLabel = "propertyAdvisoryWork"
    let propertyProjectLabel = "propertyProject"
    let propertyNPLAYDALabel = "propertyNPLAYDA"

    let colliersPropertyForSaleHouse = new ESRI.FeatureLayer({
      url:
        "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/2"
    });
    let colliersPropertyForSaleOffice = new ESRI.FeatureLayer({
      url:
        "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/1"
    });
    let colliersPropertySold = new ESRI.FeatureLayer({
      url:
        "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/0"
    });

    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
      if (map.ObjMap.layers.items[i].id == "colliers-property") {
        map.ObjMap.layers.items.splice(i, 1)
      }
    }

    var lyrFields;
    var resultsLayer = new ESRI.GraphicsLayer({
      id: "colliers-property"
    });
    resultsLayer.removeAll();
    map.ObjMap.add(resultsLayer);
    map.ObjMapView.graphics.removeAll();

    let property = [];
    let propertyTypeValue = $("input[name='select-property']");
    for (let i = 0; i < propertyTypeValue.length; i++) {
      if ($(propertyTypeValue[i]).prop("checked") == true) {
        property.push($(propertyTypeValue[i]).val());
      }
    }
    let marketingSchemeValue = $("input[name='marketing-scheme-input']:checked").val()
    let strataValue = $("input[name='strata-input']:checked").val();
    let landMinSizeMeterValue = $("#land-min-size-meter-value").val();
    let landMaxSizeMeterValue = $("#land-max-size-meter-value").val();
    let buildMinSizeUnitValue = $("#build-min-size-meter-value").val();
    let buildMaxSizeUnitValue = $("#build-max-size-meter-value").val();
    let TimePeriodFromValue = $("#time-period-from-value").val();
    let TimePeriodToValue = $("#time-period-to-value").val();
    let departmentClients = []
    let departmentClientsValue = $("input[name='select-department-clients']")
    for (let i = 0; i < departmentClientsValue.length; i++) {
      if ($(departmentClientsValue[i]).prop("checked") == true) {
        departmentClients.push($(departmentClientsValue[i]).val());
      }
    }
    let propertyForSale = []
    let propertyForSaleValue = $("input[name='sub-property-for-sale']")
    for (let i = 0; i < propertyForSaleValue.length; i++) {
      if ($(propertyForSaleValue[i]).prop("checked") == true) {
        propertyForSale.push($(propertyForSaleValue[i]).val());
      }
    }
    let propertySold = []
    let propertySoldValue = $("input[name='sub-property-sold']")
    for (let i = 0; i < propertySoldValue.length; i++) {
      if ($(propertySoldValue[i]).prop("checked") == true) {
        propertySold.push($(propertySoldValue[i]).val());
      }
    }
    let propertyValuation = []
    let propertyValuationValue = $("input[name='sub-property-sold']")
    for (let i = 0; i < propertyValuationValue.length; i++) {
      if ($(propertyValuationValue[i]).prop("checked") == true) {
        propertyValuation.push($(propertyValuationValue[i]).val());
      }
    }
    let propertyAdvisoryWorkValue = $("input[name='property-advisory-work']:checked").val();
    let propertyProject = $("input[name='property-project']:checked").val();
    let propertyNPLAYDA = $("input[name='property-npl-ayda']:checked").val();

    let queryWhere = "";
    let value = [];

    //Variable to collect feature service by rules
    let featureService = []

    // Get value of property type and we register it on "value" array
    // if (property.length > 0) {
    //   let q = "(";
    //   for (let i = 0; i < property.length; i++) {
    //     q += "(" + propertyTypeLabel + " = '" + property[i] + "')";
    //     if (property[i + 1] !== undefined) {
    //       q += " OR ";
    //     }
    //   }
    //   q += ")";
    //   value.push(q);
    // }

    //Strata will be automatically selected, so we get strata value
    //Strata skipped
    //We set boolean value 0 = No, 1 = Yes
    // if (strataValue !== undefined) {
    //   if (strataValue == "yes") strataValue = 1;
    //   else if (strataValue == "no") strataValue = 0;
    //   value.push("(" + strataLabel + " = " + strataValue + ")");
    // }

    // Default Marketing Scheme will be null until selected 
    // Marketing Scheme skipped
    // if (marketingSchemeValue !== undefined) {
    //   if (marketingSchemeValue == "for-lease") marketingSchemeValue = "for-lease";
    //   else if (marketingSchemeValue == "for-sale") marketingSchemeValue = "for-sale";
    //   else if (marketingSchemeValue == "for-lease-and-for-sale") marketingSchemeValue = "for-lease-and-for-sale";
    //   value.push("(" + marketingSchemeLabel + " = " + marketingSchemeValue + ")");
    // }

    //Get value of land size meters and we register it on "value" array
    // if (landMinSizeMeterValue !== "" && landMaxSizeMeterValue !== "") {
    //   value.push(
    //     "(" + landSqmLabel + " >= " +
    //     landMinSizeMeterValue +
    //     " AND " + landSqmLabel + " <= " +
    //     landMaxSizeMeterValue +
    //     ")"
    //   );
    // } else if (landMinSizeMeterValue == "" && landMaxSizeMeterValue !== "") {
    //   value.push("(" + landSqmLabel + " = " + landMaxSizeMeterValue + ")");
    // } else if (landMinSizeMeterValue !== "" && landMaxSizeMeterValue == "") {
    //   value.push("(" + landSqmLabel + " = " + landMinSizeMeterValue + ")");
    // }

    //Get value of build size meters and we register it on "value" array
    // if (buildMinSizeUnitValue !== "" && buildMaxSizeUnitValue !== "") {
    //   value.push(
    //     "(" + buildSqmLabel + " >= " +
    //     buildMinSizeUnitValue +
    //     " AND " + buildSqmLabel + " <= " +
    //     buildMaxSizeUnitValue +
    //     ")"
    //   );
    // } else if (buildMinSizeUnitValue == "" && buildMaxSizeUnitValue !== "") {
    //   value.push("(" + buildSqmLabel + " = " + buildMaxSizeUnitValue + ")");
    // } else if (buildMinSizeUnitValue !== "" && buildMaxSizeUnitValue == "") {
    //   value.push("(" + buildSqmLabel + " = " + buildMinSizeUnitValue + ")");
    // }

    //Get property time period, both from and to must not be empty
    // if (TimePeriodFromValue == "" && TimePeriodToValue !== "") {
    //   let PopupFromEmptyValue = $("#popup-alert-from-empty");
    //   $(PopupFromEmptyValue).addClass("show");
    //   setTimeout(function () {
    //     $(PopupFromEmptyValue).removeClass("show");
    //   }, 2000);
    // } else if (TimePeriodFromValue !== "" && TimePeriodToValue == "") {
    //   let PopupToEmptyValue = $("#popup-alert-to-empty");
    //   $(PopupToEmptyValue).addClass("show");
    //   setTimeout(function () {
    //     $(PopupToEmptyValue).removeClass("show");
    //   }, 2000);
    // }

    // if (TimePeriodFromValue !== "" && TimePeriodToValue !== "") {
    //   value.push(
    //     "(" + timePeriodLabel + " between '" +
    //     TimePeriodFromValue +
    //     "' AND '" +
    //     TimePeriodToValue +
    //     "')"
    //   );
    // }

    // Get value of clients and we register it on "value" array
    // if (departmentClients.length > 0) {
    //   let t = "(";
    //   for (let i = 0; i < departmentClients.length; i++) {
    //     t += "(" + departmentClientsLabel + " = '" + departmentClients[i] + "')";
    //     if (departmentClients[i + 1] !== undefined) {
    //       t += " OR ";
    //     }
    //   }
    //   t += ")";
    //   value.push(t);
    // }

    //Get feature service
    if ((property.includes("Office") || property.length < 1) && (marketingSchemeValue == "for-sale" || marketingSchemeValue == undefined) && (propertyForSale.includes("available") || propertyForSale.length < 1)) {
      if (featureService.some(feature => feature.url !== "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/1") || featureService.length < 1) {
        featureService.push(colliersPropertyForSaleOffice)
      }
    }
    if ((property.includes("House") || property.length < 1) && (marketingSchemeValue == "for-sale" || marketingSchemeValue == undefined) && (propertyForSale.includes("available") || propertyForSale.length < 1)) {
      if (featureService.some(feature => feature.url !== "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/2") || featureService.length < 1) {
        featureService.push(colliersPropertyForSaleHouse)
      }
    }
    if (propertySold.includes("colliers")) {
      if (featureService.some(feature => feature.url !== "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K/MapServer/0") || featureService.length < 1) {
        featureService.push(colliersPropertySold)
      }
    }
    if (property.length < 1 && marketingSchemeValue == undefined && propertyForSale.length < 1 && propertySold.includes("colliers")) {
      featureService = [colliersPropertySold]
    }
    if (property.length < 1 && marketingSchemeValue == undefined && propertyForSale.length < 1 && propertySold.length < 1) {
      featureService = []
    }

    let radius = map.ObjMap.findLayerById("radius")
    let polygons = map.ObjMap.findLayerById("polygons")

    let geometryRadius = []
    let geometryPolygons = []
    let geometryUnions = []

    getItemsGroupLayer(radius).forEach(ele => {
      if (ele.attributes == "buffer-graphics") {
        geometryRadius.push(ele.geometry)
      }
    });

    getItemsGroupLayer(polygons).forEach(ele => {
      if (ele.attributes == "polygon-graphics") {
        geometryPolygons.push(ele.geometry)
      }
    });

    geometryUnions = geometryRadius.concat(geometryPolygons)

    console.log(radius)
    console.log(polygons)
    console.log(geometryRadius)
    console.log(geometryPolygons)
    console.log(geometryUnions)

    for (let i = 0; i < featureService.length; i++) {
      var layersRequest = {
        query: {
          f: "json"
        },
        responseType: "json"
      };

      EsriRequest(
        featureService[i].url,
        layersRequest
      ).then(function (response) {
        console.log("response", response);
        lyrFields = response.data.fields;
      });

      function getFldAlias(fieldName) {
        var retVal = "";
        arrayUtils.forEach(lyrFields, function (item) {
          if (item.name === fieldName) {
            retVal = item.alias;
            return true;
          }
        });
        return retVal;
      }

      $("#loading-bar").show();
      $(".popupFilter").hide();
      if (geometryUnions.length > 0) {
        for (let i = 0; i < geometryUnions.length; i++) {
          let query = new ESRI.Query();
          query.returnGeometry = true;
          query.outFields = ["*"];
          query.outSpatialReference = map.ObjMap.spatialReference;
          query.geometry = geometryUnions[i]
          for (let j = 0; j < featureService.length; j++) {
            featureService[j].queryFeatures(query).then(function (results) {
              if (results.features.length < 1) {
                $("#loading-bar").hide();
              }
              displayResultsAll(results)
            });
          }
        }
      } else {
        console.log("without geometry")
        let query = new ESRI.Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = map.ObjMap.spatialReference;
        query.where = "1=1"
        for (let j = 0; j < featureService.length; j++) {
          featureService[j].queryFeatures(query).then(function (results) {
            if (results.features.length < 1) {
              $("#loading-bar").hide();
            }
            displayResultsAll(results)
          });
        }
      }
      //   let checkGraphic = 0
      //   let geometry = []
      //   for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
      //     for (let j = 0; j < map.ObjMap.layers.items[i].graphics.items.length; j++) {
      //       if (map.ObjMap.layers.items[i].graphics.items[j].geometry.type != "point") {
      //         checkGraphic = 1
      //         geometry.push(map.ObjMap.layers.items[i].graphics.items[j].geometry)
      //       }
      //     }
      //   }

      //   if (checkGraphic == 1) {
      //     for (let i = 0; i < geometry.length; i++) {
      //       let query = new ESRI.Query();
      //       query.returnGeometry = true;
      //       query.outFields = ["*"];
      //       query.outSpatialReference = map.ObjMap.spatialReference;
      //       query.geometry = geometry[i]
      //       featureService[i].queryFeatures(query).then(function (results) {
      //         if (results.features.length < 1) {
      //           $("#loading-bar").hide();
      //         }
      //         console.log(results)
      //         // displayResultsAll(results)
      //       });
      //     }
      //     // if (map.ObjMap.layers.items.length > 0) {
      //     //   for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
      //     //     if ("graphics" in map.ObjMap.layers.items[i]) {
      //     //       if (map.ObjMap.layers.items[i].graphics.items.length > 0) {
      //     //         for (let j = 0; j < map.ObjMap.layers.items[i].graphics.items.length; j++) {
      //     //           let query = new ESRI.Query();
      //     //           query.returnGeometry = true;
      //     //           query.outFields = ["*"];
      //     //           query.outSpatialReference = map.ObjMap.spatialReference;
      //     //           query.geometry = map.ObjMap.layers.items[i].graphics.items[j].geometry
      //     //           query.geometry = geometry
      //     //           featureService[i].queryFeatures(query).then(function (results) {
      //     //             if (results.features.length < 1) {
      //     //               $("#loading-bar").hide();
      //     //             }
      //     //             displayResultsAll(results)
      //     //           });
      //     //         }
      //     //       }
      //     //     }
      //     //   }
      //     // }
      //   }
      //   else {
      //     let query = new ESRI.Query();
      //     query.returnGeometry = true;
      //     query.outFields = ["*"];
      //     query.outSpatialReference = map.ObjMap.spatialReference;
      //     query.where = "1=1"
      //     featureService[i].queryFeatures(query).then(function (results) {
      //       console.log(results)
      //       displayResultsAll(results)
      //     });
      //   }
    }
    // // view and print the number of results to the DOM
    function displayResults(results) {
      let chunkedResults = results.features;
      let attributes = [];
      let geometry = [];
      let alias = {};

      for (let i in chunkedResults) {
        attributes.push(chunkedResults[i].attributes);
        geometry.push(chunkedResults[i].geometry);
      }

      for (let j in chunkedResults[0].attributes) {
        alias[j] = getFldAlias(j);
      }

      console.log(alias)

      convertCSV.processCSVData(
        convertData.getRowofTextArray(attributes),
        "custom",
        geometry,
        alias,
        true
      );
      $("#loading-bar").hide();
    }

    function displayResultsAll(results) {
      if (results.features.length < 1) {
        $("#loading-bar").hide();
      } else {
        let markerSymbol = {}
        if (results.features[0].attributes.property_type == "office") {
          markerSymbol = {
            type: "picture-marker",
            url: "assets/images/icons/OB-red.png",
            width: "20px",
            height: "20px"
          };
        }
        if (results.features[0].attributes.property_t == "house") {
          markerSymbol = {
            type: "picture-marker",
            url: "assets/images/icons/OB-blue.png",
            width: "20px",
            height: "20px"
          };
        }
        results.features.forEach(function (feature) {
          let g = new ESRI.Graphic({
            geometry: feature.geometry,
            attributes: feature.attributes,
            symbol: markerSymbol,
          });
          resultsLayer.add(g);
        });
        $("#loading-bar").hide()
      }
    }
  });
}

// function validateDate(value) {
//   let dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
//   // Match the date format through regular expression
//   if (value.match(dateformat)) {
//     //Test which seperator is used '/' or '-'
//     let opera1 = value.split("/");
//     let opera2 = value.split("-");
//     lopera1 = opera1.length;
//     lopera2 = opera2.length;
//     // Extract the string into month, date and year
//     if (lopera1 > 1) {
//       var pdate = value.split("/");
//     } else if (lopera2 > 1) {
//       var pdate = value.split("-");
//     }
//     let dd = parseInt(pdate[0]);
//     let mm = parseInt(pdate[1]);
//     let yy = parseInt(pdate[2]);
//     // Create list of days of a month [assume there is no leap year by default]
//     let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//     if (mm == 1 || mm > 2) {
//       if (dd > ListofDays[mm - 1]) {
//         return false;
//       }
//     }
//     if (mm == 2) {
//       let lyear = false;
//       if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
//         lyear = true;
//       }
//       if (lyear == false && dd >= 29) {
//         return false;
//       }
//       if (lyear == true && dd > 29) {
//         return false;
//       }
//     } else {
//       return true;
//     }
//   } else {
//     return false;
//   }
// }
