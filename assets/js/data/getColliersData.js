var getColliersData = async function (map, attributes) {

    let actionDate = attributes.action_date
    let a = new Date(actionDate);
    actionDate =
        a.getDate() + "-" + (a.getMonth() + 1) + "-" + a.getFullYear();
    if (actionDate === "NaN-NaN-NaN") {
        actionDate = undefined
    }
    let lastUpdate = attributes.last_update
    let b = new Date(lastUpdate);
    lastUpdate =
        b.getDate() + "-" + (b.getMonth() + 1) + "-" + b.getFullYear();
    if (lastUpdate === "NaN-NaN-NaN") {
        lastUpdate = undefined
    }
    let currency = attributes.currency
    let exchangeRate = numberValidation(attributes.exchange_rate)
    let id = attributes.id
    let klb = numberValidation(attributes.klb)
    let marketingScheme = attributes.marketing_scheme
    let njop = Number(attributes.njop)
    let objectId = attributes.objectid
    let pricePerSqmGrossIDR = numberValidation(attributes.price_per_sqm_gross_idr)
    let pricePerSqmGrossUSD = numberValidation(attributes.price_per_sqm_gross_usd)
    let pricePerSqmSganettIDR = numberValidation(attributes.price_per_sqm_sganett_idr)
    let pricePerSqmSganettUSD = numberValidation(attributes.price_per_sqm_sganett_usd)
    let priceType = attributes.price_type
    let propertyAddress = attributes.property_address
    let propertyColliersContact = attributes.property_colliers_contact
    let propertyLat = attributes.property_lat
    let propertyLng = attributes.property_lng
    let propertyName = attributes.property_name
    let propertyPhoto = attributes.property_photo
    let propertyService = attributes.property_service
    let propertyStatus = attributes.property_status
    let propertyType = attributes.property_type
    let semigross = numberValidation(attributes.semigross)
    let source = attributes.source
    let sqmSganett = numberValidation(attributes.sqm_sganett)
    let totalIDR = numberValidation(attributes.total_idr)
    let totalUSD = numberValidation(attributes.total_usd)
    let unitsKeys = numberValidation(attributes.units_keys)

    let exchangeRateIDRToUSD = undefined
    let exchangeRateUSDToIDR = undefined

    await $.get("https://api.exchangeratesapi.io/latest?base=IDR&symbols=USD", function (data) {
        exchangeRateIDRToUSD = data.rates.USD
    });

    await $.get("https://api.exchangeratesapi.io/latest?base=USD&symbols=IDR", function (data) {
        exchangeRateUSDToIDR = data.rates.IDR
    });

    if (exchangeRateIDRToUSD == undefined || exchangeRateIDRToUSD == null) {
        exchangeRateIDRToUSD = 0.0000711921
    }
    if (exchangeRateUSDToIDR == undefined || exchangeRateUSDToIDR == null) {
        exchangeRateIDRToUSD = 14046.4973887988
    }

    /********LAND SIDE **********/

    //Compare two values -- land total IDR and USD
    let landTotalIDR = totalIDR
    let landTotalUSD = totalUSD
    if (totalIDR !== 0 && totalUSD == 0) {
        landTotalUSD = numberValidation(createFormula(totalIDR * exchangeRateIDRToUSD))
    } else if (totalIDR == 0 && totalUSD !== 0) {
        landTotalIDR = numberValidation(createFormula(totalUSD * exchangeRateUSDToIDR))
    }

    //Compare two values -- land size sqm gross IDR and USD
    let landSizeSqmGrossIDR = 0
    let landSizeSqmGrossUSD = 0
    if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD == 0) {
        if (pricePerSqmGrossIDR !== 0 && totalIDR !== 0) {
            landSizeSqmGrossIDR = numberValidation(createFormula(totalIDR / pricePerSqmGrossIDR))
        }
    } else if (pricePerSqmGrossIDR == 0 && pricePerSqmGrossUSD !== 0) {
        if (pricePerSqmGrossUSD !== 0 && totalUSD !== 0) {
            landSizeSqmGrossUSD = numberValidation(createFormula(totalUSD / pricePerSqmGrossUSD))
        }
    }

    if (landSizeSqmGrossIDR !== 0 && landSizeSqmGrossUSD == 0) {
        landSizeSqmGrossUSD = numberValidation(createFormula(landSizeSqmGrossIDR * exchangeRateIDRToUSD))
    } else if (landSizeSqmGrossIDR == 0 && landSizeSqmGrossUSD !== 0) {
        landSizeSqmGrossIDR = numberValidation(createFormula(landSizeSqmGrossUSD * exchangeRateUSDToIDR))
    }

    //Compare two values -- land size sqm sganett IDR and USD
    let landSizeSqmSganettIDR = 0
    let landSizeSqmSganettUSD = 0
    if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD == 0) {
        if (pricePerSqmSganettIDR !== 0 && totalIDR !== 0) {
            landSizeSqmSganettIDR = numberValidation(createFormula(totalIDR / pricePerSqmSganettIDR))
        }
    } else if (pricePerSqmSganettIDR == 0 && pricePerSqmSganettUSD !== 0) {
        if (pricePerSqmSganettUSD !== 0 && totalUSD !== 0) {
            landSizeSqmSganettUSD = numberValidation(createFormula(totalUSD / pricePerSqmSganettUSD))
        }
    }

    if (landSizeSqmSganettIDR !== 0 && landSizeSqmSganettUSD == 0) {
        landSizeSqmSganettUSD = numberValidation(createFormula(landSizeSqmSganettIDR * exchangeRateIDRToUSD))
    } else if (landSizeSqmSganettIDR == 0 && landSizeSqmSganettUSD !== 0) {
        landSizeSqmSganettIDR = numberValidation(createFormula(landSizeSqmSganettUSD * exchangeRateUSDToIDR))
    }

    //land units/keys

    let landSizeUnitKeysIDR = 0
    let landSizeUnitKeysUSD = 0

    landSizeUnitKeysIDR = unitsKeys
    landSizeUnitKeysUSD = unitsKeys

    //Compare two values -- land size price per sqm gross IDR and USD

    let landPricePerSqmGrossIDR = pricePerSqmGrossIDR
    let landPricePerSqmGrossUSD = pricePerSqmGrossUSD

    if (landPricePerSqmGrossIDR !== 0 && landPricePerSqmGrossUSD == 0) {
        landPricePerSqmGrossUSD = numberValidation(createFormula(landPricePerSqmGrossIDR * exchangeRateIDRToUSD))
    } else if (landPricePerSqmGrossIDR == 0 && landPricePerSqmGrossUSD !== 0) {
        landPricePerSqmGrossIDR = numberValidation(createFormula(landPricePerSqmGrossUSD * exchangeRateUSDToIDR))
    }

    //Compare two values -- land size price per sqm sganett IDR and USD

    let landPricePerSqmSganettIDR = pricePerSqmSganettIDR
    let landPricePerSqmSganettUSD = pricePerSqmSganettUSD

    if (landPricePerSqmSganettIDR !== 0 && landPricePerSqmSganettUSD == 0) {
        landPricePerSqmSganettUSD = numberValidation(createFormula(landPricePerSqmSganettIDR * exchangeRateIDRToUSD))
    } else if (landPricePerSqmSganettIDR == 0 && landPricePerSqmSganettUSD !== 0) {
        landPricePerSqmSganettIDR = numberValidation(createFormula(landPricePerSqmSganettUSD * exchangeRateUSDToIDR))
    }

    //Land price per unit key

    let landPricePerUnitKeyIDR = 0
    let landPricePerUnitKeyUSD = 0

    //Land NJOP Price Total
    let landNJOPPriceTotalIDR = njop
    let landNJOPPriceTotalUSD = numberValidation(createFormula(exchangeRateIDRToUSD * njop))

    //Land NJOP Price Per Sqm
    let landNJOPPricePerSqmIDR = njop
    let landNJOPPricePerSqmUSD = numberValidation(createFormula(exchangeRateIDRToUSD * njop))

    //Land NJOP Percent
    let landNJOPPercentIDR = 0
    let landNJOPPercentUSD = 0

    /********END OF LAND SIDE **********/

    /********BUILDING SIDE **********/

    //Compare two values -- building total IDR and USD
    let buildingTotalIDR = 0
    let buildingTotalUSD = 0
    if (totalIDR !== 0 && totalUSD == 0) {
        buildingTotalUSD = numberValidation(createFormula(0 * exchangeRateIDRToUSD))
    } else if (totalIDR == 0 && totalUSD !== 0) {
        buildingTotalIDR = numberValidation(createFormula(0 * exchangeRateUSDToIDR))
    }

    //Compare two values -- building size sqm gross IDR and USD
    let buildingSizeSqmGrossIDR = 0
    let buildingSizeSqmGrossUSD = 0
    if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD == 0) {
        if (pricePerSqmGrossIDR !== 0 && totalIDR !== 0) {
            buildingSizeSqmGrossIDR = numberValidation(createFormula(0 / pricePerSqmGrossIDR))
        }
    } else if (pricePerSqmGrossIDR == 0 && pricePerSqmGrossUSD !== 0) {
        if (pricePerSqmGrossUSD !== 0 && totalUSD !== 0) {
            buildingSizeSqmGrossUSD = numberValidation(createFormula(0 / pricePerSqmGrossUSD))
        }
    }

    if (buildingSizeSqmGrossIDR !== 0 && buildingSizeSqmGrossUSD == 0) {
        buildingSizeSqmGrossUSD = numberValidation(createFormula(0 * exchangeRateIDRToUSD))
    } else if (buildingSizeSqmGrossIDR == 0 && buildingSizeSqmGrossUSD !== 0) {
        buildingSizeSqmGrossIDR = numberValidation(createFormula(0 * exchangeRateUSDToIDR))
    }

    //Compare two values -- building size sqm sganett IDR and USD
    let buildingSizeSqmSganettIDR = 0
    let buildingSizeSqmSganettUSD = 0
    if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD == 0) {
        if (pricePerSqmSganettIDR !== 0 && totalIDR !== 0) {
            buildingSizeSqmSganettIDR = numberValidation(createFormula(0 / pricePerSqmSganettIDR))
        }
    } else if (pricePerSqmSganettIDR == 0 && pricePerSqmSganettUSD !== 0) {
        if (pricePerSqmSganettUSD !== 0 && totalUSD !== 0) {
            buildingSizeSqmSganettUSD = numberValidation(createFormula(0 / pricePerSqmSganettUSD))
        }
    }

    if (buildingSizeSqmSganettIDR !== 0 && buildingSizeSqmSganettUSD == 0) {
        buildingSizeSqmSganettUSD = numberValidation(createFormula(0 * exchangeRateIDRToUSD))
    } else if (buildingSizeSqmSganettIDR == 0 && buildingSizeSqmSganettUSD !== 0) {
        buildingSizeSqmSganettIDR = numberValidation(createFormula(0 * exchangeRateUSDToIDR))
    }

    //building units/keys

    let buildingSizeUnitKeysIDR = 0
    let buildingSizeUnitKeysUSD = 0

    buildingSizeUnitKeysIDR = 0
    buildingSizeUnitKeysUSD = 0

    //Compare two values -- building size price per sqm gross IDR and USD

    let buildingPricePerSqmGrossIDR = 0
    let buildingPricePerSqmGrossUSD = 0

    if (buildingPricePerSqmGrossIDR !== 0 && buildingPricePerSqmGrossUSD == 0) {
        buildingPricePerSqmGrossUSD = numberValidation(createFormula(0 * exchangeRateIDRToUSD))
    } else if (buildingPricePerSqmGrossIDR == 0 && buildingPricePerSqmGrossUSD !== 0) {
        buildingPricePerSqmGrossIDR = numberValidation(createFormula(0 * exchangeRateUSDToIDR))
    }

    //Compare two values -- building size price per sqm sganett IDR and USD

    let buildingPricePerSqmSganettIDR = 0
    let buildingPricePerSqmSganettUSD = 0

    if (buildingPricePerSqmSganettIDR !== 0 && buildingPricePerSqmSganettUSD == 0) {
        buildingPricePerSqmSganettUSD = numberValidation(createFormula(0 * exchangeRateIDRToUSD))
    } else if (buildingPricePerSqmSganettIDR == 0 && buildingPricePerSqmSganettUSD !== 0) {
        buildingPricePerSqmSganettIDR = numberValidation(createFormula(0 * exchangeRateUSDToIDR))
    }

    //building price per unit key

    let buildingPricePerUnitKeyIDR = 0
    let buildingPricePerUnitKeyUSD = 0

    //building NJOP Price Total
    let buildingNJOPPriceTotalIDR = njop
    let buildingNJOPPriceTotalUSD = numberValidation(createFormula(exchangeRateIDRToUSD * 0))

    //building NJOP Price Per Sqm
    let buildingNJOPPricePerSqmIDR = njop
    let buildingNJOPPricePerSqmUSD = numberValidation(createFormula(exchangeRateIDRToUSD * 0))

    //building NJOP Percent
    let buildingNJOPPercentIDR = 0
    let buildingNJOPPercentUSD = 0

    /********END OF BUILDING SIDE **********/

    /********TOTAL SIDE **********/

    //Compare two values -- total total IDR and USD
    let totalTotalIDR = landTotalIDR + buildingTotalIDR
    let totalTotalUSD = landTotalUSD + buildingTotalUSD

    //Compare two values -- total size sqm gross IDR and USD
    let totalSizeSqmGrossIDR = landSizeSqmGrossIDR + buildingSizeSqmGrossIDR
    let totalSizeSqmGrossUSD = landSizeSqmGrossUSD + buildingSizeSqmGrossUSD

    //Compare two values -- total size sqm sganett IDR and USD
    let totalSizeSqmSganettIDR = landSizeSqmSganettIDR + buildingSizeSqmSganettIDR
    let totalSizeSqmSganettUSD = landSizeSqmSganettUSD + buildingSizeSqmSganettUSD

    //total units/keys
    let totalSizeUnitKeysIDR = landSizeUnitKeysIDR + buildingSizeUnitKeysIDR
    let totalSizeUnitKeysUSD = landSizeUnitKeysUSD + buildingSizeUnitKeysUSD

    //Compare two values -- total size price per sqm gross IDR and USD
    let totalPricePerSqmGrossIDR = landPricePerSqmGrossIDR + buildingPricePerSqmGrossIDR
    let totalPricePerSqmGrossUSD = landPricePerSqmGrossUSD + buildingPricePerSqmGrossUSD

    //Compare two values -- total size price per sqm sganett IDR and USD
    let totalPricePerSqmSganettIDR = landPricePerSqmSganettIDR + buildingPricePerSqmSganettIDR
    let totalPricePerSqmSganettUSD = landPricePerSqmSganettUSD + buildingPricePerSqmSganettUSD

    //total price per unit key
    let totalPricePerUnitKeyIDR = landPricePerUnitKeyIDR + buildingPricePerUnitKeyIDR
    let totalPricePerUnitKeyUSD = landPricePerUnitKeyUSD + buildingPricePerUnitKeyUSD

    //total NJOP Price Total
    let totalNJOPPriceTotalIDR = landNJOPPriceTotalIDR + buildingNJOPPriceTotalIDR
    let totalNJOPPriceTotalUSD = landNJOPPriceTotalUSD + buildingNJOPPriceTotalUSD

    //total NJOP Price Per Sqm
    let totalNJOPPricePerSqmIDR = landNJOPPricePerSqmIDR + buildingNJOPPricePerSqmIDR
    let totalNJOPPricePerSqmUSD = landNJOPPricePerSqmUSD + buildingNJOPPricePerSqmUSD

    //total NJOP Percent
    let totalNJOPPercentIDR = landNJOPPercentIDR + buildingNJOPPercentIDR
    let totalNJOPPercentUSD = landNJOPPercentUSD + buildingNJOPPercentUSD

    /********END OF TOTAL SIDE **********/

    /********KLB SIDE **********/
    let KLBTotalIDR = landTotalIDR
    let KLBTotalUSD = landTotalUSD
    if (KLBTotalIDR !== 0 && KLBTotalUSD == 0) {
        KLBTotalUSD = numberValidation(createFormula(KLBTotalIDR * exchangeRateIDRToUSD));
    } else if (KLBTotalIDR == 0 && KLBTotalUSD !== 0) {
        KLBTotalIDR = numberValidation(createFormula(KLBTotalUSD * exchangeRateUSDToIDR));
    }

    let KLBKLBIDR = 0;
    let KLBKLBUSD = 0;
    if (klb !== null) {
        KLBKLBIDR = klb
        KLBKLBUSD = klb
    }
    let KLBLandSqmIDR = 0;
    let KLBLandSqmUSD = 0;
    if (landSizeSqmGrossIDR !== null) {
        KLBLandSqmIDR = landSizeSqmGrossIDR
    }
    if (landSizeSqmGrossUSD !== null) {
        KLBLandSqmUSD = landSizeSqmGrossUSD
    }

    let KLBBuildableSqmIDR = 0
    let KLBBuildableSqmUSD = 0

    if (landTotalIDR !== 0) {
        KLBBuildableSqmIDR = numberValidation(createFormula(KLBTotalIDR / (KLBKLBIDR * KLBLandSqmIDR)));
        KLBBuildableSqmUSD = numberValidation(createFormula(exchangeRateIDRToUSD * KLBBuildableSqmIDR))
    } else if (landTotalUSD !== 0) {
        KLBBuildableSqmUSD = numberValidation(createFormula(KLBTotalUSD / (KLBKLBUSD * KLBLandSqmUSD)));
        KLBBuildableSqmIDR = numberValidation(createFormula(exchangeRateUSDToIDR * KLBBuildableSqmUSD))
    }
    /********End of KLB SIDE **********/
    imageExists(propertyPhoto, function (exist) {
        if (exist) {
            $(".image-property").css("background-image", "url(" + propertyPhoto + ")");
            $(".image-property").css("background-size", "100% 100%");
        } else {
            $(".image-property").css("background-image", "url(assets/images/no-photo.PNG)");
            $(".image-property").css("background-size", "100% 100%");
        }
    })
    if (propertyType) {
        $("#propertytype-popup").text(
            "PROPERTY TYPE : " + propertyType.toUpperCase()
        );
    } else {
        $("#propertytype-popup").text(
            "PROPERTY TYPE : unknown"
        );
    }
    if (propertyStatus == "Available") {
        if (actionDate) {
            $("#action-date-popup").text("Asking on " + actionDate)
        } else {
            $("#action-date-popup").text("Asking on unknown date")
        }
    } else if (propertyStatus == "Sold") {
        if (actionDate) {
            $("#action-date-popup").text("Transacted on " + actionDate)
        } else {
            $("#action-date-popup").text("Transacted on unknown date")
        }
    }
    if (propertyName) {
        $("#buildingName-popup").text("Land at " + propertyName)
    } else {
        $("#buildingName-popup").text("Land at unknown")
    }
    if (propertyAddress) {
        $("#address-popup").text(propertyAddress)
    } else {
        $("#address-popup").text("unknown address")
    }
    if (propertyColliersContact) {
        $("#colliers-contact-popup").text("Colliers Contact : " + propertyColliersContact)
    } else {
        $("#colliers-contact-popup").text("Colliers Contact : -")
    }
    if (lastUpdate) {
        $("#lastupdate-popup").text("Last Updated : " + lastUpdate)
    } else {
        $("#lastupdate-popup").text("Last Updated : -")
    }

    //Passing data to land rows
    $("#landTotalIDR").text(delimiter(landTotalIDR))
    $("#landTotalUSD").text(delimiter(landTotalUSD))
    $("#landSizeSqmGrossIDR").text(delimiter(landSizeSqmGrossIDR))
    $("#landSizeSqmGrossUSD").text(delimiter(landSizeSqmGrossUSD))
    $("#landSizeSqmSGAIDR").text(delimiter(landSizeSqmSganettIDR))
    $("#landSizeSqmSGAUSD").text(delimiter(landSizeSqmSganettUSD))
    $("#landSizeUnitKeysIDR").text(landSizeUnitKeysIDR)
    $("#landSizeUnitKeysUSD").text(landSizeUnitKeysUSD)
    $("#landPricePerSqmGrossIDR").text(delimiter(landPricePerSqmGrossIDR))
    $("#landPricePerSqmGrossUSD").text(delimiter(landPricePerSqmGrossUSD))
    $("#landPricePerSqmSGAIDR").text(delimiter(landPricePerSqmSganettIDR))
    $("#landPricePerSqmSGAUSD").text(delimiter(landSizeSqmSganettUSD))
    $("#landPricePerUnitKeyIDR").text(landPricePerUnitKeyIDR)
    $("#landPricePerUnitKeyUSD").text(landPricePerUnitKeyUSD)
    $("#landNJOPPriceTotalIDR").text(delimiter(landNJOPPriceTotalIDR))
    $("#landNJOPPriceTotalUSD").text(delimiter(landNJOPPriceTotalUSD))
    $("#landNJOPPricePerSqmIDR").text(delimiter(landNJOPPricePerSqmIDR))
    $("#landNJOPPricePerSqmUSD").text(delimiter(landNJOPPricePerSqmUSD))
    $("#landNJOPPercentIDR").text(landNJOPPercentIDR)
    $("#landNJOPPercentUSD").text(landNJOPPercentUSD)

    //Passing data to building rows
    $("#buildingTotalIDR").text(delimiter(buildingTotalIDR))
    $("#buildingTotalUSD").text(delimiter(buildingTotalUSD))
    $("#buildingSizeSqmGrossIDR").text(delimiter(buildingSizeSqmGrossIDR))
    $("#buildingSizeSqmGrossUSD").text(delimiter(buildingSizeSqmGrossUSD))
    $("#buildingSizeSqmSGAIDR").text(delimiter(buildingSizeSqmSganettIDR))
    $("#buildingSizeSqmSGAUSD").text(delimiter(buildingSizeSqmSganettUSD))
    $("#buildingSizeUnitKeysIDR").text(buildingSizeUnitKeysIDR)
    $("#buildingSizeUnitKeysUSD").text(buildingSizeUnitKeysUSD)
    $("#buildingPricePerSqmGrossIDR").text(delimiter(buildingPricePerSqmGrossIDR))
    $("#buildingPricePerSqmGrossUSD").text(delimiter(buildingPricePerSqmGrossUSD))
    $("#buildingPricePerSqmSGAIDR").text(delimiter(buildingPricePerSqmSganettIDR))
    $("#buildingPricePerSqmSGAUSD").text(delimiter(buildingSizeSqmSganettUSD))
    $("#buildingPricePerUnitKeyIDR").text(buildingPricePerUnitKeyIDR)
    $("#buildingPricePerUnitKeyUSD").text(buildingPricePerUnitKeyUSD)
    $("#buildingNJOPPriceTotalIDR").text(delimiter(buildingNJOPPriceTotalIDR))
    $("#buildingNJOPPriceTotalUSD").text(delimiter(buildingNJOPPriceTotalUSD))
    $("#buildingNJOPPricePerSqmIDR").text(delimiter(buildingNJOPPricePerSqmIDR))
    $("#buildingNJOPPricePerSqmUSD").text(delimiter(buildingNJOPPricePerSqmUSD))
    $("#buildingNJOPPercentIDR").text(buildingNJOPPercentIDR)
    $("#buildingNJOPPercentUSD").text(buildingNJOPPercentUSD)

    //Passing data to total rows
    $("#totalTotalIDR").text(delimiter(totalTotalIDR))
    $("#totalTotalUSD").text(delimiter(totalTotalUSD))
    $("#totalSizeSqmGrossIDR").text(delimiter(totalSizeSqmGrossIDR))
    $("#totalSizeSqmGrossUSD").text(delimiter(totalSizeSqmGrossUSD))
    $("#totalSizeSqmSGAIDR").text(delimiter(totalSizeSqmSganettIDR))
    $("#totalSizeSqmSGAUSD").text(delimiter(totalSizeSqmSganettUSD))
    $("#totalSizeUnitKeysIDR").text(totalSizeUnitKeysIDR)
    $("#totalSizeUnitKeysUSD").text(totalSizeUnitKeysUSD)
    $("#totalPricePerSqmGrossIDR").text(delimiter(totalPricePerSqmGrossIDR))
    $("#totalPricePerSqmGrossUSD").text(delimiter(totalPricePerSqmGrossUSD))
    $("#totalPricePerSqmSGAIDR").text(delimiter(totalPricePerSqmSganettIDR))
    $("#totalPricePerSqmSGAUSD").text(delimiter(totalSizeSqmSganettUSD))
    $("#totalPricePerUnitKeyIDR").text(totalPricePerUnitKeyIDR)
    $("#totalPricePerUnitKeyUSD").text(totalPricePerUnitKeyUSD)
    $("#totalNJOPPriceTotalIDR").text(delimiter(totalNJOPPriceTotalIDR))
    $("#totalNJOPPriceTotalUSD").text(delimiter(totalNJOPPriceTotalUSD))
    $("#totalNJOPPricePerSqmIDR").text(delimiter(totalNJOPPricePerSqmIDR))
    $("#totalNJOPPricePerSqmUSD").text(delimiter(totalNJOPPricePerSqmUSD))
    $("#totalNJOPPercentIDR").text(totalNJOPPercentIDR)
    $("#totalNJOPPercentUSD").text(totalNJOPPercentUSD)

    //Passing data to klb rows
    $("#KLBTotalIDR").text(delimiter(KLBTotalIDR))
    $("#KLBTotalUSD").text(delimiter(KLBTotalUSD))
    $("#KLBKLBIDR").text(delimiter(KLBKLBIDR))
    $("#KLBKLBUSD").text(delimiter(KLBKLBUSD))
    $("#KLBLandSqmIDR").text(delimiter(KLBLandSqmIDR))
    $("#KLBLandSqmUSD").text(delimiter(KLBLandSqmUSD))
    $("#KLBBuildableSqmIDR").text(delimiter(KLBBuildableSqmIDR))
    $("#KLBBuildableSqmUSD").text(delimiter(KLBBuildableSqmUSD))

    $("#loading-bar").hide()
}

var numberValidation = function (number) {
    if (number !== null) {
        if (number % 1 != 0) {
            number = Number(Number(number).toFixed(2))
        } else if (/\s/.test(number)) {
            number = Number(number)
        }
    } else {
        number = 0
    }
    return number
}

var createFormula = function (formula) {
    if (isFinite(formula)) {
        return formula
    } else {
        return 0
    }
}

var delimiter = function (number) {
    if (!Number.isInteger(number)) {
        number = addCommas(Number(number).toFixed(2))
    } else {
        number = addCommas(number.toString())
    }
    return number
}

var addCommas = function (nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}