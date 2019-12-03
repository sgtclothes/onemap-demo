var submitFilterServices = function (map) {
    $(document).delegate("#button-filter-property", "click", async function () {

        //Setting name for label service
        let propertyTypeLabel = "property_type"
        let marketingSchemeLabel = "marketing_scheme"
        let strataLabel = "strata"
        let landSqmLabel = "price_per_sqm_gross_idr"
        let buildSqmLabel = "buildSqm"
        let timePeriodLabel = "last_update"
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

        var validation = true;

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
        let timePeriodFromValue = $("#time-period-from-value").val();
        let timePeriodToValue = $("#time-period-to-value").val();
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
        let propertyValuationValue = $("input[name='sub-property-valuation']")
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
            value.push("(lower(" + marketingSchemeLabel + ") = '" + marketingSchemeValue + "')");
        }

        // Get value of land size meters and we register it on "value" array #bugs
        if (landMinSizeMeterValue !== "" && landMaxSizeMeterValue !== "") {
            value.push(
                "(cast(coalesce(nullif(trim(" + landSqmLabel + "),''),'0') as double precision) >= " +
                landMinSizeMeterValue +
                " AND " + "cast(coalesce(nullif(trim(" + landSqmLabel + "),''),'0') as double precision) <= " +
                landMaxSizeMeterValue +
                ")"
            );
        } else if (landMinSizeMeterValue == "" && landMaxSizeMeterValue !== "") {
            value.push("(cast(coalesce(nullif(trim(" + landSqmLabel + "),''),'0') as double precision) = " + landMaxSizeMeterValue + ")")
        } else if (landMinSizeMeterValue !== "" && landMaxSizeMeterValue == "") {
            value.push("(cast(coalesce(nullif(trim(" + landSqmLabel + "),''),'0') as double precision) = " + landMinSizeMeterValue + ")");
        }

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
        if (timePeriodFromValue == "" && timePeriodToValue !== "") {
            alert("Please input 'from' date")
            validation = false
        } else if (timePeriodFromValue !== "" && timePeriodToValue == "") {
            alert("Please input 'to' date")
            validation = false
        } else if (timePeriodFromValue !== "" && timePeriodToValue !== "") {
            value.push("(" + timePeriodLabel + " between to_timestamp('" + timePeriodFromValue + "','MM/DD/YYYY') and to_timestamp('" + timePeriodToValue + "','MM/DD/YYYY'))")
        }

        propertyServiceStatusValue = []

        if (propertyForSale.includes("available")) {
            propertyServiceStatusValue.push("(lower(property_status) = 'available' AND lower(property_service) = 'by colliers')")
        }
        if (propertyForSale.includes("listing")) {
            propertyServiceStatusValue.push("(lower(property_status) = 'listing' AND lower(property_service) = 'by colliers')")
        }
        if (propertyForSale.includes("others")) {
            propertyServiceStatusValue.push("(lower(property_status) = 'available' AND lower(property_service) = 'by others')")
        }

        if (propertySold.includes("colliers")) {
            propertyServiceStatusValue.push("(lower(property_status) = 'sold' AND lower(property_service) = 'by colliers')")
        }
        if (propertySold.includes("others")) {
            propertyServiceStatusValue.push("(lower(property_status) = 'sold' AND lower(property_service) = 'by others')")
        }

        if (propertyValuation.includes("kjpprhr")) {
            propertyServiceStatusValue.push("(lower(property_status) = 'valuation' AND lower(property_service) = 'by kjpprhr')")
        }
        if (propertySold.includes("others")) {
            propertyServiceStatusValue.push("(lower(property_status) = 'valuation' AND lower(property_service) = 'by others')")
        }

        if (propertyServiceStatusValue.length > 0) {
            let a = "("
            for (let i = 0; i < propertyServiceStatusValue.length; i++) {
                a += propertyServiceStatusValue[i]
                if (propertyServiceStatusValue[i + 1] !== undefined) {
                    a += " OR "
                }
            }
            a += ")"
            value.push(a)
        }


        for (let i = 0; i < value.length; i++) {
            queryWhere += "(" + value[i] + ")"
            if (value[i + 1] !== undefined) {
                queryWhere += " AND "
            }
        }

        console.log(queryWhere)

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


        if (validation == true) {
            //Get feature service
            featureService.push(colliersPropertyStaging)

            let propertyList = ["office", "house", "ruko", "industrial/logistic", "data center", "shopping center", "apartment", "hotel", "others"]
            let propertyListPunc = []

            let punctuations = [/\s/g, "&", "'", ".", "/"]
            let tr = $(".tableLegendProperty").find("tr")
            for (let i = 0; i < propertyList.length; i++) {
                propertyListPunc[i] = punctuationFixer(punctuations, "_", propertyList[i])
                for (let j = 0; j < tr.length; j++) {
                    if ($(tr[j]).attr("id").split("-")[2] == propertyListPunc[i]) {
                        $(tr[j]).remove()
                    }
                }
            }

            for (let j = 0; j < property.length; j++) {
                if (displayedLegend.includes(property[j])) {
                    let index = displayedLegend.indexOf(property[j])
                    displayedLegend.splice(index, 1)
                } else {
                    displayedLegend.push(property[j])
                }
            }

            if (queryWhere == "") {
                property = propertyList
            }

            loading("show")
            actionElement(".popupFilter", "remove")

            if (checkGraphicsExist(map).length > 0) {
                for (let i = 0; i < checkGraphicsExist(map).length; i++) {
                    await processQuery(map, featureService[0], queryWhere, ["*"], checkGraphicsExist(map)[i]).then(async function (results) {
                        if (results.features.length < 1) {
                            loading("hide")
                            actionElement(".legendProperty", "remove")
                        } else {
                            await displayResultsGraphicsPropertyColliers(map, results)
                        }
                    })
                }
                await setTimeout(async () => {
                    loading("hide")
                    await displayLegendPropertyColliers(map, "LEGEND", property)
                }, 10000);
                checkHeightLegend()
            } else {
                await processQuery(map, featureService[0], queryWhere, ["*"]).then(async function (results) {
                    if (results.features.length < 1) {
                        loading("hide")
                        actionElement(".legendProperty", "remove")
                    } else {
                        await displayResultsGraphicsPropertyColliers(map, results)
                    }
                })
                await setTimeout(async () => {
                    loading("hide")
                    await displayLegendPropertyColliers(map, "LEGEND", property)
                }, 10000);
                checkHeightLegend()
            }
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
            ele.geometry.dynamic = "yes"
            geometryRadius.push(ele)
        }
    });

    getItemsGroupLayer(polygons).forEach(ele => {
        if (ele.selector == "polygon-graphics") {
            geometryPolygons.push(ele)
        }
    });

    getItemsGroupLayer(drivingTime).forEach(ele => {
        if (ele.selector == "drivetime-graphics") {
            geometryDrivingTime.push(ele)
        }
    });

    getItemsGroupLayer(drivingDistance).forEach(ele => {
        if (ele.selector == "drivedistance-graphics") {
            geometryDrivingDistance.push(ele)
        }
    });

    getItemsGroupLayer(rectangles).forEach(ele => {
        if (ele.selector == "rectangle-graphics") {
            geometryRectangles.push(ele)
        }
    });

    geometryUnions = geometryRadius.concat(geometryPolygons, geometryDrivingTime, geometryDrivingDistance, geometryRectangles)
    return geometryUnions
}

var removeFilterResults = function (map) {
    $(document).delegate("#button-filter-remove-property", "click", function () {
        //Remove all objects in map
        map.ObjMapView.graphics.removeAll();
        setStartLocalStorage(map)

        //Reset all grouplayers
        for (let i = 0; i < groupLayers.length; i++) {
            groupLayers[i].removeAll()
        }

        //Close contextmenu
        actionElement(".contextmenu-container", "remove")
        actionElement(".legendProperty", "remove")
        actionElement("#label-radius", "remove")
        window.displayedLegend = []
        window.legendOverflow = false
        $(".div-tableLegendProperty").css("height", "auto")
        $(".div-tableLegendProperty").css("overflow-y", "")

        //Reset filter components
        actionElement(".popupFilter", "remove");
        $("input[name='select-property']").prop("checked", false);
        $("input[name='marketing-scheme-input']").prop("checked", false);

        //Uncheck all External Data
        let inputExternalData = $("#table-external-data").find("input[type='checkbox']")
        for (let i = 0; i < inputExternalData.length; i++) {
            $(inputExternalData).prop("checked", false)
        }

        console.log($("#label-radius"))
    });
}
