var getColliersData = async function (map, attributes) {

    let actionDate = attributes.action_date
    let a = new Date(actionDate);
    var monthActionDate = a.toLocaleString('default', { month: 'long' })
    monthActionDate = monthActionDate.substring(0, 3)
    actionDate =
        a.getDate() + " " + monthActionDate + " " + a.getFullYear();
    if (actionDate === "NaN NaN NaN") {
        actionDate = undefined
    }
    let lastUpdate = attributes.last_update
    let b = new Date(lastUpdate);
    var monthLastUpdate = b.toLocaleString('default', { month: 'long' })
    monthLastUpdate = monthLastUpdate.substring(0, 3)
    lastUpdate =
        b.getDate() + " " + monthLastUpdate + " " + b.getFullYear();
    if (lastUpdate === "NaN NaN NaN") {
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

    if (exchangeRate !== 0) {
        exchangeRateUSDToIDR = exchangeRate
        exchangeRateIDRToUSD = 1 / exchangeRateUSDToIDR
    } else {
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
            exchangeRateUSDToIDR = 14046.4973887988
        }
    }

    /********LAND SIDE **********/
    //Compare two values -- land total IDR and USD
    let landTotalIDR = totalIDR
    let landTotalUSD = totalUSD
    if (totalIDR !== 0 && totalUSD == 0) {
        landTotalUSD = numberValidation(createFormula(propertyEffectLand(propertyType, totalIDR) * exchangeRateIDRToUSD))
        landTotalIDR = numberValidation(propertyEffectLand(propertyType, totalIDR))
        $("#landTotalIDR").css("font-weight", "bold")
        $("#landTotalUSD").css("font-weight", "")
    } else if (totalIDR == 0 && totalUSD !== 0) {
        landTotalIDR = numberValidation(createFormula(propertyEffectLand(propertyType, totalUSD) * exchangeRateUSDToIDR))
        landTotalUSD = numberValidation(propertyEffectLand(propertyType, totalUSD))
        $("#landTotalUSD").css("font-weight", "bold")
        $("#landTotalIDR").css("font-weight", "")
    } else if (totalIDR !== 0 && totalUSD !== 0) {
        landTotalIDR = numberValidation(propertyEffectLand(propertyType, totalIDR))
        landTotalUSD = numberValidation(propertyEffectLand(propertyType, totalUSD))
        $("#landTotalIDR").css("font-weight", "bold")
        $("#landTotalUSD").css("font-weight", "")
    }

    //Compare two values -- land size sqm gross IDR and USD
    let landSizeSqm = 0
    if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD == 0) {
        if (totalIDR !== 0 && totalUSD == 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
        } else if (totalUSD !== 0 && totalIDR == 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmGrossUSD)))
        } else if (totalIDR !== 0 && totalUSD !== 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
        }
    } else if (pricePerSqmGrossIDR == 0 && pricePerSqmGrossUSD !== 0) {
        if (totalIDR !== 0 && totalUSD == 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
        } else if (totalUSD !== 0 && totalIDR == 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmGrossUSD)))
        } else if (totalIDR !== 0 && totalUSD !== 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
        }
    } else if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD !== 0) {
        if (totalIDR !== 0 && totalUSD == 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
        } else if (totalUSD !== 0 && totalIDR == 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmGrossUSD)))
        } else if (totalIDR !== 0 && totalUSD !== 0) {
            landSizeSqm = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
        }
    }

    //land units/keys
    let landSizeUnitKeysIDR = 0
    let landSizeUnitKeysUSD = 0

    landSizeUnitKeysIDR = unitsKeys
    landSizeUnitKeysUSD = unitsKeys

    //Compare two values -- land size price per sqm gross IDR and USD

    let landPricePerSqmGrossIDR = propertyEffectLand(propertyType, pricePerSqmGrossIDR)
    let landPricePerSqmGrossUSD = propertyEffectLand(propertyType, pricePerSqmGrossUSD)

    if (landPricePerSqmGrossIDR !== 0 && landPricePerSqmGrossUSD == 0) {
        landPricePerSqmGrossUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landPricePerSqmGrossIDR) * exchangeRateIDRToUSD))
        landPricePerSqmGrossIDR = numberValidation(propertyEffectLand(propertyType, landPricePerSqmGrossIDR))
    } else if (landPricePerSqmGrossIDR == 0 && landPricePerSqmGrossUSD !== 0) {
        landPricePerSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landPricePerSqmGrossUSD) * exchangeRateUSDToIDR))
        landPricePerSqmGrossUSD = numberValidation(propertyEffectLand(propertyType, landPricePerSqmGrossUSD))
    } else if (landPricePerSqmGrossIDR !== 0 && landPricePerSqmGrossUSD !== 0) {
        landPricePerSqmGrossIDR = numberValidation(propertyEffectLand(propertyType, landPricePerSqmGrossIDR))
        landPricePerSqmGrossUSD = numberValidation(propertyEffectLand(propertyType, landPricePerSqmGrossUSD))
    }

    //Compare two values -- land size price per sqm sganett IDR and USD
    let landPricePerSqmSganettIDR = 0
    let landPricePerSqmSganettUSD = 0

    if (landPricePerSqmSganettIDR !== 0 && landPricePerSqmSganettUSD == 0) {
        landPricePerSqmSganettUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landPricePerSqmSganettIDR) * exchangeRateIDRToUSD))
        landPricePerSqmSganettIDR = numberValidation(propertyEffectLand(propertyType, landPricePerSqmSganettIDR))
    } else if (landPricePerSqmSganettIDR == 0 && landPricePerSqmSganettUSD !== 0) {
        landPricePerSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landPricePerSqmSganettUSD) * exchangeRateUSDToIDR))
        landPricePerSqmSganettUSD = numberValidation(propertyEffectLand(propertyType, landPricePerSqmSganettUSD))
    } else if (landPricePerSqmSganettIDR !== 0 && landPricePerSqmSganettUSD !== 0) {
        landPricePerSqmSganettIDR = numberValidation(propertyEffectLand(propertyType, landPricePerSqmSganettIDR))
        landPricePerSqmSganettUSD = numberValidation(propertyEffectLand(propertyType, landPricePerSqmSganettUSD))
    }

    //Land price per unit key
    let landPricePerUnitKeyIDR = 0
    let landPricePerUnitKeyUSD = 0

    //Land NJOP Price Total
    let landNJOPPriceTotalIDR = propertyEffectLand(propertyType, njop)
    let landNJOPPriceTotalUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectLand(propertyType, njop)))

    //Land NJOP Price Per Sqm
    let landNJOPPricePerSqmIDR = propertyEffectLand(propertyType, njop)
    let landNJOPPricePerSqmUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectLand(propertyType, njop)))

    //Land NJOP Percent
    let landNJOPPercentIDR = 0
    let landNJOPPercentUSD = 0

    /********END OF LAND SIDE **********/

    /********building SIDE **********/

    //Compare two values -- building total IDR and USD
    let buildingTotalIDR = totalIDR
    let buildingTotalUSD = totalUSD
    if (totalIDR !== 0 && totalUSD == 0) {
        buildingTotalUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, totalIDR) * exchangeRateIDRToUSD))
        buildingTotalIDR = numberValidation(propertyEffectBuilding(propertyType, totalIDR))
        $("#buildingTotalIDR").css("font-weight", "bold")
        $("#buildingTotalUSD").css("font-weight", "")
    } else if (totalIDR == 0 && totalUSD !== 0) {
        buildingTotalIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, totalUSD) * exchangeRateUSDToIDR))
        buildingTotalUSD = numberValidation(propertyEffectBuilding(propertyType, totalUSD))
        $("#buildingTotalUSD").css("font-weight", "bold")
        $("#buildingTotalIDR").css("font-weight", "")
    } else if (totalIDR !== 0 && totalUSD !== 0) {
        buildingTotalIDR = numberValidation(propertyEffectBuilding(propertyType, totalIDR))
        buildingTotalUSD = numberValidation(propertyEffectBuilding(propertyType, totalUSD))
        $("#buildingTotalIDR").css("font-weight", "bold")
        $("#buildingTotalUSD").css("font-weight", "")
    }

    //Compare two values -- building size sqm gross IDR and USD
    let buildingSizeSqm = 0
    if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD == 0) {
        if (totalIDR !== 0 && totalUSD == 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
        } else if (totalUSD !== 0 && totalIDR == 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)))
        } else if (totalIDR !== 0 && totalUSD !== 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
        }
    } else if (pricePerSqmSganettIDR == 0 && pricePerSqmSganettUSD !== 0) {
        if (totalIDR !== 0 && totalUSD == 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
        } else if (totalUSD !== 0 && totalIDR == 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)))
        } else if (totalIDR !== 0 && totalUSD !== 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
        }
    } else if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD !== 0) {
        if (totalIDR !== 0 && totalUSD == 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
        } else if (totalUSD !== 0 && totalIDR == 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)))
        } else if (totalIDR !== 0 && totalUSD !== 0) {
            buildingSizeSqm = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
        }
    }

    //building units/keys

    let buildingSizeUnitKeysIDR = 0
    let buildingSizeUnitKeysUSD = 0

    buildingSizeUnitKeysIDR = unitsKeys
    buildingSizeUnitKeysUSD = unitsKeys

    //Compare two values -- building size price per sqm gross IDR and USD

    let buildingPricePerSqmGrossIDR = 0
    let buildingPricePerSqmGrossUSD = 0

    if (buildingPricePerSqmGrossIDR !== 0 && buildingPricePerSqmGrossUSD == 0) {
        buildingPricePerSqmGrossUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingPricePerSqmGrossIDR) * exchangeRateIDRToUSD))
        buildingPricePerSqmGrossIDR = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmGrossIDR))
    } else if (buildingPricePerSqmGrossIDR == 0 && buildingPricePerSqmGrossUSD !== 0) {
        buildingPricePerSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingPricePerSqmGrossUSD) * exchangeRateUSDToIDR))
        buildingPricePerSqmGrossUSD = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmGrossUSD))
    } else if (buildingPricePerSqmGrossIDR !== 0 && buildingPricePerSqmGrossUSD !== 0) {
        buildingPricePerSqmGrossIDR = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmGrossIDR))
        buildingPricePerSqmGrossUSD = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmGrossUSD))
    }

    //Compare two values -- building size price per sqm sganett IDR and USD
    console.log(propertyType.toUpperCase())
    console.log(pricePerSqmSganettIDR)
    console.log(pricePerSqmSganettUSD)
    let buildingPricePerSqmSganettIDR = propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)
    let buildingPricePerSqmSganettUSD = propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)

    console.log(buildingPricePerSqmSganettIDR)
    console.log(buildingPricePerSqmSganettUSD)

    if (buildingPricePerSqmSganettIDR !== 0 && buildingPricePerSqmSganettUSD == 0) {
        buildingPricePerSqmSganettUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingPricePerSqmSganettIDR) * exchangeRateIDRToUSD))
        buildingPricePerSqmSganettIDR = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmSganettIDR))
    } else if (buildingPricePerSqmSganettIDR == 0 && buildingPricePerSqmSganettUSD !== 0) {
        buildingPricePerSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingPricePerSqmSganettUSD) * exchangeRateUSDToIDR))
        buildingPricePerSqmSganettUSD = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmSganettUSD))
    } else if (buildingPricePerSqmSganettIDR !== 0 && buildingPricePerSqmSganettUSD !== 0) {
        buildingPricePerSqmSganettIDR = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmSganettIDR))
        buildingPricePerSqmSganettUSD = numberValidation(propertyEffectBuilding(propertyType, buildingPricePerSqmSganettUSD))
    }

    //building price per unit key

    let buildingPricePerUnitKeyIDR = 0
    let buildingPricePerUnitKeyUSD = 0

    //building NJOP Price Total
    let buildingNJOPPriceTotalIDR = propertyEffectBuilding(propertyType, njop)
    let buildingNJOPPriceTotalUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectBuilding(propertyType, njop)))

    //building NJOP Price Per Sqm
    let buildingNJOPPricePerSqmIDR = propertyEffectBuilding(propertyType, njop)
    let buildingNJOPPricePerSqmUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectBuilding(propertyType, njop)))

    //building NJOP Percent
    let buildingNJOPPercentIDR = 0
    let buildingNJOPPercentUSD = 0

    /********END OF building SIDE **********/

    /********TOTAL SIDE **********/

    //Compare two values -- total total IDR and USD
    let totalTotalIDR = landTotalIDR + buildingTotalIDR
    let totalTotalUSD = landTotalUSD + buildingTotalUSD

    //Compare two values -- total size sqm gross IDR and USD
    let totalSizeSqmGrossIDR = landSizeSqm + buildingSizeSqm
    let totalSizeSqmGrossUSD = landSizeSqm + buildingSizeSqm

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
    let KLBTotalIDR = numberValidation(totalTotalIDR)
    let KLBTotalUSD = numberValidation(totalTotalUSD)

    let KLBKLBIDR = 0;
    let KLBKLBUSD = 0;
    if (klb !== null) {
        KLBKLBIDR = klb
        KLBKLBUSD = klb
    }

    let KLBLandSqmIDR = 0;
    let KLBLandSqmUSD = 0;
    if (landSizeSqm !== 0) {
        KLBLandSqmIDR = landSizeSqm
        KLBLandSqmUSD = landSizeSqm
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
        if (id) {
            $("#propertytype-popup").text(
                "PROPERTY TYPE : " + propertyType.toUpperCase() + " (" + id + ")"
            );
        } else {
            $("#propertytype-popup").text(
                "PROPERTY TYPE : " + propertyType.toUpperCase()
            );
        }
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
        $("#buildingName-popup").text(propertyName)
    } else {
        $("#buildingName-popup").text("Unknown")
    }
    if (propertyAddress) {
        $("#address-popup").text(propertyAddress)
    } else {
        $("#address-popup").text("unknown address")
    }
    console.log(exchangeRateUSDToIDR)
    if (exchangeRateUSDToIDR) {
        $("#exchange-rate-popup").text("Exchange Rate : " + delimiter(numberValidation(exchangeRateUSDToIDR)))
    } else {
        $("#exchange-rate-popup").text("Exchange Rate : Unknown")
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
    $("#landSizeSqmGrossIDR").text(delimiter(landSizeSqm))
    $("#landSizeSqmGrossUSD").text(delimiter(landSizeSqm))
    $("#landSizeUnitKeysIDR").text(landSizeUnitKeysIDR)
    $("#landSizeUnitKeysUSD").text(landSizeUnitKeysUSD)
    $("#landPricePerSqmGrossIDR").text(delimiter(landPricePerSqmGrossIDR))
    $("#landPricePerSqmGrossUSD").text(delimiter(landPricePerSqmGrossUSD))
    $("#landPricePerSqmSGAIDR").text(delimiter(landPricePerSqmSganettIDR))
    $("#landPricePerSqmSGAUSD").text(delimiter(landPricePerSqmSganettUSD))
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
    $("#buildingSizeSqmGrossIDR").text(delimiter(buildingSizeSqm))
    $("#buildingSizeSqmGrossUSD").text(delimiter(buildingSizeSqm))
    $("#buildingSizeUnitKeysIDR").text(buildingSizeUnitKeysIDR)
    $("#buildingSizeUnitKeysUSD").text(buildingSizeUnitKeysUSD)
    $("#buildingPricePerSqmGrossIDR").text(delimiter(buildingPricePerSqmGrossIDR))
    $("#buildingPricePerSqmGrossUSD").text(delimiter(buildingPricePerSqmGrossUSD))
    $("#buildingPricePerSqmSGAIDR").text(delimiter(buildingPricePerSqmSganettIDR))
    $("#buildingPricePerSqmSGAUSD").text(delimiter(buildingPricePerSqmSganettUSD))
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
    $("#totalSizeUnitKeysIDR").text(totalSizeUnitKeysIDR)
    $("#totalSizeUnitKeysUSD").text(totalSizeUnitKeysUSD)
    $("#totalPricePerSqmGrossIDR").text(delimiter(totalPricePerSqmGrossIDR))
    $("#totalPricePerSqmGrossUSD").text(delimiter(totalPricePerSqmGrossUSD))
    $("#totalPricePerSqmSGAIDR").text(delimiter(totalPricePerSqmSganettIDR))
    $("#totalPricePerSqmSGAUSD").text(delimiter(totalPricePerSqmSganettUSD))
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

var propertyEffectLand = function (property, value) {
    var val = 0
    if (property.toUpperCase() == "INDUSTRIAL/LOGISTIC" || property.toUpperCase() == "HOUSE" || property.toUpperCase() == "LAND") {
        val = value
    } else {
        val = 0
    }
    return val
}

var propertyEffectBuilding = function (property, value) {
    var val = 0
    if (property.toUpperCase() == "RUKO" || property.toUpperCase() == "DATA CENTER" || property.toUpperCase() == "SHOPPING CENTER" || property.toUpperCase() == "OFFICE" || property.toUpperCase() == "APARTMENT" || property.toUpperCase() == "HOTEL") {
        val = value
    } else {
        val = 0
    }
    return val
}

var colliersDataSelection = function (totalIDR, totalUSD, pricePerSqmGrossIDR, pricePerSqmGrossUSD, sqmGross, sqmSganett) {
    var tIDR = 0, tUSD = 0, ppsGrossIDR = 0, ppsGrossUSD = 0, sGross = 0, sSganett = 0
    if (totalIDR !== null) {
        tIDR = Number(totalIDR)
    }
    if (totalUSD !== null) {
        tUSD = Number(totalUSD)
    }
    if (pricePerSqmGrossIDR !== null) {
        ppsGrossIDR = Number(pricePerSqmGrossIDR)
    }
    if (pricePerSqmGrossUSD !== null) {
        ppsGrossUSD = Number(pricePerSqmGrossUSD)
    }
    if (sqmGross !== null) {
        sGross = Number(sqmGross)
    }
}

// var selection = function (val1, val2, val3) {
//     if (Number(val1) === 0 && Number(val2) !== 0 && Number(val3) !== 0) {
//         val1 = Number(val2) * Number(val3)
//     } else if (Number(val1) !== 0 && Number(val2) === 0 && Number(val3) !== 0) {
//         val2 = Number(val1) / Number(val3)
//     } else if (Number(val1) !== 0 && Number(val2) !== 0 && Number(val3) === 0) {
//         val3 = Number(val1) / Number(val2)
//     } else if(Number(val1))
// }