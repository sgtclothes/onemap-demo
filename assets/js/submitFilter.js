function submitFilter(convertData, mapView, convertCSV) {
  $(document).delegate("#button-filter-property", "click", function() {
    let strata = $("#strata-value").attr("value");
    let propertyTypeValue = $("#property-type-input").val();
    let minSizeValue = $("#min-size").val();
    let maxSizeValue = $("#max-size").val();
    let fromTimePeriodValue = $("#from-time-period").val();
    let toTimePeriodValue = $("#to-time-period").val();
    let query = "";
    let value = [];

    console.log(strata);
    console.log(propertyTypeValue);
    console.log(minSizeValue);
    console.log(maxSizeValue);
    console.log(fromTimePeriodValue);
    console.log(toTimePeriodValue);

    //Strata will be automatically selected, so we get strata value

    //Get value of property type and we register it on "value" array
    if (propertyTypeValue !== "") {
      value.push(
        '(data[i][j].attributes["type"] == "' + propertyTypeValue + '")'
      );
    }

    if (minSizeValue == "" && maxSizeValue !== "") {
      let popupMinEmpty = $("#popup-alert-min-empty");
      $(popupMinEmpty).addClass("show");
      setTimeout(function() {
        $(".popuptext")
          .fadeOut()
          .removeClass("show");
      }, 2000);

      // } else if (minSizeValue !== "" && maxSizeValue == "") {
      //   let popupMaxEmpty = $("#popup-alert-max-empty");
      //   $(popupMaxEmpty).toggleClass("show");
      //   setTimeout(function() {
      //     $(popupMaxEmpty).toggleClass("hide");
      //   }, 3000);
      // } else if (minSizeValue > maxSizeValue) {
      //   let popupMinValid = $("#popup-alert-min-valid");
      //   $(popupMinValid).toggleClass("show");
      //   setTimeout(function() {
      //     $(popupMinValid).toggleClass("hide");
      //   }, 3000);
      // } else if (maxSizeValue < minSizeValue) {
      //   let popupMaxValid = $("#popup-alert-max-valid");
      //   $(popupMaxValid).toggleClass("show");
      //   setTimeout(function() {
      //     $(popupMaxValid).toggleClass("hide");
      //   }, 3000);
    }

    //Filtering text input of min and max value when either min or max has a value

    //Get value of property type and we register it on "value" array
    if (minSizeValue !== "") {
      value.push(
        '(data[i][j].attributes["type"] == "' + propertyTypeValue + '")'
      );
    }

    //We use for to adding value to query
    for (let i = 0; i < value.length; i++) {
      if (i > 0) {
        query += " && ";
      }
      query += value[i];
    }

    console.log(query);

    // let type = ["type",$("#type-property").val()]
    // let status = ["status",$("#status-property").val()]
    // let buildingArea = ["building_area",$("#operator-ba").val(),$("#unit-ba").val(),$("#input-ba").val(),$("#input-ba-between").val()]
    // let landArea = ["land_area",$("#operator-la").val(),$("#unit-la").val(),$("#input-la").val(),$("#input-la-between").val()]
    // let price = ["price",$("#operator-price").val(),$("#unit-price").val(),$("#input-price").val(),$("#input-price-between").val()]
    // let value = []
    // let query = ""

    // if(type[1] !== "") {
    //     value.push('(data[i][j].attributes["'+type[0]+'"] == "'+type[1]+'")')
    // }
    // if(status[1] !== "") {
    //     value.push('(data[i][j].attributes["'+status[0]+'"] == "'+status[1]+'")')
    // }
    // if(buildingArea[3] !== "") {
    //     if(buildingArea[1] !== "between") {
    //         value.push('(data[i][j].attributes["'+buildingArea[0]+'"] '+buildingArea[1]+" "+buildingArea[3]+" && "+'data[i][j].attributes["building_area_unit"] == "'+buildingArea[2]+'")')
    //     } else {
    //         if(buildingArea[3]<buildingArea[4]) {
    //             value.push('((data[i][j].attributes["'+buildingArea[0]+'"] >= '+buildingArea[3]+" && "+'data[i][j].attributes["'+buildingArea[0]+'"] <= '+buildingArea[4]+')'+" && "+'(data[i][j].attributes["building_area_unit"] == "'+buildingArea[2]+'"))')
    //         } else if(buildingArea[3]>buildingArea[4]) {
    //             value.push('((data[i][j].attributes["'+buildingArea[0]+'"] <= '+buildingArea[3]+" && "+'data[i][j].attributes["'+buildingArea[0]+'"] >= '+buildingArea[4]+')'+" && "+'(data[i][j].attributes["building_area_unit"] == "'+buildingArea[2]+'"))')
    //         }
    //     }
    // }
    // if(landArea[3] !== "") {
    //     if(landArea[1] !== "between") {
    //         value.push('(data[i][j].attributes["'+landArea[0]+'"] '+landArea[1]+" "+landArea[3]+" && "+'data[i][j].attributes["land_area_unit"] == "'+landArea[2]+'")')
    //     } else {
    //         if(landArea[3]<landArea[4]) {
    //             value.push('(data[i][j].attributes["'+landArea[0]+'"] >= '+landArea[3]+" && "+'data[i][j].attributes["'+landArea[0]+'"] <= '+landArea[4]+')'+" && "+'(data[i][j].attributes["land_area_unit"] == "'+landArea[2]+'"))')
    //         } else if(landArea[3]>landArea[4]) {
    //             value.push('(data[i][j].attributes["'+landArea[0]+'"] <= '+landArea[3]+" && "+'data[i][j].attributes["'+landArea[0]+'"] >= '+landArea[4]+')'+" && "+'(data[i][j].attributes["land_area_unit"] == "'+landArea[2]+'"))')
    //         }
    //     }
    // }
    // if(price[3] !== "") {
    //     if(price[1] !== "between") {
    //         value.push('(data[i][j].attributes["'+price[0]+'"] '+price[1]+" "+price[3]+" && "+'data[i][j].attributes["price_unit"] == "'+price[2]+'")')
    //     } else {
    //         if(price[3]<price[4]) {
    //             value.push('(data[i][j].attributes["'+price[0]+'"] >= '+price[3]+" && "+'data[i][j].attributes["'+price[0]+'"] <= '+price[4]+')'+" && "+'(data[i][j].attributes["price_unit"] == "'+price[2]+'"))')
    //         } else if(price[3]>price[4]) {
    //             value.push('(data[i][j].attributes["'+price[0]+'"] <= '+price[3]+" && "+'data[i][j].attributes["'+price[0]+'"] >= '+price[4]+')'+" && "+'(data[i][j].attributes["price_unit"] == "'+price[2]+'"))')
    //         }
    //     }
    // }

    // console.log(query);

    // let data = JSON.parse(localStorage.getItem("data"));
    // let dataFilter = [];
    // let isFiltered = true;
    // for (let i in data) {
    //   for (let j in data[i]) {
    //     if (eval(query)) {
    //     //   $("input[name='pois'][value='" + i + "']").prop("checked", true);
    //       dataFilter.push(data[i][j].attributes);
    //       getFilteredData(i, j, isFiltered);
    //       isFiltered = false;
    //     }
    //   }
    // }

    // $(".form-popup-filter").hide();

    // function getFilteredData(i, j, isFiltered) {
    //     if (isFiltered == true) {
    //       for (let i in mapView.graphics.items) {
    //         mapView.graphics.items[i].visible = false;
    //         mapView.graphics.items = [];
    //       }
    //     }
    //     $(".custom-data-master-select-all-poi")
    //       .find("input:checkbox")
    //       .prop("checked", false);
    //     let data = JSON.parse(localStorage.getItem("data"));
    //     convertCSV.setPushDataOnly(true);
    //     convertCSV.processCSVData(
    //       convertData.getRowofTextArray([data[i][j].attributes])
    //     );
    //     convertCSV.setPushDataOnly(false);
    //     mapView.graphics.add(convertCSV.TempData);

    //     let dataFilter = JSON.parse(localStorage.getItem("dataFilter"));
    //     if (dataFilter == undefined) {
    //       dataFilter = [];
    //       dataFilter.push(convertCSV.TempData);
    //     } else {
    //       dataFilter.push(convertCSV.TempData);
    //     }

    //     localStorage.setItem("dataFilter", JSON.stringify(dataFilter));
    //     console.log(JSON.parse(localStorage.getItem("dataFilter")));

    //     let uidsFilter = JSON.parse(localStorage.getItem("uidsFilter"));
    //     if (uidsFilter == undefined) {
    //       uidsFilter = [];
    //       uidsFilter.push(convertCSV.Uids);
    //     } else {
    //       uidsFilter.push(convertCSV.Uids);
    //     }

    //     localStorage.setItem("uidsFilter", JSON.stringify(uidsFilter));
    //     console.log(JSON.parse(localStorage.getItem("uidsFilter")));

    //     // createFilteredViewer();
    //   }
  });
}
