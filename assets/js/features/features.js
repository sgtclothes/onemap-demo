var inputFeatures = function (map) {
    $(document).delegate(".btn-submit-add-features", "click", function () {
        var longitude = $("#key-longitude-colliers").val()
        var latitude = $("#key-latitude-colliers").val()
        var propertyType = $("#key-property-type-colliers").val()
        var propertyAddress = $("#key-property-address-colliers").val()
        var exchangeRate = $("#key-exchange-rate-colliers").val()
        var actionDate = $("#key-action-date-colliers").val()
        var currency = $("#key-currency-colliers").val()
        var totalIDR = $("#key-total-idr-colliers").val()
        var totalUSD = $("#key-total-usd-colliers").val()
        var ppsqmIDR = $("#key-ppsqm-idr-colliers").val()
        var ppsqmUSD = $("#key-ppsqm-usd-colliers").val()
        var ssqm = $("#key-ssqm-colliers").val()
        // var layersRequest = {
        //     query: {
        //         f: "json",
        //         "addResults": [
        //             {
        //                 "geometry": { "x": longitude, "y": latitude },
        //                 "attributes": {
        //                     "property_type": propertyType,
        //                     "property_address": propertyAddress,
        //                     "exchange_rate": exchangeRate,
        //                     "action_date": actionDate,
        //                     "currency": currency,
        //                     "total_idr": totalIDR,
        //                     "total_usd": totalUSD,
        //                     "price_per_sqm_gross_idr": ppsqmIDR,
        //                     "price_per_sqm_gross_usd": ppsqmUSD,
        //                     "sqm_gross": ssqm
        //                 }
        //             }
        //         ]
        //     },
        //     responseType: "json",
        //     usePost: true
        // }

        console.log(token)

        var layersRequest = {
            f: "json",
            adds: [
                {
                    "geometry": { "x": longitude, "y": latitude },
                    "attributes": {
                        "property_type": propertyType,
                        "property_address": propertyAddress,
                        "exchange_rate": exchangeRate,
                        "action_date": actionDate,
                        "currency": currency,
                        "total_idr": totalIDR,
                        "total_usd": totalUSD,
                        "price_per_sqm_gross_idr": ppsqmIDR,
                        "price_per_sqm_gross_usd": ppsqmUSD,
                        "sqm_gross": ssqm
                    }
                }
            ]
        }

        console.log("https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K_staging/FeatureServer/0" + addFeatures)
        makeEsriRequestPOST("https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K_staging/FeatureServer/0" + addFeatures, layersRequest).then(function (results) {
            console.log(results)
        })
        // EsriRequest({
        //     url: "https://gis.locatorlogic.com/arcgis/rest/services/COLLIERS/colliersOneMap_K_staging/FeatureServer/0" + addFeatures,
        //     "adds": [
        //         {
        //             "geometry": { "x": longitude, "y": latitude },
        //             "attributes": {
        //                 "property_type": propertyType,
        //                 "property_address": propertyAddress,
        //                 "exchange_rate": exchangeRate,
        //                 "action_date": actionDate,
        //                 "currency": currency,
        //                 "total_idr": totalIDR,
        //                 "total_usd": totalUSD,
        //                 "price_per_sqm_gross_idr": ppsqmIDR,
        //                 "price_per_sqm_gross_usd": ppsqmUSD,
        //                 "sqm_gross": ssqm
        //             }
        //         }
        //     ],
        //     "usePost": true
        // })
    })
}

$(document).delegate("#key-total-idr-colliers", "input", function () {
    var exchangeRate = $("#key-exchange-rate-colliers").val()
    $("#key-total-usd-colliers").val($(this).val() / exchangeRate)
});

$(document).delegate("#key-total-usd-colliers", "input", function () {
    var exchangeRate = $("#key-exchange-rate-colliers").val()
    $("#key-total-idr-colliers").val($(this).val() * exchangeRate)
});

$(document).delegate("#key-ppsqm-idr-colliers", "input", function () {
    var exchangeRate = $("#key-exchange-rate-colliers").val()
    $("#key-ppsqm-usd-colliers").val($(this).val() / exchangeRate)
});

$(document).delegate("#key-ppsqm-usd-colliers", "input", function () {
    var exchangeRate = $("#key-exchange-rate-colliers").val()
    $("#key-ppsqm-idr-colliers").val($(this).val() * exchangeRate)
});