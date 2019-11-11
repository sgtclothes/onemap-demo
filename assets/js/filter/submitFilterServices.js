function submitFilterServices(map) {
  $(document).delegate("#button-filter-property", "click", async function () {

    //Setting name for label service
    let propertyTypeLabel = "property_type"
    let marketingSchemeLabel = "marketing_scheme"
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

    for (let i = 0; i < map.ObjMap.layers.items.length; i++) {
      if (map.ObjMap.layers.items[i].id == "colliers-property") {
        map.ObjMap.layers.items[i].removeAll()
      }
    }

    var graphicsLayer = new ESRI.GraphicsLayer({
      id: "colliers-property-"
    });

    var lyrFields;

    graphicsLayer.removeAll();
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
    if (property.length > 0) {
      let q = "(";
      for (let i = 0; i < property.length; i++) {
        q += "(lower(" + propertyTypeLabel + ") = '" + property[i] + "')";
        if (property[i + 1] !== undefined) {
          q += " OR ";
        }
      }
      q += ")";
      value.push(q);
    }

    console.log(value)

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
    if (marketingSchemeValue !== undefined) {
      if (marketingSchemeValue == "for-lease") marketingSchemeValue = "for lease";
      else if (marketingSchemeValue == "for-sale") marketingSchemeValue = "for sale";
      else if (marketingSchemeValue == "for-lease-and-for-sale") marketingSchemeValue = "for sale";
      value.push("(lower(" + marketingSchemeLabel + ") = '" + marketingSchemeValue + "'))");
    }

    for (let i = 0; i < value.length; i++) {
      queryWhere += "(" + value[i] + ")"
      if (value[i + 1] !== undefined) {
        queryWhere += " AND "
      }
    }

    console.log(queryWhere)

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
    featureService.push(colliersPropertyStaging)

    var layersRequest = {
      query: {
        f: "json"
      },
      responseType: "json"
    };

    await EsriRequest(
      featureService[0].url,
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

    let propertyList = ["office", "house", "ruko", "industrial/logistic", "data center", "shopping center", "apartment", "hotel", "others"]
    let punctuations = [/\s/g, "&", "'", ".", "/"]
    let tr = $(".tableLegendProperty").find("tr")
    for (let i = 0; i < propertyList.length; i++) {
      propertyList[i] = punctuationFixer(punctuations, "_", propertyList[i])
      for (let j = 0; j < tr.length; j++) {
        if ($(tr[j]).attr("id").split("-")[2] == propertyList[i]) {
          $(tr[j]).remove()
        }
      }
    }


    for (let j = 0; j < property.length; j++) {
      if (displayedLegend.includes(property[j])) {
        let index = displayedLegend.indexOf(property[j])
        displayedLegend.splice(index, 1)
      }
    }

    console.log(displayedLegend)

    $("#loading-bar").show();
    $(".popupFilter").hide();
    let res = undefined
    if (checkGraphicsExist(map).length > 0) {
      console.log("with geometry")
      for (let i = 0; i < checkGraphicsExist(map).length; i++) {
        let query = new ESRI.Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = map.ObjMap.spatialReference;
        query.geometry = checkGraphicsExist(map)[i]
        if (value.length < 1) {
          query.where = "1=1"
        } else {
          query.where = queryWhere
        }
        await featureService[0].queryFeatures(query).then(async function (results) {
          console.log(results)
          if (results.features.length < 1) {
            $("#loading-bar").hide();
          }
          await displayResultsGraphics(map, results, graphicsLayer, groupLayerProperty)
          await displayLegendProperty(map, "LIST DATA", results)
          $("#loading-bar").hide();
        });
      }
      // console.log(res)
      // for (let j = 0; j < property.length; j++) {
      //   if (displayedLegend.length < 1) {
      //     displayedLegend.push(property[j])
      //     await displayLegendProperty(map, "LIST DATA", res)
      //   } else {
      //     if (!displayedLegend.includes(property[j])) {
      //       console.log(property[j])
      //       displayedLegend.push(property[j])
      //       await displayLegendProperty(map, "LIST DATA", res)
      //     }
      //   }
      // }
    } else {
      console.log("without geometry")
      let query = new ESRI.Query();
      query.returnGeometry = true;
      query.outFields = ["*"];
      query.outSpatialReference = map.ObjMap.spatialReference;
      if (value.length < 1) {
        query.where = "1=1"
      } else {
        query.where = queryWhere
      }
      await featureService[0].queryFeatures(query).then(async function (results) {
        if (results.features.length < 1) {
          $("#loading-bar").hide();
        }
        await displayResultsGraphics(map, results, graphicsLayer, groupLayerProperty)
        await displayLegendProperty(map, "LIST COLLIERS PROPERTIES", results)
        $("#loading-bar").hide();
      });
    }
  });
}

var checkGraphicsExist = function (map) {
  let radius = getLayerById(map, "radius")
  let polygons = getLayerById(map, "polygons")
  let drivingTime = getLayerById(map, "driving-time")
  let drivingDistance = getLayerById(map, "driving-distance")
  let rectangles = getLayerById(map, "rectangles")

  let geometryRadius = []
  let geometryPolygons = []
  let geometryDrivingTime = []
  let geometryDrivingDistance = []
  let geometryRectangles = []
  let geometryUnions = []

  getItemsGroupLayer(radius).forEach(ele => {
    if (ele.selector == "buffer-graphics") {
      geometryRadius.push(ele.geometry)
    }
  });

  getItemsGroupLayer(polygons).forEach(ele => {
    if (ele.selector == "polygon-graphics") {
      geometryPolygons.push(ele.geometry)
    }
  });

  getItemsGroupLayer(drivingTime).forEach(ele => {
    if (ele.selector == "drivetime-graphics") {
      geometryDrivingTime.push(ele.geometry)
    }
  });

  getItemsGroupLayer(drivingDistance).forEach(ele => {
    if (ele.selector == "drivedistance-graphics") {
      geometryDrivingDistance.push(ele.geometry)
    }
  });

  getItemsGroupLayer(rectangles).forEach(ele => {
    if (ele.selector == "rectangle-graphics") {
      geometryRectangles.push(ele.geometry)
    }
  });

  geometryUnions = geometryRadius.concat(geometryPolygons, geometryDrivingTime, geometryDrivingDistance, geometryRectangles)
  return geometryUnions
}