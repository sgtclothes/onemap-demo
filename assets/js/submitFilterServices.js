function submitFilterServices(convertData, map, convertCSV) {
  $(document).delegate("#button-filter-property", "click", function() {
    let colliersServicePopupTemplate = {
      title: "Colliers Property",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "buildingname",
              label: "Building Name",
              visible: true
            }
          ]
        }
      ]
    };
    let colliersProperty = new ESRI.FeatureLayer({
      url:
        "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliers_onemap_data_dummy1/FeatureServer/0"
    });

    let markerSymbol = new ESRI.SimpleMarkerSymbol({
      color: [240, 65, 65],
      outline: {
        color: [240, 65, 65],
        width: 0.2
      }
    });

    var resultsLayer = new ESRI.GraphicsLayer();

    map.ObjMap.add(resultsLayer);
    map.ObjMapView.graphics.removeAll();
    //Define variables to get filter value
    let strataValue = $("input[name='strata-input']:checked").val();
    let propertyTypeValue = $("#property-type-value").val();
    let propertyUnitSizeValue = $("#property-unit-size-value").val();
    let propertyMinSizeValue = $("#property-min-size-value").val();
    let propertyMaxSizeValue = $("#property-max-size-value").val();
    let propertyFromTimePeriodValue = $(
      "#property-from-time-period-value"
    ).val();
    let propertyToTimePeriodValue = $("#property-to-time-period-value").val();
    let landUnitSizeValue = $("#land-unit-size-value").val();
    let landMinSizeValue = $("#land-min-size-value").val();
    let landMaxSizeValue = $("#land-max-size-value").val();
    let landFromTimePeriodValue = $("#land-from-time-period-value").val();
    let landToTimePeriodValue = $("#land-to-time-period-value").val();
    let queryWhere = "";
    let value = [];

    //Strata will be automatically selected, so we get strata value
    //We set boolean value 0 = No, 1 = Yes
    if (strataValue !== undefined) {
      if (strataValue == "yes") strataValue = 1;
      else if (strataValue == "no") strataValue = 0;
      value.push("(r_k_strata = " + strataValue + ")");
    }

    // Get value of property type and we register it on "value" array
    if (propertyTypeValue !== null) {
      let q = "(";
      for (let i = 0; i < propertyTypeValue.length; i++) {
        q += "(propertytype = '" + propertyTypeValue[i] + "')";
        if (propertyTypeValue[i + 1] !== undefined) {
          q += " OR ";
        }
      }
      q += ")";
      value.push(q);
    }

    //Get value of property unit size and we register it on "value" array
    if (
      propertyUnitSizeValue !== null &&
      (propertyMinSizeValue !== "" && propertyMaxSizeValue !== "")
    ) {
      if (propertyUnitSizeValue == "meter-square") {
        value.push(
          "(r_k_p_sqm >= " +
            propertyMinSizeValue +
            " AND r_k_p_sqm <= " +
            propertyMaxSizeValue +
            ")"
        );
      } else if (propertyUnitSizeValue == "hectare") {
        value.push(
          "(r_k_p_sqha >= " +
            propertyMinSizeValue +
            " AND r_k_p_sqha <= " +
            propertyMaxSizeValue +
            ")"
        );
      } else if (propertyUnitSizeValue == "feet") {
        value.push(
          "(r_k_p_sqft >= " +
            propertyMinSizeValue +
            " AND r_k_p_sqft <= " +
            propertyMaxSizeValue +
            ")"
        );
      }
    } else if (propertyMinSizeValue == "" && propertyMaxSizeValue !== "") {
      value.push("(r_k_p_sqha = " + propertyMaxSizeValue + ")");
    } else if (propertyMinSizeValue !== "" && propertyMaxSizeValue == "") {
      value.push("(r_k_p_sqha = " + propertyMinSizeValue + ")");
    }

    //Get property time period, both from and to must not be empty
    if (propertyFromTimePeriodValue == "" && propertyToTimePeriodValue !== "") {
      let propertyPopupFromEmptyValue = $("#property-popup-alert-from-empty");
      $(propertyPopupFromEmptyValue).addClass("show");
      setTimeout(function() {
        $(propertyPopupFromEmptyValue).removeClass("show");
      }, 2000);
    } else if (
      propertyFromTimePeriodValue !== "" &&
      propertyToTimePeriodValue == ""
    ) {
      let propertyPopupToEmptyValue = $("#property-popup-alert-to-empty");
      $(propertyPopupToEmptyValue).addClass("show");
      setTimeout(function() {
        $(propertyPopupToEmptyValue).removeClass("show");
      }, 2000);
    }

    if (
      propertyFromTimePeriodValue !== "" &&
      propertyToTimePeriodValue !== ""
    ) {
      value.push(
        "(r_k_time_period between '" +
          propertyFromTimePeriodValue +
          "' AND '" +
          propertyToTimePeriodValue +
          "')"
      );
    }

    //Get value of land unit size and we register it on "value" array
    if (
      landUnitSizeValue !== null &&
      (landMinSizeValue !== "" && landMaxSizeValue !== "")
    ) {
      if (landUnitSizeValue == "meter-square") {
        value.push(
          "(r_k_l_sqm >= " +
            landMinSizeValue +
            " AND r_k_l_sqm <= " +
            landMaxSizeValue +
            ")"
        );
      } else if (landUnitSizeValue == "hectare") {
        value.push(
          "(r_k_l_sqha >= " +
            landMinSizeValue +
            " AND r_k_l_sqha <= " +
            landMaxSizeValue +
            ")"
        );
      } else if (landUnitSizeValue == "feet") {
        value.push(
          "(r_k_l_sqft >= " +
            landMinSizeValue +
            " AND r_k_l_sqft <= " +
            landMaxSizeValue +
            ")"
        );
      }
    } else if (landMinSizeValue == "" && landMaxSizeValue !== "") {
      value.push("(r_k_l_sqha = " + landMaxSizeValue + ")");
    } else if (landMinSizeValue !== "" && landMaxSizeValue == "") {
      value.push("(r_k_l_sqha = " + landMinSizeValue + ")");
    }
    //Get land time period, both from and to must not be empty
    if (landFromTimePeriodValue == "" && landToTimePeriodValue !== "") {
      let landPopupFromEmptyValue = $("#land-popup-alert-from-empty");
      $(landPopupFromEmptyValue).addClass("show");
      setTimeout(function() {
        $(landPopupFromEmptyValue).removeClass("show");
      }, 2000);
    } else if (landFromTimePeriodValue !== "" && landToTimePeriodValue == "") {
      let landPopupToEmptyValue = $("#land-popup-alert-to-empty");
      $(landPopupToEmptyValue).addClass("show");
      setTimeout(function() {
        $(landPopupToEmptyValue).removeClass("show");
      }, 2000);
    }

    if (landFromTimePeriodValue !== "" && landToTimePeriodValue !== "") {
      value.push(
        "(r_k_l_time_period between '" +
          landFromTimePeriodValue +
          "' AND '" +
          landToTimePeriodValue +
          "')"
      );
    }

    let checkboxStatusAvailable = $(".property-status-available");
    let checkboxStatusSold = $(".property-status-sold");
    let checkboxStatusValuation = $(".property-status-valuation");

    let a = [];
    let b = [];
    let c = [];

    let headAvailability = [
      "r_k_property_availability",
      "r_k_property_availability"
    ];
    let headSold = ["r_k_property_sold_by", "r_k_property_sold_by"];
    let headValuation = ["r_k_property_valuation", "r_k_property_valuation"];

    let listAvailable = ["Listing", "Available"];
    let listSold = ["Colliers", "Others"];
    let listValuation = ["KJPP", "Others"];

    for (let i = 0; i < checkboxStatusAvailable.length; i++) {
      if ($(checkboxStatusAvailable[i]).prop("checked") == true) {
        a.push("(" + headAvailability[i] + " = '" + listAvailable[i] + "')");
      }
    }

    console.log(a);

    for (let i = 0; i < checkboxStatusSold.length; i++) {
      if ($(checkboxStatusSold[i]).prop("checked") == true) {
        b.push("(" + headSold[i] + " = '" + listSold[i] + "')");
      }
    }

    console.log(b);

    for (let i = 0; i < checkboxStatusValuation.length; i++) {
      if ($(checkboxStatusValuation[i]).prop("checked") == true) {
        c.push("(" + headValuation[i] + " = '" + listValuation[i] + "')");
      }
    }

    console.log(c);

    let stat = [];

    if (a.length > 1) {
      let valA = "(";
      for (let j = 0; j < a.length; j++) {
        valA += a[j];
        console.log(a[j + 1]);
        if (a[j + 1] !== undefined) {
          valA += " OR ";
        }
      }
      valA += ")";
      stat.push(valA);
    } else if (a.length == 1) {
      stat.push(a[0]);
    }

    if (b.length > 1) {
      let valB = "(";
      for (let j = 0; j < b.length; j++) {
        valB += b[j];
        console.log(b[j + 1]);
        if (b[j + 1] !== undefined) {
          valB += " OR ";
        }
      }
      valB += ")";
      stat.push(valB);
    } else if (b.length == 1) {
      stat.push(b[0]);
    }

    if (c.length > 1) {
      let valC = "(";
      for (let j = 0; j < c.length; j++) {
        valC += c[j];
        console.log(c[j + 1]);
        if (c[j + 1] !== undefined) {
          valC += " OR ";
        }
      }
      valC += ")";
      stat.push(valC);
    } else if (c.length == 1) {
      stat.push(c[0]);
    }

    console.log(stat);

    if (stat.length > 1) {
      let val = "(";
      for (let k = 0; k < stat.length; k++) {
        val += stat[k];
        if (stat[k + 1] !== undefined) {
          val += " AND ";
        }
      }
      val += ")";
      value.push(val);
    } else {
      if (stat.length == 1) value.push(stat[0]);
    }

    //We use for to adding value to query
    for (let i = 0; i < value.length; i++) {
      if (i > 0) {
        queryWhere += " AND ";
      }
      queryWhere += value[i];
    }

    console.log(queryWhere);

    let query = new ESRI.Query();
    query.returnGeometry = true;
    query.outFields = ["*"];
    query.outSpatialReference = map.ObjMap.spatialReference;
    query.where = queryWhere;

    colliersProperty.queryFeatures(query).then(function(results) {
      // you need to call your displayResults function
      displayResults(results);
    });

    // view and print the number of results to the DOM
    function displayResults(results) {
      resultsLayer.removeAll();
      console.log(results.features)
      results.features.forEach(function(feature) {
        var g = new ESRI.Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: {
            type: "simple-marker",
            color: [0, 0, 0],
            outline: {
              width: 2,
              color: [0, 255, 255]
            },
            size: "20px"
          },
          popupTemplate: {
            title: "Colliers Properties",
            content: "{buildingname}"
          }
        });
        resultsLayer.add(g);
      });
    }
  });
}

function validateDate(value) {
  let dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if (value.match(dateformat)) {
    //Test which seperator is used '/' or '-'
    let opera1 = value.split("/");
    let opera2 = value.split("-");
    lopera1 = opera1.length;
    lopera2 = opera2.length;
    // Extract the string into month, date and year
    if (lopera1 > 1) {
      var pdate = value.split("/");
    } else if (lopera2 > 1) {
      var pdate = value.split("-");
    }
    let dd = parseInt(pdate[0]);
    let mm = parseInt(pdate[1]);
    let yy = parseInt(pdate[2]);
    // Create list of days of a month [assume there is no leap year by default]
    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm == 1 || mm > 2) {
      if (dd > ListofDays[mm - 1]) {
        return false;
      }
    }
    if (mm == 2) {
      let lyear = false;
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        lyear = true;
      }
      if (lyear == false && dd >= 29) {
        return false;
      }
      if (lyear == true && dd > 29) {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}
