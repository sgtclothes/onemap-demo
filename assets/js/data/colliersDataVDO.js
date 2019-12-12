var getColliersDataVDO = async function (map, attributes) {

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
    let sqmGross = numberValidation(attributes.sqm_gross)
    let sqmSganett = numberValidation(attributes.sqm_sganett)
    let totalIDR = numberValidation(attributes.total_idr)
    let totalUSD = numberValidation(attributes.total_usd)
    let unitsKeys = numberValidation(attributes.units_keys)

    console.log(propertyType)

    let exchangeRateIDRToUSD = undefined
    let exchangeRateUSDToIDR = undefined

    if (exchangeRate !== null) {
        exchangeRateUSDToIDR = exchangeRate
        exchangeRateIDRToUSD = 0.0000711921
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

    var arrVDO = []

    var query = new ESRI.Query({
        where: "1=1",
        outFields: "*"
    })

    await colliersPropertyStaging.queryFeatures(query).then(function (results) {
        for (let i = 0; i < results.features.length; i++) {
            if (results.features[i].attributes.id == id) {
                console.log(results.features[i].attributes)
                if (results.features[i].attributes.property_type == "Land") {
                    arrVDO.push(["Land", results.features[i]])
                } else {
                    arrVDO.push([results.features[i].attributes.property_type, results.features[i]])
                }
            }
        }
    })

    console.log(arrVDO)

    let landTotalIDR = 0
    let landTotalUSD = 0
    let landSizeSqmGrossIDR = 0
    let landSizeSqmGrossUSD = 0
    let landSizeSqmSganettIDR = 0
    let landSizeSqmSganettUSD = 0
    let landSizeUnitKeysIDR = 0
    let landSizeUnitKeysUSD = 0
    let landPricePerSqmGrossIDR = 0
    let landPricePerSqmGrossUSD = 0
    let landPricePerSqmSganettIDR = 0
    let landPricePerSqmSganettUSD = 0
    let landPricePerUnitKeyIDR = 0
    let landPricePerUnitKeyUSD = 0
    let landNJOPPriceTotalIDR = 0
    let landNJOPPriceTotalUSD = 0
    let landNJOPPricePerSqmIDR = 0
    let landNJOPPricePerSqmUSD = 0
    let landNJOPPercentIDR = 0
    let landNJOPPercentUSD = 0
    let buildingTotalIDR = 0
    let buildingTotalUSD = 0
    let buildingSizeSqmGrossIDR = 0
    let buildingSizeSqmGrossUSD = 0
    let buildingSizeSqmSganettIDR = 0
    let buildingSizeSqmSganettUSD = 0
    let buildingSizeUnitKeysIDR = 0
    let buildingSizeUnitKeysUSD = 0
    let buildingPricePerSqmGrossIDR = 0
    let buildingPricePerSqmGrossUSD = 0
    let buildingPricePerSqmSganettIDR = 0
    let buildingPricePerSqmSganettUSD = 0
    let buildingPricePerUnitKeyIDR = 0
    let buildingPricePerUnitKeyUSD = 0
    let buildingNJOPPriceTotalIDR = 0
    let buildingNJOPPriceTotalUSD = 0
    let buildingNJOPPricePerSqmIDR = 0
    let buildingNJOPPricePerSqmUSD = 0
    let buildingNJOPPercentIDR = 0
    let buildingNJOPPercentUSD = 0
    let totalTotalIDR = 0
    let totalTotalUSD = 0
    let totalSizeSqmGrossIDR = 0
    let totalSizeSqmGrossUSD = 0
    let totalSizeSqmSganettIDR = 0
    let totalSizeSqmSganettUSD = 0
    let totalSizeUnitKeysIDR = 0
    let totalSizeUnitKeysUSD = 0
    let totalPricePerSqmGrossIDR = 0
    let totalPricePerSqmGrossUSD = 0
    let totalPricePerSqmSganettIDR = 0
    let totalPricePerSqmSganettUSD = 0
    let totalPricePerUnitKeyIDR = 0
    let totalPricePerUnitKeyUSD = 0
    let totalNJOPPriceTotalIDR = 0
    let totalNJOPPriceTotalUSD = 0
    let totalNJOPPricePerSqmIDR = 0
    let totalNJOPPricePerSqmUSD = 0
    let totalNJOPPercentIDR = 0
    let totalNJOPPercentUSD = 0

    if (arrVDO.length > 1) {
        console.log(arrVDO)
        for (let i = 0; i < arrVDO.length; i++) {
            if (arrVDO[i][0] == "Land") {
                landTotalIDR = arrVDO[i][1].attributes.total_idr
                landTotalUSD = numberValidation(landTotalIDR * exchangeRateIDRToUSD)
                if (Number(numberValidation(arrVDO[i][1].attributes.sqm_gross)) !== 0) {
                    landSizeSqmGrossIDR = Number(numberValidation(arrVDO[i][1].attributes.sqm_gross))
                } else {
                    landSizeSqmGrossIDR = numberValidation(landTotalIDR / Number(numberValidation(arrVDO[i][1].attributes.price_per_sqm_gross_idr)))
                }
                landSizeSqmGrossUSD = numberValidation(landSizeSqmGrossIDR)
                landPricePerSqmGrossIDR = numberValidation(arrVDO[i][1].attributes.price_per_sqm_gross_idr)
                landPricePerSqmGrossUSD = numberValidation(createFormula(Number(landPricePerSqmGrossIDR) * exchangeRateIDRToUSD))
            } else {
                buildingTotalIDR = arrVDO[i][1].attributes.total_idr
                if (arrVDO[i][1].attributes.total_usd !== null) {
                    buildingTotalUSD = numberValidation(arrVDO[i][1].attributes.total_usd)
                } else {
                    buildingTotalUSD = numberValidation(buildingTotalIDR * exchangeRateIDRToUSD)
                }

                if (sqmSganett !== null) {
                    buildingSizeSqmGrossIDR = sqmSganett
                    buildingSizeSqmGrossUSD = buildingSizeSqmGrossIDR
                } else {
                    buildingSizeSqmGrossIDR = numberValidation(buildingTotalIDR / Number(numberValidation(arrVDO[i][1].attributes.price_per_sqm_sganett_idr)))
                    buildingSizeSqmGrossUSD = numberValidation(buildingSizeSqmGrossIDR)
                }
                buildingPricePerSqmSganettIDR = numberValidation(arrVDO[i][1].attributes.price_per_sqm_sganett_idr)
                buildingPricePerSqmSganettUSD = numberValidation(createFormula(Number(buildingPricePerSqmSganettIDR) * exchangeRateIDRToUSD))
            }
        }
    } else {
        /********LAND SIDE **********/

        //Compare two values -- land total IDR and USD
        landTotalIDR = totalIDR
        landTotalUSD = totalUSD
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
        landSizeSqmGrossIDR = 0
        landSizeSqmGrossUSD = 0

        if (sqmGross !== null) {
            landSizeSqmGrossIDR = sqmGross
            landSizeSqmGrossUSD = landSizeSqmGrossIDR
        } else {
            if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD == 0) {
                if (totalIDR !== 0 && totalUSD == 0) {
                    landSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
                } else if (totalUSD !== 0 && totalIDR == 0) {
                    landSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmGrossUSD)))
                } else if (totalIDR !== 0 && totalUSD !== 0) {
                    landSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
                }
            } else if (pricePerSqmGrossIDR == 0 && pricePerSqmGrossUSD !== 0) {
                if (totalIDR !== 0 && totalUSD == 0) {
                    landSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
                } else if (totalUSD !== 0 && totalIDR == 0) {
                    landSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmGrossUSD)))
                } else if (totalIDR !== 0 && totalUSD !== 0) {
                    landSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
                }
            } else if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD !== 0) {
                if (totalIDR !== 0 && totalUSD == 0) {
                    landSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
                } else if (totalUSD !== 0 && totalIDR == 0) {
                    landSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmGrossUSD)))
                } else if (totalIDR !== 0 && totalUSD !== 0) {
                    landSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmGrossIDR)))
                }
            }

            if (landSizeSqmGrossIDR !== 0 && landSizeSqmGrossUSD == 0) {
                landSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landSizeSqmGrossIDR)))
            } else if (landSizeSqmGrossIDR == 0 && landSizeSqmGrossUSD !== 0) {
                landSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landSizeSqmGrossUSD)))
            }
        }

        //Compare two values -- land size sqm sganett IDR and USD
        landSizeSqmSganettIDR = 0
        landSizeSqmSganettUSD = 0
        if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD == 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                landSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmSganettIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                landSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmSganettUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                landSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmSganettIDR)))
            }
        } else if (pricePerSqmSganettIDR == 0 && pricePerSqmSganettUSD !== 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                landSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmSganettIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                landSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmSganettUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                landSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmSganettIDR)))
            }
        } else if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD !== 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                landSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmSganettIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                landSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalUSD) / propertyEffectLand(propertyType, pricePerSqmSganettUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                landSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landTotalIDR) / propertyEffectLand(propertyType, pricePerSqmSganettIDR)))
            }
        }

        if (landSizeSqmSganettIDR !== 0 && landSizeSqmSganettUSD == 0) {
            landSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectLand(propertyType, landSizeSqmSganettIDR) * exchangeRateIDRToUSD))
        } else if (landSizeSqmSganettIDR == 0 && landSizeSqmSganettUSD !== 0) {
            landSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectLand(propertyType, landSizeSqmSganettUSD) * exchangeRateUSDToIDR))
        }

        //land units/keys

        landSizeUnitKeysIDR = 0
        landSizeUnitKeysUSD = 0

        landSizeUnitKeysIDR = unitsKeys
        landSizeUnitKeysUSD = unitsKeys

        //Compare two values -- land size price per sqm gross IDR and USD

        landPricePerSqmGrossIDR = propertyEffectLand(propertyType, pricePerSqmGrossIDR)
        landPricePerSqmGrossUSD = propertyEffectLand(propertyType, pricePerSqmGrossUSD)

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

        landPricePerSqmSganettIDR = propertyEffectLand(propertyType, pricePerSqmSganettIDR)
        landPricePerSqmSganettUSD = propertyEffectLand(propertyType, pricePerSqmSganettUSD)

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

        landPricePerUnitKeyIDR = 0
        landPricePerUnitKeyUSD = 0

        //Land NJOP Price Total
        landNJOPPriceTotalIDR = propertyEffectLand(propertyType, njop)
        landNJOPPriceTotalUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectLand(propertyType, njop)))

        //Land NJOP Price Per Sqm
        landNJOPPricePerSqmIDR = propertyEffectLand(propertyType, njop)
        landNJOPPricePerSqmUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectLand(propertyType, njop)))

        //Land NJOP Percent
        landNJOPPercentIDR = 0
        landNJOPPercentUSD = 0

        /********END OF LAND SIDE **********/

        /********building SIDE **********/

        //Compare two values -- building total IDR and USD
        buildingTotalIDR = totalIDR
        buildingTotalUSD = totalUSD
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
        buildingSizeSqmGrossIDR = 0
        buildingSizeSqmGrossUSD = 0
        if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD == 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                buildingSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmGrossIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                buildingSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmGrossUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                buildingSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmGrossIDR)))
            }
        } else if (pricePerSqmGrossIDR == 0 && pricePerSqmGrossUSD !== 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                buildingSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmGrossIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                buildingSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmGrossUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                buildingSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmGrossIDR)))
            }
        } else if (pricePerSqmGrossIDR !== 0 && pricePerSqmGrossUSD !== 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                buildingSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmGrossIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                buildingSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmGrossUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                buildingSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmGrossIDR)))
            }
        }

        if (buildingSizeSqmGrossIDR !== 0 && buildingSizeSqmGrossUSD == 0) {
            buildingSizeSqmGrossUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingSizeSqmGrossIDR)))
        } else if (buildingSizeSqmGrossIDR == 0 && buildingSizeSqmGrossUSD !== 0) {
            buildingSizeSqmGrossIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingSizeSqmGrossUSD)))
        }

        //Compare two values -- building size sqm sganett IDR and USD
        buildingSizeSqmSganettIDR = 0
        buildingSizeSqmSganettUSD = 0
        if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD == 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                buildingSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                buildingSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                buildingSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
            }
        } else if (pricePerSqmSganettIDR == 0 && pricePerSqmSganettUSD !== 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                buildingSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                buildingSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                buildingSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
            }
        } else if (pricePerSqmSganettIDR !== 0 && pricePerSqmSganettUSD !== 0) {
            if (totalIDR !== 0 && totalUSD == 0) {
                buildingSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
            } else if (totalUSD !== 0 && totalIDR == 0) {
                buildingSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalUSD) / propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)))
            } else if (totalIDR !== 0 && totalUSD !== 0) {
                buildingSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingTotalIDR) / propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)))
            }
        }

        if (buildingSizeSqmSganettIDR !== 0 && buildingSizeSqmSganettUSD == 0) {
            buildingSizeSqmSganettUSD = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingSizeSqmSganettIDR) * exchangeRateIDRToUSD))
        } else if (buildingSizeSqmSganettIDR == 0 && buildingSizeSqmSganettUSD !== 0) {
            buildingSizeSqmSganettIDR = numberValidation(createFormula(propertyEffectBuilding(propertyType, buildingSizeSqmSganettUSD) * exchangeRateUSDToIDR))
        }

        //building units/keys

        buildingSizeUnitKeysIDR = 0
        buildingSizeUnitKeysUSD = 0

        buildingSizeUnitKeysIDR = unitsKeys
        buildingSizeUnitKeysUSD = unitsKeys

        //Compare two values -- building size price per sqm gross IDR and USD

        buildingPricePerSqmGrossIDR = propertyEffectBuilding(propertyType, pricePerSqmGrossIDR)
        buildingPricePerSqmGrossUSD = propertyEffectBuilding(propertyType, pricePerSqmGrossUSD)

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

        buildingPricePerSqmSganettIDR = propertyEffectBuilding(propertyType, pricePerSqmSganettIDR)
        buildingPricePerSqmSganettUSD = propertyEffectBuilding(propertyType, pricePerSqmSganettUSD)

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

        buildingPricePerUnitKeyIDR = 0
        buildingPricePerUnitKeyUSD = 0

        //building NJOP Price Total
        buildingNJOPPriceTotalIDR = propertyEffectBuilding(propertyType, njop)
        buildingNJOPPriceTotalUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectBuilding(propertyType, njop)))

        //building NJOP Price Per Sqm
        buildingNJOPPricePerSqmIDR = propertyEffectBuilding(propertyType, njop)
        buildingNJOPPricePerSqmUSD = numberValidation(createFormula(exchangeRateIDRToUSD * propertyEffectBuilding(propertyType, njop)))

        //building NJOP Percent
        buildingNJOPPercentIDR = 0
        buildingNJOPPercentUSD = 0

        /********END OF building SIDE **********/

    }

    /********TOTAL SIDE **********/

    //Compare two values -- total total IDR and USD
    totalTotalIDR = landTotalIDR + buildingTotalIDR
    totalTotalUSD = landTotalUSD + buildingTotalUSD

    //Compare two values -- total size sqm gross IDR and USD
    totalSizeSqmGrossIDR = landSizeSqmGrossIDR + buildingSizeSqmGrossIDR
    totalSizeSqmGrossUSD = landSizeSqmGrossUSD + buildingSizeSqmGrossUSD

    //Compare two values -- total size sqm sganett IDR and USD
    totalSizeSqmSganettIDR = landSizeSqmSganettIDR + buildingSizeSqmSganettIDR
    totalSizeSqmSganettUSD = landSizeSqmSganettUSD + buildingSizeSqmSganettUSD

    //total units/keys
    totalSizeUnitKeysIDR = landSizeUnitKeysIDR + buildingSizeUnitKeysIDR
    totalSizeUnitKeysUSD = landSizeUnitKeysUSD + buildingSizeUnitKeysUSD

    //Compare two values -- total size price per sqm gross IDR and USD
    totalPricePerSqmGrossIDR = landPricePerSqmGrossIDR + buildingPricePerSqmGrossIDR
    totalPricePerSqmGrossUSD = landPricePerSqmGrossUSD + buildingPricePerSqmGrossUSD

    //Compare two values -- total size price per sqm sganett IDR and USD
    totalPricePerSqmSganettIDR = landPricePerSqmSganettIDR + buildingPricePerSqmSganettIDR
    totalPricePerSqmSganettUSD = landPricePerSqmSganettUSD + buildingPricePerSqmSganettUSD

    //total price per unit key
    totalPricePerUnitKeyIDR = landPricePerUnitKeyIDR + buildingPricePerUnitKeyIDR
    totalPricePerUnitKeyUSD = landPricePerUnitKeyUSD + buildingPricePerUnitKeyUSD

    //total NJOP Price Total
    totalNJOPPriceTotalIDR = landNJOPPriceTotalIDR + buildingNJOPPriceTotalIDR
    totalNJOPPriceTotalUSD = landNJOPPriceTotalUSD + buildingNJOPPriceTotalUSD

    //total NJOP Price Per Sqm
    totalNJOPPricePerSqmIDR = landNJOPPricePerSqmIDR + buildingNJOPPricePerSqmIDR
    totalNJOPPricePerSqmUSD = landNJOPPricePerSqmUSD + buildingNJOPPricePerSqmUSD

    //total NJOP Percent
    totalNJOPPercentIDR = landNJOPPercentIDR + buildingNJOPPercentIDR
    totalNJOPPercentUSD = landNJOPPercentUSD + buildingNJOPPercentUSD

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
    if (landSizeSqmGrossIDR !== 0 && landSizeSqmSganettIDR == 0) {
        KLBLandSqmIDR = landSizeSqmGrossIDR
    } else if (landSizeSqmGrossIDR == 0 && landSizeSqmSganettIDR !== 0) {
        KLBLandSqmIDR = landSizeSqmSganettIDR
    }

    if (landSizeSqmGrossUSD !== 0 && landSizeSqmSganettUSD == 0) {
        KLBLandSqmUSD = landSizeSqmGrossUSD
    } else if (landSizeSqmGrossUSD == 0 && landSizeSqmSganettUSD !== 0) {
        KLBLandSqmUSD = landSizeSqmSganettUSD
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
    } else if (propertyStatus == "Valuation") {
        if (actionDate) {
            $("#action-date-popup").text("Valuation on " + actionDate)
        } else {
            $("#action-date-popup").text("Valuation on unknown date")
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
    $("#landSizeSqmGrossIDR").text(delimiter(landSizeSqmGrossIDR))
    $("#landSizeSqmGrossUSD").text(delimiter(landSizeSqmGrossUSD))
    $("#landSizeSqmSGAIDR").text(delimiter(landSizeSqmSganettIDR))
    $("#landSizeSqmSGAUSD").text(delimiter(landSizeSqmSganettUSD))
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
    $("#buildingSizeSqmGrossIDR").text(delimiter(buildingSizeSqmGrossIDR))
    $("#buildingSizeSqmGrossUSD").text(delimiter(buildingSizeSqmGrossUSD))
    $("#buildingSizeSqmSGAIDR").text(delimiter(buildingSizeSqmSganettIDR))
    $("#buildingSizeSqmSGAUSD").text(delimiter(buildingSizeSqmSganettUSD))
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
    $("#totalSizeSqmSGAIDR").text(delimiter(totalSizeSqmSganettIDR))
    $("#totalSizeSqmSGAUSD").text(delimiter(totalSizeSqmSganettUSD))
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

// var numberValidation = function (number) {
//     if (number !== null) {
//         if (number % 1 != 0) {
//             number = Number(Number(number).toFixed(2))
//         } else if (/\s/.test(number)) {
//             number = Number(number)
//         }
//     } else {
//         number = 0
//     }
//     return number
// }

// var createFormula = function (formula) {
//     if (isFinite(formula)) {
//         return formula
//     } else {
//         return 0
//     }
// }

// var delimiter = function (number) {
//     if (!Number.isInteger(number)) {
//         number = addCommas(Number(number).toFixed(2))
//     } else {
//         number = addCommas(number.toString())
//     }
//     return number
// }

// var addCommas = function (nStr) {
//     nStr += '';
//     var x = nStr.split('.');
//     var x1 = x[0];
//     var x2 = x.length > 1 ? '.' + x[1] : '';
//     var rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1)) {
//         x1 = x1.replace(rgx, '$1' + ',' + '$2');
//     }
//     return x1 + x2;
// }

// var propertyEffectLand = function (property, value) {
//     var val = 0
//     if (property.toUpperCase() == "RUKO" || property.toUpperCase() == "INDUSTRIAL/LOGISTIC" || property.toUpperCase() == "SHOPPING CENTER" || property.toUpperCase() == "HOUSE" || property.toUpperCase() == "DATA CENTER" || property.toUpperCase() == "OTHERS" || property.toUpperCase() == "HOTEL") {
//         val = value
//     } else {
//         val = 0
//     }
//     return val
// }

// var propertyEffectBuilding = function (property, value) {
//     var val = 0
//     if (property.toUpperCase() == "OFFICE" || property.toUpperCase() == "APARTMENT") {
//         val = value
//     } else {
//         val = 0
//     }
//     return val
// }
