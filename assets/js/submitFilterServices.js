function submitFilterServices(convertData, map, convertCSV) {
  $(document).delegate("#button-filter-property", "click", function() {
    let colliersProperty = new ESRI.FeatureLayer({
      url:
        "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0"
    });

    var lyrFields;
    var resultsLayer = new ESRI.GraphicsLayer();
    resultsLayer.removeAll();
    map.ObjMap.add(resultsLayer);
    map.ObjMapView.graphics.removeAll();

    let property = [];

    let strataValue = $("input[name='strata-input']:checked").val();
    let propertyTypeValue = $("input[name='select-property']");
    for (let i = 0; i < propertyTypeValue.length; i++) {
      if ($(propertyTypeValue[i]).prop("checked") == true) {
        property.push($(propertyTypeValue[i]).val());
      }
    }
    let landMinSizeMeterValue = $("#land-min-size-meter-value").val();
    let landMaxSizeMeterValue = $("#land-max-size-meter-value").val();
    let landMinSizeUnitValue = $("#land-min-size-unit-value").val();
    let landMaxSizeUnitValue = $("#land-max-size-unit-value").val();
    let marketingSchemeValue = $(
      "input[name='marketing-scheme-input']:checked"
    ).val();
    let TimePeriodFromValue = $("#time-period-from-value").val();
    let TimePeriodToValue = $("#time-period-to-value").val();

    let propertyAvailable = $(".property-available");
    let arrPropAvailable = [];

    let propertySold = $(".property-sold");
    let arrPropSold = [];

    let propertyValuation = $(".property-valuation");
    let arrPropValuation = [];

    let queryWhere = "";
    let value = [];

    // Get value of property type and we register it on "value" array
    if (property.length > 0) {
      let q = "(";
      for (let i = 0; i < property.length; i++) {
        q += "(propertytype = '" + property[i] + "')";
        if (property[i + 1] !== undefined) {
          q += " OR ";
        }
      }
      q += ")";
      value.push(q);
    }

    //Strata will be automatically selected, so we get strata value
    //We set boolean value 0 = No, 1 = Yes
    if (strataValue !== undefined) {
      if (strataValue == "yes") strataValue = 1;
      else if (strataValue == "no") strataValue = 0;
      value.push("(r_k_strata = " + strataValue + ")");
    }

    //Get value of land size meters and we register it on "value" array
    if (landMinSizeMeterValue !== "" && landMaxSizeMeterValue !== "") {
      value.push(
        "(r_k_l_sqm >= " +
          landMinSizeMeterValue +
          " AND r_k_l_sqm <= " +
          landMaxSizeMeterValue +
          ")"
      );
    } else if (landMinSizeMeterValue == "" && landMaxSizeMeterValue !== "") {
      value.push("(r_k_l_sqm = " + landMaxSizeMeterValue + ")");
    } else if (landMinSizeMeterValue !== "" && landMaxSizeMeterValue == "") {
      value.push("(r_k_l_sqm = " + landMinSizeMeterValue + ")");
    }

    //Get value of land size unit and we register it on "value" array
    if (landMinSizeUnitValue !== "" && landMaxSizeUnitValue !== "") {
      value.push(
        "(r_k_l_sqm >= " +
          landMinSizeUnitValue +
          " AND r_k_l_sqm <= " +
          landMaxSizeUnitValue +
          ")"
      );
    } else if (landMinSizeUnitValue == "" && landMaxSizeUnitValue !== "") {
      value.push("(r_k_l_sqm = " + landMaxSizeUnitValue + ")");
    } else if (landMinSizeUnitValue !== "" && landMaxSizeUnitValue == "") {
      value.push("(r_k_l_sqm = " + landMinSizeUnitValue + ")");
    }

    //Get value of marketing scheme and we register it on "value" array
    if (marketingSchemeValue !== undefined) {
      value.push("(r_k_mkscheme = " + marketingSchemeValue + ")");
    }

    //Get property time period, both from and to must not be empty
    if (TimePeriodFromValue == "" && TimePeriodToValue !== "") {
      let PopupFromEmptyValue = $("#popup-alert-from-empty");
      $(PopupFromEmptyValue).addClass("show");
      setTimeout(function() {
        $(PopupFromEmptyValue).removeClass("show");
      }, 2000);
    } else if (TimePeriodFromValue !== "" && TimePeriodToValue == "") {
      let PopupToEmptyValue = $("#popup-alert-to-empty");
      $(PopupToEmptyValue).addClass("show");
      setTimeout(function() {
        $(PopupToEmptyValue).removeClass("show");
      }, 2000);
    }

    if (TimePeriodFromValue !== "" && TimePeriodToValue !== "") {
      value.push(
        "(r_k_time_period between '" +
          TimePeriodFromValue +
          "' AND '" +
          TimePeriodToValue +
          "')"
      );
    }

    //Get property available
    for (let i = 0; i < propertyAvailable.length; i++) {
      if ($(propertyAvailable[i]).prop("checked") == true) {
        arrPropAvailable.push(
          "(r_k_p_available = '" + $(propertyAvailable[i]).val() + "')"
        );
      }
    }

    var queryAvailable = "";
    if (arrPropAvailable.length > 1) {
      queryAvailable =
        "(" + arrPropAvailable[0] + " OR " + arrPropAvailable[1] + ")";
      value.push(queryAvailable);
    } else if (arrPropAvailable.length == 1) {
      queryAvailable = arrPropAvailable[0];
      value.push(queryAvailable);
    }

    //Get property sold
    for (let i = 0; i < propertySold.length; i++) {
      if ($(propertySold[i]).prop("checked") == true) {
        arrPropSold.push("(r_k_p_sold = '" + $(propertySold[i]).val() + "')");
      }
    }

    var querySold = "";
    if (arrPropSold.length > 1) {
      querySold = "(" + arrPropSold[0] + " OR " + arrPropSold[1] + ")";
      value.push(querySold);
    } else if (arrPropSold.length == 1) {
      querySold = arrPropSold[0];
      value.push(querySold);
    }

    //Get property valuation
    for (let i = 0; i < propertyValuation.length; i++) {
      if ($(propertyValuation[i]).prop("checked") == true) {
        arrPropValuation.push(
          "(r_k_p_valuation = '" + $(propertyValuation[i]).val() + "')"
        );
      }
    }

    var queryValuation = "";
    if (arrPropValuation.length > 1) {
      queryValuation =
        "(" + arrPropValuation[0] + " OR " + arrPropValuation[1] + ")";
      value.push(queryValuation);
    } else if (arrPropValuation.length == 1) {
      queryValuation = arrPropValuation[0];
      value.push(queryValuation);
    }

    //We use for to adding value to query
    for (let i = 0; i < value.length; i++) {
      if (i > 0) {
        queryWhere += " AND ";
      }
      queryWhere += value[i];
    }

    var layersRequest = {
      query: {
        f: "json"
      },
      responseType: "json"
    };

    EsriRequest(
      "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/MapServer/0",
      layersRequest
    ).then(function(response) {
      console.log("response", response);
      lyrFields = response.data.fields;
    });

    function getFldAlias(fieldName) {
      var retVal = "";
      arrayUtils.forEach(lyrFields, function(item) {
        if (item.name === fieldName) {
          retVal = item.alias;
          return true;
        }
      });
      return retVal;
    }

    console.log(queryWhere);

    let query = new ESRI.Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.outSpatialReference = map.ObjMap.spatialReference;
    query.where = queryWhere;

    $("#loading-bar").show();

    colliersProperty.queryFeatures(query).then(function(results) {
      if (results.features.length < 1) {
        $("#loading-bar").hide();
      }
      displayResults(results);
    });

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

      convertCSV.processCSVData(
        convertData.getRowofTextArray(attributes),
        "custom",
        geometry,
        alias,
        true
      );
      $("#loading-bar").hide();
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
